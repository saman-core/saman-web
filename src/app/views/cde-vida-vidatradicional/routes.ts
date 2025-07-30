import { Routes } from '@angular/router';

const moduleName = 'po';
const productName = 'vida';
const templateName = 'vidatradicional';
const routeBase = 'cde-vida-vidatradicional';
const initializedRequests = true;
const searchProperty: string = 'id';
const viewAction: boolean = true;
const editAction: boolean = true;
const deleteAction: boolean = true;
const avancedSearch: boolean = true;
const displayedColumns: string[] = [
  'id',
  'producto',
  'fechaInicio1',
  'duracionDelContrato',
  'moneda',
];

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
