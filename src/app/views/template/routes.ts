import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    data: {
      title: 'Templates',
    },
    children: [
      {
        path: 'manage',
        loadComponent: () =>
          import('./template-manage/template-manage.component').then(
            (m) => m.TemplateManageComponent,
          ),
        data: {
          title: 'Manage',
        },
      },
    ],
  },
];
