import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatRippleModule } from '@angular/material/core';
import { MatTableModule } from '@angular/material/table';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { CdeSearchComponent } from './cde-search/cde-search.component';
import { TemplateModule, CdeModule } from '@saman-core/data';
import { FormUtilModule } from '../form-util/form-util.module';

@NgModule({
  declarations: [CdeSearchComponent],
  imports: [
    CommonModule,
    MatPaginatorModule,
    MatSortModule,
    MatTableModule,
    MatRippleModule,
    MatInputModule,
    MatFormFieldModule,
    MatCheckboxModule,
    TemplateModule,
    CdeModule,
    FormUtilModule,
  ],
  providers: [],
  exports: [CdeSearchComponent],
})
export class CdeSearchModule {}
