import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  MatDialogTitle,
  MatDialogContent,
  MatDialogActions,
  MatDialogClose,
} from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { ConfigurableDataEntityModule, CdeSearchModule } from '@saman-core/common';
import { AlertModule } from '@saman-core/core';
import { CdeModule } from '@saman-core/data';
import { CdeCrudComponent } from './cde-crud/cde-crud.component';
import { CdeEditComponent } from './cde-edit/cde-edit.component';
import { CdeCreateComponent } from './cde-create/cde-create.component';
import { CdeViewComponent } from './cde-view/cde-view.component';
import { CreateConfirmDialogComponent } from './create-confirm-dialog/create-confirm-dialog.component';
import { DeleteConfirmDialogComponent } from './delete-confirm-dialog/delete-confirm-dialog.component';
import { EditConfirmDialogComponent } from './edit-confirm-dialog/edit-confirm-dialog.component';

@NgModule({
  declarations: [
    CdeCreateComponent,
    CdeCrudComponent,
    CdeEditComponent,
    CdeViewComponent,
    CreateConfirmDialogComponent,
    DeleteConfirmDialogComponent,
    EditConfirmDialogComponent,
  ],
  imports: [
    CommonModule,
    ConfigurableDataEntityModule,
    CdeSearchModule,
    AlertModule,
    CdeModule,
    MatDialogTitle,
    MatDialogContent,
    MatDialogActions,
    MatDialogClose,
    MatButtonModule,
    MatIconModule,
  ],
  providers: [],
  exports: [CdeCreateComponent, CdeCrudComponent, CdeEditComponent, CdeViewComponent],
})
export class CdeCrudModule {}
