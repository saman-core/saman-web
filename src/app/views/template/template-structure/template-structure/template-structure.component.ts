import { Component, OnInit, ViewChild, ViewContainerRef, inject } from '@angular/core';
import { OpsGitRepository } from '@saman-core/data';
import { TemplateFormBuilderComponent } from '../template-form-builder/template-form-builder.component';
import { MatIconButton } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';
import { MatSelectModule } from '@angular/material/select';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-template-structure',
  templateUrl: './template-structure.component.html',
  styleUrl: './template-structure.component.scss',
  imports: [MatIconButton, MatIcon, MatSelectModule, CommonModule, FormsModule, RouterModule],
})
export class TemplateStructureComponent implements OnInit {
  private readonly _productsGitRepository = inject(OpsGitRepository);
  private readonly _router = inject(Router);

  @ViewChild('dynamicEditorLoader', { read: ViewContainerRef, static: true })
  dynamicEditorLoader: ViewContainerRef;
  data = '{}';
  modules: string[] = [];
  products: string[] = [];
  templates: string[] = [];
  moduleNameSelected = '';
  productNameSelected = '';
  templateNameSelected = '';

  ngOnInit() {
    this.refreshModules();
  }

  navigateToConditions() {
    this._router.navigate(['/template/conditions']);
  }

  navigateToManage() {
    this._router.navigate(['/template/manage']);
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
        });
    } else {
      this.products = [];
      this.productNameSelected = '';
    }
    this.refreshTemplates();
  }

  refreshTemplates() {
    if (this.productNameSelected != '') {
      this._productsGitRepository
        .getAllTemplatesByProduct(this.moduleNameSelected, this.productNameSelected)
        .subscribe((templates) => {
          this.templates = templates.map((p) => p.name);
          this.templateNameSelected = '';
          this.dynamicEditorLoader.clear();
        });
    } else {
      this.templates = [];
      this.templateNameSelected = '';
    }
  }

  openEditor() {
    this._productsGitRepository
      .getTemplate(this.moduleNameSelected, this.productNameSelected, this.templateNameSelected)
      .subscribe((node) => {
        this.dynamicEditorLoader.clear();
        const componentRef = this.dynamicEditorLoader.createComponent(TemplateFormBuilderComponent);
        componentRef.instance.productName = this.moduleNameSelected;
        componentRef.instance.productName = this.productNameSelected;
        componentRef.instance.templateName = this.templateNameSelected;
        componentRef.instance.node = node;
        componentRef.instance.exitEmitter.subscribe(() => {
          this.templateNameSelected = '';
          componentRef.destroy();
        });
      });
  }
}
