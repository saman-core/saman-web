import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProductHierarchyComponent } from './product-hierarchy/product-hierarchy.component';

const routes: Routes = [
  {
    path: '',
    component: ProductHierarchyComponent,
    data: {
      title: $localize`Workflow`,
    },
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProductHierarchyRoutingModule {}
