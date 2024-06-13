import {Component, OnInit} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-cde-view',
  templateUrl: './cde-view.component.html',
  styleUrl: './cde-view.component.scss',
})
export class CdeViewComponent  implements OnInit {
  productName: string = '';
  templateName: string = '';
  routeBase = '';
  id = 0;

  constructor(
    private _router: Router,
    private _activatedRoute: ActivatedRoute,
  ) {}

  ngOnInit() {
    this.id = parseInt(this._activatedRoute.snapshot.params['id']);
    this._activatedRoute.data.subscribe((data) => {
      this.productName = data.productName;
      this.templateName = data.templateName;
      this.routeBase = data.routeBase;
    });
  }

  return(): void {
    this._router.navigate([this.routeBase]);
  }
}
