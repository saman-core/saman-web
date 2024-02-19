import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { DmnDemoComponent } from './dmn-demo/dmn-demo.component';
import { CdeDemoComponent } from './cde-demo/cde-demo.component';

const routes: Routes = [
  {
    path: 'dmn-demo',
    component: DmnDemoComponent,
    data: {
      title: 'DMN Demo'
    }
  },
  {
    path: 'cde-demo',
    component: CdeDemoComponent,
    data: {
      title: 'CDE Demo'
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomeRoutingModule {
}
