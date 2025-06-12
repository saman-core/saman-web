import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms'
import { MatButtonModule } from '@angular/material/button';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDialogModule } from '@angular/material/dialog';
import { AlertModule } from '@saman-core/core';
import { HierarchyEditorModule } from '@saman-core/common';
import { ProductHierarchyRoutingModule } from './product-hierarchy-routing.module';
import { ProductHierarchyComponent } from './product-hierarchy/product-hierarchy.component';
import { TemplateBuilderModule } from '@saman-core/data';
import { CommitHierarchyDialogComponent } from './commit-hierarchy-dialog/commit-hierarchy-dialog.component';

@NgModule({
  declarations: [
    ProductHierarchyComponent,
    CommitHierarchyDialogComponent,
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatExpansionModule,
    MatIconModule,
    MatListModule,
    MatTooltipModule,
    MatInputModule,
    MatFormFieldModule,
    MatDialogModule,
    AlertModule,
    ProductHierarchyRoutingModule,
    HierarchyEditorModule,
    TemplateBuilderModule,
  ],
  providers: [],
  exports: [],
})
export class ProductHierarchyModule {}
