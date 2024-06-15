import { NgModule } from '@angular/core';
import { FormUtilService } from './form-util.service';
import { GenericResourcesModule } from '@saman-core/data';

@NgModule({
  declarations: [],
  imports: [GenericResourcesModule],
  providers: [FormUtilService],
  exports: [],
})
export class FormUtilModule {}
