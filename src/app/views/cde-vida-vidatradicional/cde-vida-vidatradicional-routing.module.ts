import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {
  CdeCreateComponent,
  CdeCrudComponent,
  CdeEditComponent,
  CdeViewComponent,
} from '@saman-core/common';

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
const displayedColumns: string[] = ['id', 'producto', 'fechaInicio1', 'duracionDelContrato', 'moneda'];

const routes: Routes = [
  {
    path: '',
    component: CdeCrudComponent,
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
    component: CdeEditComponent,
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
    component: CdeCreateComponent,
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
    component: CdeViewComponent,
    data: {
      title: $localize`CDE`,
      moduleName: moduleName,
      productName: productName,
      templateName: templateName,
      routeBase: routeBase,
    },
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CdeVidaVidatradicionalRoutingModule {}
