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

  onChangeData(data: object): void {
    console.log(data);
  }

  onFormErrors(errors: string[]): void {
    console.log(errors);
  }
}
