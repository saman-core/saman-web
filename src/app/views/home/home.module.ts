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
import { HomeComponent } from './home.component';
import { DmnEditorModule } from '../../dmn-editor/dmn-editor.module';
import { ConfigurableDataEntityModule } from '../../configurable-data-entity/configurable-data-entity.module';

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
  declarations: [HomeComponent]
})
export class HomeModule {
}
