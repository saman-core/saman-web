import {Component, OnInit} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CdeRepository } from '@saman-core/data';

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
  errors: string[] = [];
  data: object = {};

  constructor(
    private _router: Router,
    private _activatedRoute: ActivatedRoute,
    private _cdeRepository: CdeRepository,
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
    this.data = data;
  }

  onFormErrors(errors: string[]): void {
    this.errors = errors;
  }

  saveEdit(): void {
    if (this.errors.length === 0) {
      this._cdeRepository.update(this.productName, this.templateName, this.data).subscribe(response => {
        console.log(response);
      });
    }
  }

  cancelEdit(): void {
    this._router.navigate([this.routeBase]);
  }
}
