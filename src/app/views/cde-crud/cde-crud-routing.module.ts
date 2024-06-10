import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CdeCrudComponent, CdeEditComponent } from '@saman-core/common';

const productName = 'auto';
const templateName = 'auto1';
const routeBase = 'reinsurance';
const initializedRequests = true;
const searchProperty: string = 'id';
const viewAction: boolean = true;
const editAction: boolean = true;
const deleteAction: boolean = true;
const avancedSearch: boolean = true;
const displayedColumns: string[] = ['cedula', 'nombre', 'ocupacion'];

const routes: Routes = [
  {
    path: '',
    component: CdeCrudComponent,
    data: {
      title: $localize`CDE`,
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
    }
  },
  {
    path: ':id',
    component: CdeEditComponent,
    data: {
      title: $localize`CDE`,
      productName: productName,
      templateName: templateName,
      routeBase: routeBase,
    }
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CdeCrudRoutingModule {
}
