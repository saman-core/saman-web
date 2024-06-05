import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CdeCrudComponent } from './cde-crud/cde-crud.component';
import { CdeEditComponent } from './cde-edit/cde-edit.component';

const productName = 'auto';
const templateName = 'auto1';
const routeBase = 'reinsurance';
const initializedRequests = true;
const searchProperty: string = 'id';
const isMultipleSelection: boolean = false;
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
      isMultipleSelection: isMultipleSelection,
      viewAction: viewAction,
      editAction: editAction,
      deleteAction: deleteAction,
      avancedSearch: avancedSearch,
      displayedColumns: displayedColumns,
    }
  },
  {
    path: ':pk',
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
