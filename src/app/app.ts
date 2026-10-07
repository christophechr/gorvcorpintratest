import { Component, inject, signal } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { DomSanitizer } from '@angular/platform-browser';

@Component({ selector: 'app-root', templateUrl: './app.html', styleUrl: './app.css' })
export class App {
  private readonly document = inject(DOCUMENT);
  readonly twitchPlayerUrl = inject(DomSanitizer).bypassSecurityTrustResourceUrl(
    'https://player.twitch.tv/?' +
      new URLSearchParams({
        channel: 'GorvCorptv',
        parent: this.document.location.hostname,
        autoplay: 'false',
        muted: 'false',
      }).toString(),
  );
  readonly menuOpen = signal(false);
  readonly submitted = signal(false);
  readonly subject = signal('Candidature');
  readonly lineups = [
    {
      number: '01',
      name: 'Meuporgs & MMORPG',
      tag: 'RAIDS · PVE · PVP',
      description: 'Les boss tombent. La mauvaise foi reste.',
      image:
        'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=900&q=85',
    },
    {
      number: '02',
      name: 'FPS & Tactical',
      tag: 'VALORANT · CS · SCRIMS',
      description: 'Du sang-froid. Du collectif. Et un bon aim.',
      image:
        'https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&w=900&q=85',
    },
    {
      number: '03',
      name: 'Rocket League & Arcade',
      tag: '3V3 · COMPÉTITION · FUN',
      description: 'On vise le sommet. Parfois le ballon.',
      image:
        'https://images.unsplash.com/photo-1493711662062-fa541adb3fc8?auto=format&fit=crop&w=900&q=85',
    },
  ];
  closeMenu() {
    this.menuOpen.set(false);
  }
  apply(subject = 'Candidature') {
    this.subject.set(subject);
    this.submitted.set(false);
  }
  submit(event: Event) {
    event.preventDefault();
    this.submitted.set(true);
  }
}
