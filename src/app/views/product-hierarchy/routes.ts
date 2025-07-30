import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./product-hierarchy/product-hierarchy.component').then(
        (m) => m.ProductHierarchyComponent,
      ),
    data: {
      title: $localize`Workflow`,
    },
  },
];
