export default function Home() {
  return (
    <div className="relative min-h-screen overflow-hidden bg-[#f3eadb] text-[#1a1917]">
      <div
        className="pointer-events-none absolute -top-32 -right-24 h-80 w-80 rounded-full bg-[#ffb26b]/60 blur-3xl"
        style={{ animation: "floatSlow 14s ease-in-out infinite" }}
      />
      <div
        className="pointer-events-none absolute -bottom-28 -left-24 h-96 w-96 rounded-full bg-[#7fb7a6]/50 blur-3xl"
        style={{ animation: "floatSlow 16s ease-in-out infinite" }}
      />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(255,255,255,0.7),_transparent_50%)]" />
      <main className="relative z-10 mx-auto grid max-w-6xl items-center gap-12 px-6 py-16 lg:grid-cols-[1.1fr_0.9fr] lg:gap-20 lg:py-24">
        <section
          className="space-y-8"
          style={{ animation: "fadeUp 700ms ease-out both" }}
        >
          <div className="inline-flex items-center gap-2 rounded-full bg-white/70 px-4 py-2 text-xs font-semibold uppercase tracking-[0.35em] text-[#2a574e] shadow-sm">
            Rift HQ
          </div>
          <div className="space-y-4">
            <h1 className="text-4xl font-semibold leading-tight tracking-tight text-[#1a1917] sm:text-5xl">
              Welcome back, team.
            </h1>
            <p className="max-w-xl text-lg leading-relaxed text-[#4b4741]">
              Review scrim notes, stage plans, and sponsor deliverables in a
              single secure hub built for League of Legends esports operations.
            </p>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            {[
              {
                title: "Practice intel",
                detail: "Patch reads, VOD notes, and matchup prep.",
              },
              {
                title: "Roster pulse",
                detail: "Travel, schedules, and availability in sync.",
              },
              {
                title: "Stage-ready",
                detail: "Champion pools, comps, and day plans.",
              },
              {
                title: "Sponsor ops",
                detail: "Assets, deadlines, and deliverable tracking.",
              },
            ].map((item, index) => (
              <div
                key={item.title}
                className="rounded-2xl border border-white/40 bg-white/70 p-4 shadow-sm backdrop-blur"
                style={{
                  animation: "fadeUp 700ms ease-out both",
                  animationDelay: `${160 + index * 80}ms`,
                }}
              >
                <h3 className="text-base font-semibold text-[#1a1917]">
                  {item.title}
                </h3>
                <p className="mt-2 text-sm text-[#5c5852]">{item.detail}</p>
              </div>
            ))}
          </div>
        </section>
        <section
          className="rounded-3xl border border-white/60 bg-white/80 p-8 shadow-[0_30px_80px_-40px_rgba(26,25,23,0.6)] backdrop-blur"
          style={{ animation: "fadeUp 700ms ease-out both", animationDelay: "120ms" }}
        >
          <div className="mb-8 space-y-2">
            <p className="text-sm font-semibold uppercase tracking-[0.4em] text-[#7a6b5c]">
              Sign in
            </p>
            <h2 className="text-2xl font-semibold text-[#1a1917]">
              Use your company credentials
            </h2>
            <p className="text-sm text-[#5c5852]">
              New on the roster? Ask ops to provision your access.
            </p>
          </div>
          <form className="space-y-5">
            <div className="space-y-2">
              <label className="text-sm font-semibold text-[#3b3832]">
                Team email
              </label>
              <input
                type="email"
                placeholder="you@rifthq.gg"
                className="h-12 w-full rounded-xl border border-[#e2d8ca] bg-white/90 px-4 text-sm text-[#1a1917] shadow-sm outline-none transition focus:border-[#c49b6f] focus:ring-2 focus:ring-[#f1c38d]/40"
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-semibold text-[#3b3832]">
                Password
              </label>
              <input
                type="password"
                placeholder="Enter your password"
                className="h-12 w-full rounded-xl border border-[#e2d8ca] bg-white/90 px-4 text-sm text-[#1a1917] shadow-sm outline-none transition focus:border-[#c49b6f] focus:ring-2 focus:ring-[#f1c38d]/40"
              />
            </div>
            <div className="flex flex-wrap items-center justify-between gap-3 text-sm text-[#5c5852]">
              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  className="h-4 w-4 rounded border-[#c9b8a3] text-[#2a574e] focus:ring-[#7fb7a6]"
                />
                Remember this device
              </label>
              <button className="font-semibold text-[#2a574e] hover:text-[#1f423b]">
                Forgot password?
              </button>
            </div>
            <button
              type="submit"
              className="flex h-12 w-full items-center justify-center rounded-xl bg-[#2a574e] text-sm font-semibold uppercase tracking-[0.2em] text-white shadow-lg shadow-[#2a574e]/30 transition hover:-translate-y-0.5 hover:bg-[#21453d]"
            >
              Continue
            </button>
          </form>
          <div className="mt-8 text-center text-xs font-semibold uppercase tracking-[0.25em] text-[#7a6b5c]">
            Secure access only
          </div>
        </section>
      </main>
    </div>
  );
}
