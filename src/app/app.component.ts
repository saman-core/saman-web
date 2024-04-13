import { Component, OnInit } from '@angular/core';
import {
  NavigationCancel,
  NavigationEnd,
  NavigationError,
  NavigationStart,
  Router,
} from '@angular/router';
import { Title } from '@angular/platform-browser';
import { IconSetService } from '@coreui/icons-angular';
import { iconSubset } from './icon-subset';
import { AuthService, LoaderSubscriptor } from '@saman-core/core';
import { filter } from 'rxjs';

@Component({
  selector: 'app-root',
  template: '<router-outlet></router-outlet>',
})
export class AppComponent implements OnInit {
  title = 'saman-web';

  constructor(
    private _router: Router,
    private _titleService: Title,
    private _iconSetService: IconSetService,
    private _authService: AuthService,
    private _loader: LoaderSubscriptor,
  ) {
    this._storeShareToken();
    this._authService.initConfiguration();
    this._titleService.setTitle(this.title);
    this._iconSetService.icons = { ...iconSubset };
  }

  ngOnInit(): void {
    this._router.events.subscribe((evt) => {
      if (evt instanceof NavigationStart) {
        this._loader.show(true, true);
      } else if (
        evt instanceof NavigationEnd ||
        evt instanceof NavigationCancel ||
        evt instanceof NavigationError
      ) {
        this._loader.hide(true, true);
      }
    });
  }

  private _storeShareToken(): void {
    localStorage.setItem('useSessionToken', 'true');
    this._authService
      .events()
      .pipe(filter((ev) => ev.type === 'token_received' || ev.type === 'user_profile_loaded'))
      .subscribe(() => sessionStorage.setItem('formioToken', 'Bearer ' + this._authService.getToken()));
  }
}
