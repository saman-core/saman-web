import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./template-conditions/template-conditions.component').then(
        (m) => m.TemplateConditionsComponent,
      ),
    data: {
      title: 'Template Conditions',
    },
  },
];
