import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ConfigurableDataEntityModule, CdeSearchModule } from '@saman-core/common';
import { CdeModule } from '@saman-core/data';
import { CdeCrudComponent } from './cde-crud/cde-crud.component';
import { CdeEditComponent } from './cde-edit/cde-edit.component';
import { CdeCreateComponent } from './cde-create/cde-create.component';
import { CdeViewComponent } from './cde-view/cde-view.component';

@NgModule({
  declarations: [
    CdeCreateComponent,
    CdeCrudComponent,
    CdeEditComponent,
    CdeViewComponent,
  ],
  imports: [
    CommonModule,
    ConfigurableDataEntityModule,
    CdeSearchModule,
    CdeModule,
  ],
  providers: [],
  exports: [
    CdeCreateComponent,
    CdeCrudComponent,
    CdeEditComponent,
    CdeViewComponent,
  ],
})
export class CdeCrudModule {}
