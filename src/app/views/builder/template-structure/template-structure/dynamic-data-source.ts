import { CollectionViewer, SelectionChange, DataSource } from '@angular/cdk/collections';
import { FlatTreeControl } from '@angular/cdk/tree';
import { DynamicFlatNode, ResourceRepository } from '@saman-core/data';
import { BehaviorSubject, merge, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

export class DynamicDataSource implements DataSource<DynamicFlatNode> {
    dataChange = new BehaviorSubject<DynamicFlatNode[]>([]);
  
    get data(): DynamicFlatNode[] {
      return this.dataChange.value;
    }
    set data(value: DynamicFlatNode[]) {
      this._treeControl.dataNodes = value;
      this.dataChange.next(value);
    }
  
    constructor(
      private _treeControl: FlatTreeControl<DynamicFlatNode>,
      private _resourceRepository: ResourceRepository,
    ) {}
  
    public connect(collectionViewer: CollectionViewer): Observable<DynamicFlatNode[]> {
      this._treeControl.expansionModel.changed.subscribe((change) => {
        if (change.added || change.removed) {
          this.handleTreeControl(change);
        }
      });
  
      return merge(collectionViewer.viewChange, this.dataChange).pipe(map(() => this.data));
    }
  
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    public disconnect(_: CollectionViewer): void {
      // this method is an implementation without use of the interface 
    }
  
    private handleTreeControl(change: SelectionChange<DynamicFlatNode>): void {
      if (change.added) {
        change.added.forEach((node) => this.toggleNode(node, true));
      }
      if (change.removed) {
        change.removed
          .slice()
          .reverse()
          .forEach((node) => this.toggleNode(node, false));
      }
    }
  
    private toggleNode(node: DynamicFlatNode, expand: boolean): void {
      const index = this.data.indexOf(node);

      if (expand) {
        this._resourceRepository.getAllTemplatesByProduct(node.item).subscribe((templates) => {
          const children = templates.map((t) => t.name);
          if (!children || index < 0) {
            return;
          }
          const nodes = children.map((name) => new DynamicFlatNode(name, node.level + 1, node.item, false));
          this.data.splice(index + 1, 0, ...nodes);
    
          this.dataChange.next(this.data);
        });
      } else {
        let count = 0;
        let i = index + 1;
        while (i < this.data.length && this.data[i].level > node.level) {
          i++; count++;
        }
        this.data.splice(index + 1, count);
        this.dataChange.next(this.data);
      }
    }
  }