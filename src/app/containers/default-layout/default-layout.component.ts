import { Component } from '@angular/core';

import { navItems } from './_nav';

@Component({
    selector: 'app-dashboard',
    templateUrl: './default-layout.component.html',
    styleUrls: ['./default-layout.component.scss'],
    standalone: false
})
export class DefaultLayoutComponent {

  public navItems = navItems;

  constructor() {}
}
