import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatRippleModule } from '@angular/material/core';
import { MatTableModule } from '@angular/material/table';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';
import { MatExpansionModule } from '@angular/material/expansion';
import { CdeSearchComponent } from './cde-search/cde-search.component';
import { TemplateModule, CdeModule } from '@saman-core/data';
import { FormUtilModule } from '../form-util/form-util.module';
import { FormioModule } from '@formio/angular';
import { ConfigurableDataEntityModule } from '@saman-core/common';

@NgModule({
  declarations: [CdeSearchComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatPaginatorModule,
    MatSortModule,
    MatTableModule,
    MatRippleModule,
    MatInputModule,
    MatFormFieldModule,
    MatCheckboxModule,
    MatIconModule,
    MatButtonModule,
    MatMenuModule,
    MatExpansionModule,
    TemplateModule,
    CdeModule,
    FormUtilModule,
    FormioModule,
    ConfigurableDataEntityModule,
  ],
  providers: [],
  exports: [CdeSearchComponent],
})
export class CdeSearchModule {}
