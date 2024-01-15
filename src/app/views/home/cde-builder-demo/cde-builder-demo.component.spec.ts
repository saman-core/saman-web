import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CdeBuilderDemoComponent } from './cde-builder-demo.component';

describe('CdeBuilderDemoComponent', () => {
  let component: CdeBuilderDemoComponent;
  let fixture: ComponentFixture<CdeBuilderDemoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CdeBuilderDemoComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CdeBuilderDemoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
