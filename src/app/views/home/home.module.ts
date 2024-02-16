import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import {
  AvatarModule,
  ButtonGroupModule,
  ButtonModule,
  CardModule,
  FormModule,
  GridModule,
  NavModule,
  ProgressModule,
  TableModule,
  TabsModule
} from '@coreui/angular';
import { IconModule } from '@coreui/icons-angular';
import { ChartjsModule } from '@coreui/angular-chartjs';

import { HomeRoutingModule } from './home-routing.module';
import { DmnDemoComponent } from './dmn-demo/dmn-demo.component';
import { CdeDemoComponent } from './cde-demo/cde-demo.component';
import { CdeBuilderDemoComponent } from './cde-builder-demo/cde-builder-demo.component';
import { ConfigurableDataEntityModule, DmnEditorModule } from '@saman-core/common';

@NgModule({
  imports: [
    HomeRoutingModule,
    CardModule,
    NavModule,
    IconModule,
    TabsModule,
    CommonModule,
    GridModule,
    ProgressModule,
    ReactiveFormsModule,
    ButtonModule,
    FormModule,
    ButtonModule,
    ButtonGroupModule,
    ChartjsModule,
    AvatarModule,
    TableModule,
    DmnEditorModule,
    ConfigurableDataEntityModule
  ],
  declarations: [DmnDemoComponent, CdeDemoComponent, CdeBuilderDemoComponent]
})
export class HomeModule {
}
