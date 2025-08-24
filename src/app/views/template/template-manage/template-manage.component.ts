import { Component, inject } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatListModule } from '@angular/material/list';
import { MatTabsModule } from '@angular/material/tabs';
import { MatSelectModule } from '@angular/material/select';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ProductsGitRepository } from '@saman-core/data';

@Component({
  selector: 'app-template-manage',
  templateUrl: './template-manage.component.html',
  styleUrls: ['./template-manage.component.scss'],
  standalone: true,
  imports: [
    MatCardModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatListModule,
    MatSelectModule,
    MatTabsModule,
    CommonModule,
    FormsModule,
    RouterModule,
  ],
})
export class TemplateManageComponent {
  private readonly _router = inject(Router);
  private readonly _productsGitRepository = inject(ProductsGitRepository);

  modules: string[] = [];
  products: string[] = [];
  moduleNameSelected = '';
  productNameSelected = '';
  items = [];

  constructor() {
    this.refreshModules();
  }

  navigateToStructure() {
    this._router.navigate(['/template/structure']);
  }

  navigateToCondition() {
    this._router.navigate(['/template/condition']);
  }

  refreshModules() {
    this._productsGitRepository.getAllModules().subscribe((products) => {
      this.modules = products.map((p) => p.name);
    });
    this.refreshProducts();
  }

  refreshProducts() {
    if (this.moduleNameSelected != '') {
      this._productsGitRepository
        .getAllProductsByModule(this.moduleNameSelected)
        .subscribe((products) => {
          this.products = products.map((p) => p.name);
          this.productNameSelected = '';
          this.items = [];
        });
    } else {
      this.products = [];
      this.productNameSelected = '';
      this.items = [];
    }
  }

  openEditor() {
    this._productsGitRepository
      .getAllTemplatesByProduct(this.moduleNameSelected, this.productNameSelected)
      .subscribe((templates) => {
        this.items = templates.map((t) => {
          return {
            title: t.name,
            desc: 'lorem ipsum dolor sit amet',
            version: '2.3.1',
            updated: '08/01/2025',
          };
        });
      });
  }
}
