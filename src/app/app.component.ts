import { Component, OnInit } from '@angular/core';
import { NavigationCancel, NavigationEnd, NavigationError, NavigationStart, Router } from '@angular/router';
import { Title } from '@angular/platform-browser';
import { IconSetService } from '@coreui/icons-angular';
import { iconSubset } from './icon-subset';
import { AuthService, LoaderSubscriptor } from '@saman-core/core';

@Component({
  selector: 'app-root',
  template: '<router-outlet></router-outlet>',
})
export class AppComponent implements OnInit {
  title = 'saman-web';

  constructor(
    private router: Router,
    private titleService: Title,
    private iconSetService: IconSetService,
    private authService: AuthService,
    private _loader: LoaderSubscriptor,
  ) {
    this.authService.initConfiguration();
    titleService.setTitle(this.title);
    iconSetService.icons = { ...iconSubset };
  }

  ngOnInit(): void {
    this.router.events.subscribe((evt) => {
      if(evt instanceof NavigationStart) {
        this._loader.show(true, true);
      }
      else if (evt instanceof NavigationEnd || evt instanceof NavigationCancel || evt instanceof NavigationError) {
            this._loader.hide(true, true);
      }
    });
  }
}
