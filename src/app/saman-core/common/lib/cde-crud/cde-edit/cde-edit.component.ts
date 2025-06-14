import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { AlertSubscriptor } from '@saman-core/core';
import { CdeRepository } from '@saman-core/data';
import {
  EditConfirmDialogComponent,
  EditConfirmDialogResponse,
} from '../edit-confirm-dialog/edit-confirm-dialog.component';

@Component({
    selector: 'app-cde-edit',
    templateUrl: './cde-edit.component.html',
    styleUrl: './cde-edit.component.scss',
    standalone: false
})
export class CdeEditComponent implements OnInit {
  moduleName: string = '';
  productName: string = '';
  templateName: string = '';
  routeBase = '';
  id = 0;
  formValid = false;
  data: object = {};

  constructor(
    private readonly _router: Router,
    private readonly _activatedRoute: ActivatedRoute,
    private readonly _dialog: MatDialog,
    private readonly _alert: AlertSubscriptor,
    private readonly _cdeRepository: CdeRepository,
  ) {}

  ngOnInit() {
    this.id = parseInt(this._activatedRoute.snapshot.params['id']);
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

  saveEdit(): void {
    if (this.formValid) {
      const dialogRef = this._dialog.open(EditConfirmDialogComponent, {
        data: { name: 'registry' },
        disableClose: true,
      });
      dialogRef.afterClosed().subscribe((response: EditConfirmDialogResponse) => {
        if (response.accepted) {
          this._cdeRepository
            .update(this.moduleName, this.productName, this.templateName, this.data)
            .subscribe(() => {
              this._alert.success('Data updated successfully');
              this._router.navigate([this.routeBase]);
            });
        }
      });
    }
  }

  cancelEdit(): void {
    this._router.navigate([this.routeBase]);
  }
}
