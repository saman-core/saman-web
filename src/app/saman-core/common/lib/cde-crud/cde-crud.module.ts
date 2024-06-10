import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CdeCrudComponent } from './cde-crud/cde-crud.component';
import { ConfigurableDataEntityModule, CdeSearchModule } from '@saman-core/common';
import { CdeEditComponent } from './cde-edit/cde-edit.component';
import { CdeModule } from '@saman-core/data';

@NgModule({
  declarations: [
    CdeCrudComponent,
    CdeEditComponent,
  ],
  imports: [
    CommonModule,
    ConfigurableDataEntityModule,
    CdeSearchModule,
    CdeModule,
  ],
  providers: [],
  exports: [
    CdeCrudComponent,
    CdeEditComponent,
  ],
})
export class CdeCrudModule {}
