import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CdeBuilderComponent } from './cde-builder.component';

describe('CdeBuilderComponent', () => {
  let component: CdeBuilderComponent;
  let fixture: ComponentFixture<CdeBuilderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CdeBuilderComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CdeBuilderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
