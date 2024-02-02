import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { DatasourceFactory } from './datasource/datasource.factory';

@NgModule({
  imports: [HttpClientModule],
  providers: [DatasourceFactory],
})
export class DataBaseModule {}
