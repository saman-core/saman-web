import {Component, OnInit} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CdeRepository } from '@saman-core/data';

@Component({
  selector: 'app-cde-create',
  templateUrl: './cde-create.component.html',
  styleUrl: './cde-create.component.scss',
})
export class CdeCreateComponent  implements OnInit {
  productName: string = '';
  templateName: string = '';
  routeBase = '';
  errors: string[] = [];
  data: object = {};

  constructor(
    private _router: Router,
    private _activatedRoute: ActivatedRoute,
    private _cdeRepository: CdeRepository,
  ) {}

  ngOnInit() {
    this._activatedRoute.data.subscribe((data) => {
      this.productName = data.productName;
      this.templateName = data.templateName;
      this.routeBase = data.routeBase;
    });
  }

  onChangeData(data: object): void {
    this.data = data;
  }

  onFormErrors(errors: string[]): void {
    this.errors = errors;
  }

  create(): void {
    if (this.errors.length === 0) {
      this._cdeRepository.create(this.productName, this.templateName, this.data).subscribe(response => {
        console.log(response);
      });
    }
  }

  cancelEdit(): void {
    this._router.navigate([this.routeBase]);
  }
}
