import { NgModule } from '@angular/core';
import { ProductsGitRepository } from './repository/products-git.repository';
import { BusinessGitRepository } from './repository/business-git.repository';

@NgModule({
  providers: [
    ProductsGitRepository,
    BusinessGitRepository,
  ],
})
export class TemplateBuilderModule {}
