import { inject, Injectable, NgZone } from '@angular/core';
import { AuthService } from './auth.service';

@Injectable({ providedIn: 'root' })
export class IdleService {
  private idleTimeout = 20 * 60 * 1000; // 20 min
  private timer: number;

  readonly auth = inject(AuthService);
  readonly ngZone = inject(NgZone);

  constructor() {}

  public startWatching() {
    const events = ['click', 'keydown', 'scroll', 'touchstart'];
    events.forEach((event) => window.addEventListener(event, () => this.resetTimer(), true));
    this.resetTimer();
  }

  private resetTimer() {
    if (this.timer) {
      window.clearTimeout(this.timer);
    }
    this.ngZone.runOutsideAngular(() => {
      this.timer = window.setTimeout(() => {
        this.ngZone.run(() => this.auth.logout());
      }, this.idleTimeout);
    });
  }
}
