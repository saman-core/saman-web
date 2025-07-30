import { Component, OnInit, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { AlertSubscriptor } from '@saman-core/core';
import { CdeRepository } from '@saman-core/data';
import {
  EditConfirmDialogComponent,
  EditConfirmDialogResponse,
} from '../edit-confirm-dialog/edit-confirm-dialog.component';
import { CdeComponent } from '../../configurable-data-entity/cde/cde.component';
import { MatButton } from '@angular/material/button';

@Component({
  selector: 'app-cde-edit',
  templateUrl: './cde-edit.component.html',
  styleUrl: './cde-edit.component.scss',
  imports: [CdeComponent, MatButton],
})
export class CdeEditComponent implements OnInit {
  private readonly _router = inject(Router);
  private readonly _activatedRoute = inject(ActivatedRoute);
  private readonly _dialog = inject(MatDialog);
  private readonly _alert = inject(AlertSubscriptor);
  private readonly _cdeRepository = inject(CdeRepository);

  moduleName: string = '';
  productName: string = '';
  templateName: string = '';
  routeBase = '';
  id = 0;
  formValid = false;
  data: object = {};

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
