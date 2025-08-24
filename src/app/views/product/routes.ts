import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    data: {
      title: 'Modules',
    },
    children: [
      {
        path: 'manage',
        loadComponent: () =>
          import('./product-manage/product-manage.component').then((m) => m.ProductManageComponent),
        data: {
          title: 'Manage',
        },
      },
      {
        path: 'workflow',
        loadComponent: () =>
          import('./product-workflow/product-workflow.component').then(
            (m) => m.ProductWorkflowComponent,
          ),
        data: {
          title: 'Workflow',
        },
      },
    ],
  },
];
