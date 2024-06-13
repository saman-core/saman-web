import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { CdeRepository } from '@saman-core/data';
import { AlertSubscriptor } from '@saman-core/core';
import {
  CreateConfirmDialogComponent,
  CreateConfirmDialogResponse,
} from '../create-confirm-dialog/create-confirm-dialog.component';

@Component({
  selector: 'app-cde-create',
  templateUrl: './cde-create.component.html',
  styleUrl: './cde-create.component.scss',
})
export class CdeCreateComponent implements OnInit {
  productName: string = '';
  templateName: string = '';
  routeBase = '';
  errors: string[] = [];
  data: object = {};

  constructor(
    private _router: Router,
    private _activatedRoute: ActivatedRoute,
    private _dialog: MatDialog,
    private _alert: AlertSubscriptor,
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
      const dialogRef = this._dialog.open(CreateConfirmDialogComponent, {
        data: { name: 'registry' },
        disableClose: true,
      });
      dialogRef.afterClosed().subscribe((response: CreateConfirmDialogResponse) => {
        if (response.accepted) {
          this._cdeRepository
            .create(this.productName, this.templateName, this.data)
            .subscribe((response) => {
              this._alert.success(`Data saved successfully by ID: ${response['id']}`);
              this._router.navigate([this.routeBase]);
            });
        }
      });
    }
  }

  cancel(): void {
    this._router.navigate([this.routeBase]);
  }
}
