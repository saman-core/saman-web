import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DefaultLayoutComponent } from './containers';
import { Page404Component } from './views/pages/page404/page404.component';
import { DashboardComponent } from './views/dashboard/dashboard.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'dashboard',
    pathMatch: 'full'
  },
  {
    path: '',
    component: DefaultLayoutComponent,
    data: {
      title: 'Home'
    },
    children: [
      {
        path: 'dashboard',
        component: DashboardComponent,
        data: {
          title: 'Dashboard'
        }
      },
      {
        path: 'template-structure',
        loadChildren: () =>
          import('./views/builder/template-structure/template-structure.module').then((m) => m.TemplateStructureModule)
      },
      {
        path: 'template-conditions',
        loadChildren: () =>
          import('./views/builder/template-conditions/template-conditions.module').then((m) => m.TemplateConditionsModule)
      },
      {
        path: 'hierarchy',
        loadChildren: () =>
          import('./views/product-hierarchy/product-hierarchy.module').then((m) => m.ProductHierarchyModule)
      },
      {
        path: 'workflow',
        loadChildren: () =>
          import('./views/product-workflow/product-workflow.module').then((m) => m.ProductWorkflowModule)
      },
      {
        path: 'policy',
        loadChildren: () =>
          import('./views/contracts/policy/policy.module').then((m) => m.PolicyModule)
      },
      {
        path: 'cde-auto-auto1',
        loadChildren: () =>
          import('./views/cde-auto-auto1/cde-auto-auto1.module').then((m) => m.CdeAutoAuto1Module)
      },
      {
        path: 'cde-vida-vidatradicional',
        loadChildren: () =>
          import('./views/cde-vida-vidatradicional/cde-vida-vidatradicional.module').then((m) => m.CdeVidaVidatradicionalModule)
      },
    ]
  },
  {
    path: '404',
    component: Page404Component,
    data: {
      title: 'Page 404'
    }
  },
  {path: '**', redirectTo: '404'}
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      scrollPositionRestoration: 'top',
      anchorScrolling: 'enabled',
      initialNavigation: 'disabled',
      useHash: true
    })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
