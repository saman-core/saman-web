import {Component, OnInit} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-cde-edit',
  templateUrl: './cde-edit.component.html',
  styleUrl: './cde-edit.component.scss',
})
export class CdeEditComponent  implements OnInit {
  productName: string = '';
  templateName: string = '';
  routeBase = '';
  pk = 0;

  constructor(
    private _router: Router,
    private _activatedRoute: ActivatedRoute,
  ) {}

  ngOnInit() {
    this.pk = parseInt(this._activatedRoute.snapshot.params['pk']);
    console.log(this.pk);
    this._activatedRoute.data.subscribe((data) => {
      this.productName = data.productName;
      this.templateName = data.templateName;
      this.routeBase = data.routeBase;
    });
  }
}
