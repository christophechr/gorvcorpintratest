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
      name: 'League of Legends',
      tag: 'LOL · ÉQUIPE · COMPÉTITION',
      description: 'La Faille de l’invocateur. Un collectif. La même envie de progresser.',
      image: 'lec-draft-g2-kc.jpg',
      imageAlt: 'Draft League of Legends entre G2 et Karmine Corp en LEC : picks et bans des champions',
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
