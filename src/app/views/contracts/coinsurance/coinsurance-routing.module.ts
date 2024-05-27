import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { CoinsuranceComponent } from './coinsurance.component';

const routes: Routes = [
  {
    path: '',
    component: CoinsuranceComponent,
    data: {
      title: $localize`Coinsurance`
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CoinsuranceRoutingModule {
}
