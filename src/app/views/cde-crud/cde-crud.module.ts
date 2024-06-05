import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CdeCrudComponent } from './cde-crud/cde-crud.component';
import { ConfigurableDataEntityModule, CdeSearchModule } from '@saman-core/common';
import { CdeEditComponent } from './cde-edit/cde-edit.component';
import { CdeCrudRoutingModule } from './cde-crud-routing.module';

@NgModule({
  declarations: [
    CdeCrudComponent,
    CdeEditComponent,
  ],
  imports: [
    CdeCrudRoutingModule,
    CommonModule,
    ConfigurableDataEntityModule,
    CdeSearchModule,
  ],
  providers: [],
  exports: [
    CdeCrudComponent,
    CdeEditComponent,
  ],
})
export class CdeCrudModule {}
