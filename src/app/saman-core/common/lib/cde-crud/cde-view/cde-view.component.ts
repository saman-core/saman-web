import { Component, OnInit, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CdeComponent } from '../../configurable-data-entity/cde/cde.component';
import { MatButton } from '@angular/material/button';

@Component({
  selector: 'app-cde-view',
  templateUrl: './cde-view.component.html',
  styleUrl: './cde-view.component.scss',
  imports: [CdeComponent, MatButton],
})
export class CdeViewComponent implements OnInit {
  private _router = inject(Router);
  private _activatedRoute = inject(ActivatedRoute);

  moduleName: string = '';
  productName: string = '';
  templateName: string = '';
  routeBase = '';
  id = 0;

  ngOnInit() {
    this.id = parseInt(this._activatedRoute.snapshot.params['id']);
    this._activatedRoute.data.subscribe((data) => {
      this.moduleName = data.moduleName;
      this.productName = data.productName;
      this.templateName = data.templateName;
      this.routeBase = data.routeBase;
    });
  }

  return(): void {
    this._router.navigate([this.routeBase]);
  }
}
