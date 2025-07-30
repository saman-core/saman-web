import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./template-structure/template-structure.component').then(
        (m) => m.TemplateStructureComponent,
      ),
    data: {
      title: 'Template Structure',
    },
  },
];
