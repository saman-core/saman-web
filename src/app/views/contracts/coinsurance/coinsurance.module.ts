import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CoinsuranceRoutingModule } from './coinsurance-routing.module';
import { CoinsuranceComponent } from './coinsurance.component';
import { CdeSearchModule } from '@saman-core/common';

@NgModule({
  imports: [
    CoinsuranceRoutingModule,
    CommonModule,
    CdeSearchModule,
  ],
  declarations: [CoinsuranceComponent]
})
export class CoinsuranceModule {
}
