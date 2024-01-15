import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CdeDemoComponent } from './cde-demo.component';

describe('CdeDemoComponent', () => {
  let component: CdeDemoComponent;
  let fixture: ComponentFixture<CdeDemoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CdeDemoComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CdeDemoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
