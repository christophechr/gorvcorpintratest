#!/usr/bin/env bash
set -euo pipefail

archive=${1:?Archive Docker manquante}
image=${2:?Tag image manquant}
port=${3:-80}
[[ "$port" =~ ^[0-9]+$ ]] && (( port >= 1 && port <= 65535 )) || exit 1

# Serialize deployments, including manual invocations on the VPS.
exec 9>/home/debian/gorvcorp/deploy.lock
flock -w 300 9

if docker info >/dev/null 2>&1; then
  docker_cmd=(docker)
else
  docker_cmd=(sudo -n docker)
  "${docker_cmd[@]}" info >/dev/null
fi

"${docker_cmd[@]}" load -i "$archive"
"${docker_cmd[@]}" image inspect "$image" >/dev/null

healthy() {
  local name=$1
  for ((attempt=0; attempt<30; attempt++)); do
    if "${docker_cmd[@]}" exec "$name" wget -q -O /dev/null http://127.0.0.1/healthz 2>/dev/null; then
      return 0
    fi
    sleep 2
  done
  return 1
}

# Check the new image before interrupting the running site.
"${docker_cmd[@]}" rm -f gorvcorp-candidate >/dev/null 2>&1 || true
"${docker_cmd[@]}" run -d --name gorvcorp-candidate "$image" >/dev/null
if ! healthy gorvcorp-candidate; then
  "${docker_cmd[@]}" logs gorvcorp-candidate
  "${docker_cmd[@]}" rm -f gorvcorp-candidate >/dev/null
  exit 1
fi
"${docker_cmd[@]}" rm -f gorvcorp-candidate >/dev/null

previous=false
if "${docker_cmd[@]}" container inspect gorvcorp >/dev/null 2>&1; then
  "${docker_cmd[@]}" rm -f gorvcorp-previous >/dev/null 2>&1 || true
  "${docker_cmd[@]}" stop gorvcorp >/dev/null
  "${docker_cmd[@]}" rename gorvcorp gorvcorp-previous
  previous=true
fi

if "${docker_cmd[@]}" run -d --name gorvcorp --restart unless-stopped -p "127.0.0.1:$port:80" "$image" >/dev/null && healthy gorvcorp; then
  printf '%s\n' "$image" > /home/debian/gorvcorp/current-image.txt
  rm -f -- "$archive"
  echo "Déploiement terminé : $image sur le port $port"
else
  "${docker_cmd[@]}" logs gorvcorp 2>/dev/null || true
  "${docker_cmd[@]}" rm -f gorvcorp >/dev/null 2>&1 || true
  if "$previous"; then
    "${docker_cmd[@]}" rename gorvcorp-previous gorvcorp
    "${docker_cmd[@]}" start gorvcorp >/dev/null
    echo 'Échec du déploiement : conteneur précédent restauré.' >&2
  fi
  exit 1
fi
