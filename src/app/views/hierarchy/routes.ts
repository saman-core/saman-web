import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./hierarchy-manage/hierarchy-manage.component').then(
        (m) => m.HierarchyManageComponent,
      ),
    data: {
      title: $localize`Workflow`,
    },
  },
];
