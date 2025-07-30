import { Routes } from '@angular/router';

const moduleName = 'po';
const productName = 'auto';
const templateName = 'auto1';
const routeBase = 'cde-auto-auto1';
const initializedRequests = true;
const searchProperty: string = 'id';
const viewAction: boolean = true;
const editAction: boolean = true;
const deleteAction: boolean = true;
const avancedSearch: boolean = true;
const displayedColumns: string[] = ['cedula', 'nombre', 'ocupacion', 'cloudServer', 'sexo'];

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('@saman-core/common').then((m) => m.CdeCrudComponent),
    data: {
      title: $localize`CDE`,
      moduleName: moduleName,
      productName: productName,
      templateName: templateName,
      routeBase: routeBase,
      initializedRequests: initializedRequests,
      searchProperty: searchProperty,
      viewAction: viewAction,
      editAction: editAction,
      deleteAction: deleteAction,
      avancedSearch: avancedSearch,
      displayedColumns: displayedColumns,
    },
  },
  {
    path: 'edit/:id',
    loadComponent: () => import('@saman-core/common').then((m) => m.CdeEditComponent),
    data: {
      title: $localize`CDE`,
      moduleName: moduleName,
      productName: productName,
      templateName: templateName,
      routeBase: routeBase,
    },
  },
  {
    path: 'create',
    loadComponent: () => import('@saman-core/common').then((m) => m.CdeCreateComponent),
    data: {
      title: $localize`CDE`,
      moduleName: moduleName,
      productName: productName,
      templateName: templateName,
      routeBase: routeBase,
    },
  },
  {
    path: 'view/:id',
    loadComponent: () => import('@saman-core/common').then((m) => m.CdeViewComponent),
    data: {
      title: $localize`CDE`,
      moduleName: moduleName,
      productName: productName,
      templateName: templateName,
      routeBase: routeBase,
    },
  },
];
