import { NgModule } from '@angular/core';
import { ProductRepository } from '@saman-core/data/lib/module/product/repository/product.repository';

@NgModule({
  providers: [ProductRepository],
})
export class ProductDataModule {}
