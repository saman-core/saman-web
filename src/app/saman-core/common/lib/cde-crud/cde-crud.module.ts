import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  MatDialogTitle,
  MatDialogContent,
  MatDialogActions,
  MatDialogClose,
} from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { ConfigurableDataEntityModule, CdeSearchModule } from '@saman-core/common';
import { CdeModule } from '@saman-core/data';
import { CdeCrudComponent } from './cde-crud/cde-crud.component';
import { CdeEditComponent } from './cde-edit/cde-edit.component';
import { CdeCreateComponent } from './cde-create/cde-create.component';
import { CdeViewComponent } from './cde-view/cde-view.component';

@NgModule({
  declarations: [CdeCreateComponent, CdeCrudComponent, CdeEditComponent, CdeViewComponent],
  imports: [
    CommonModule,
    ConfigurableDataEntityModule,
    CdeSearchModule,
    CdeModule,
    MatDialogTitle,
    MatDialogContent,
    MatDialogActions,
    MatDialogClose,
    MatButtonModule,
  ],
  providers: [],
  exports: [CdeCreateComponent, CdeCrudComponent, CdeEditComponent, CdeViewComponent],
})
export class CdeCrudModule {}
