import { NgTemplateOutlet } from '@angular/common';
import { Component, inject, input, OnInit } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';

import {
  AvatarComponent,
  BreadcrumbRouterComponent,
  ContainerComponent,
  DropdownComponent,
  DropdownDividerDirective,
  DropdownHeaderDirective,
  DropdownItemDirective,
  DropdownMenuDirective,
  DropdownToggleDirective,
  HeaderComponent,
  HeaderNavComponent,
  HeaderTogglerDirective,
  NavItemComponent,
  NavLinkDirective,
  SidebarToggleDirective,
} from '@coreui/angular';

import { IconDirective } from '@coreui/icons-angular';
import { AuthService, UserSubscriptor } from '@saman-core/core';

@Component({
  selector: 'app-default-header',
  templateUrl: './default-header.component.html',
  imports: [
    ContainerComponent,
    HeaderTogglerDirective,
    SidebarToggleDirective,
    IconDirective,
    HeaderNavComponent,
    NavItemComponent,
    NavLinkDirective,
    RouterLink,
    RouterLinkActive,
    NgTemplateOutlet,
    BreadcrumbRouterComponent,
    DropdownComponent,
    DropdownToggleDirective,
    AvatarComponent,
    DropdownMenuDirective,
    DropdownHeaderDirective,
    DropdownItemDirective,
    DropdownDividerDirective,
  ],
})
export class DefaultHeaderComponent extends HeaderComponent implements OnInit {
  sidebarId = input('sidebar1');

  readonly #authService = inject(AuthService);
  readonly #userSubscriptor = inject(UserSubscriptor);

  public picture = '';
  public username = '';

  constructor() {
    super();
  }

  ngOnInit(): void {
    this.#userSubscriptor.getObserver().subscribe((user) => {
      this.picture = user['info'].picture;
      this.username = user['info'].username || user['info'].preferred_username;
    });
  }

  public logout(): void {
    this.#authService.logout();
  }
}
