import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    data: {
      title: 'Modules'
    },
    children: [
      {
        path: 'manage',
        loadComponent: () => import('./module-manage/module-manage.component').then((m) => m.ModuleManageComponent),
        data: {
          title: 'Manage'
        }
      },
      {
        path: 'hierarchy',
        loadComponent: () => import('./module-hierarchy/module-hierarchy.component').then((m) => m.ModuleHierarchyComponent),
        data: {
          title: 'Hierarchy'
        }
      },
    ],
  },
];
