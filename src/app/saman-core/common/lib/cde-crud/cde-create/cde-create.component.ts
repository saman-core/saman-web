import { Component, OnInit, inject } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { CdeRepository } from '@saman-core/data';
import { AlertSubscriptor } from '@saman-core/core';
import {
  CreateConfirmDialogComponent,
  CreateConfirmDialogResponse,
} from '../create-confirm-dialog/create-confirm-dialog.component';
import { CdeComponent } from '../../configurable-data-entity/cde/cde.component';
import { MatButton } from '@angular/material/button';

@Component({
  selector: 'app-cde-create',
  templateUrl: './cde-create.component.html',
  styleUrl: './cde-create.component.scss',
  imports: [CdeComponent, MatButton],
})
export class CdeCreateComponent implements OnInit {
  private readonly _router = inject(Router);
  private readonly _activatedRoute = inject(ActivatedRoute);
  private readonly _dialog = inject(MatDialog);
  private readonly _alert = inject(AlertSubscriptor);
  private readonly _cdeRepository = inject(CdeRepository);

  moduleName: string = '';
  productName: string = '';
  templateName: string = '';
  routeBase = '';
  formValid = false;
  data: object = {};

  ngOnInit() {
    this._activatedRoute.data.subscribe((data) => {
      this.moduleName = data.moduleName;
      this.productName = data.productName;
      this.templateName = data.templateName;
      this.routeBase = data.routeBase;
    });
  }

  onChangeData(data: object): void {
    this.data = data;
  }

  onFormErrors(formValid: boolean): void {
    this.formValid = formValid;
  }

  create(): void {
    if (this.formValid) {
      const dialogRef = this._dialog.open(CreateConfirmDialogComponent, {
        data: { name: 'registry' },
        disableClose: true,
      });
      dialogRef.afterClosed().subscribe((response: CreateConfirmDialogResponse) => {
        if (response.accepted) {
          this._cdeRepository
            .create(this.moduleName, this.productName, this.templateName, this.data)
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
