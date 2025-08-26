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
      {
        path: 'conditions',
        loadComponent: () =>
          import('./template-conditions/template-conditions/template-conditions.component').then(
            (m) => m.TemplateConditionsComponent,
          ),
        data: {
          title: 'Conditions',
        },
      },
      {
        path: 'structure',
        loadComponent: () =>
          import('./template-structure/template-structure/template-structure.component').then(
            (m) => m.TemplateStructureComponent,
          ),
        data: {
          title: 'Structure',
        },
      },
    ],
  },
];
