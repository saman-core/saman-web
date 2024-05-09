import { NgModule } from '@angular/core';
import { GenericResourceRepository } from './repository/generic-resources.repository';

@NgModule({
  providers: [GenericResourceRepository],
})
export class GenericResourcesModule {}
