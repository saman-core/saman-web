import { NgModule } from '@angular/core';
import { CdeCrudModule as CdeCrudModule2 } from '@saman-core/common';
import { CdeCrudRoutingModule } from './cde-crud-routing.module';

@NgModule({
  declarations: [],
  imports: [
    CdeCrudRoutingModule,
    CdeCrudModule2,
  ],
  providers: [],
  exports: [],
})
export class CdeCrudModule {}
