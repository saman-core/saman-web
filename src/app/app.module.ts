import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from "@angular/common";

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ConfigurableDataEntityModule } from './configurable-data-entity/configurable-data-entity.module';
import { HomeComponent } from './home/home.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent
  ],
  imports: [
    BrowserModule,
    CommonModule,
    AppRoutingModule,
    ConfigurableDataEntityModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
