import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'dashboard',
    pathMatch: 'full',
  },
  {
    path: '',
    loadComponent: () => import('./layout').then((m) => m.DefaultLayoutComponent),
    data: {
      title: 'Home',
    },
    children: [
      {
        path: 'dashboard',
        loadChildren: () => import('./views/dashboard/routes').then((m) => m.routes),
      },
      {
        path: 'pages',
        loadChildren: () => import('./views/pages/routes').then((m) => m.routes),
      },
      {
        path: 'template-structure',
        loadChildren: () =>
          import('./views/builder/template-structure/routes').then((m) => m.routes),
      },
      {
        path: 'template-conditions',
        loadChildren: () =>
          import('./views/builder/template-conditions/routes').then((m) => m.routes),
      },
      {
        path: 'module',
        loadChildren: () => import('./views/module/routes').then((m) => m.routes),
      },
      {
        path: 'workflow',
        loadChildren: () => import('./views/product-workflow/routes').then((m) => m.routes),
      },
      {
        path: 'cde-auto-auto1',
        loadChildren: () => import('./views/cde-auto-auto1/routes').then((m) => m.routes),
      },
      {
        path: 'cde-vida-vidatradicional',
        loadChildren: () => import('./views/cde-vida-vidatradicional/routes').then((m) => m.routes),
      },
    ],
  },
  {
    path: '404',
    loadComponent: () =>
      import('./views/pages/page404/page404.component').then((m) => m.Page404Component),
    data: {
      title: 'Page 404',
    },
  },
  {
    path: '500',
    loadComponent: () =>
      import('./views/pages/page500/page500.component').then((m) => m.Page500Component),
    data: {
      title: 'Page 500',
    },
  },
  { path: '**', redirectTo: '404' },
];
