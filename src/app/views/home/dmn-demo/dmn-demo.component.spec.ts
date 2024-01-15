import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DmnDemoComponent } from './dmn-demo.component';

describe('DmnDemoComponent', () => {
  let component: DmnDemoComponent;
  let fixture: ComponentFixture<DmnDemoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DmnDemoComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DmnDemoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
