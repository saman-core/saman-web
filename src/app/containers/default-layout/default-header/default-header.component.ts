import { Component, Input, OnInit } from '@angular/core';

import { ClassToggleService, HeaderComponent } from '@coreui/angular';
import { AuthService, UserSubscriptor } from '@saman-core/core';

@Component({
    selector: 'app-default-header',
    templateUrl: './default-header.component.html',
    standalone: false
})
export class DefaultHeaderComponent extends HeaderComponent implements OnInit {
  @Input() sidebarId: string = 'sidebar';

  public newMessages = new Array(4);
  public newTasks = new Array(5);
  public newNotifications = new Array(5);
  public picture = '';
  public username = ''

  constructor(
    private classToggler: ClassToggleService,
    private authService: AuthService,
    private _userSubscriptor: UserSubscriptor,
  ) {
    super();
  }

  ngOnInit(): void {
    this._userSubscriptor.getObserver().subscribe((user) => {
      this.picture = user['info'].picture;
      this.username = user['info'].username || user['info'].preferred_username;
    });
  }

  logout(): void {
    this.authService.logout();
  }
}
