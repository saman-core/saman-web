import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./product-workflow/product-workflow.component').then(
        (m) => m.ProductWorkflowComponent,
      ),
    data: {
      title: $localize`Workflow`,
    },
  },
];
