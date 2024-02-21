import {Component} from '@angular/core';
import { NodeModel, ResourceRepository } from '@saman-core/data';

class ProdutsNode extends NodeModel {
  public templates?: NodeModel[];
}

@Component({
   selector: 'app-template-structure',
   templateUrl: './template-structure.component.html',
   styleUrl: './template-structure.component.scss',
 })
export class TemplateStructureComponent {
   data = '{}';
   products: ProdutsNode[] = [
   ];

   constructor(private _resourceRepository: ResourceRepository) {
    this._resourceRepository.getAllProducts().subscribe((produts) => {
      this.products = produts;
    });
   }

   getTemplates(productName: string): void {
    this._resourceRepository.getAllTemplatesByProduct(productName).subscribe((templates) => {
      const product = this.products.find((product) => product.name === productName);
      if(typeof product !== "undefined")
        product.templates = templates;
    });
   }
}
