import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DmnEditorComponent } from './dmn-editor.component';

describe('DmnEditorComponent', () => {
  let component: DmnEditorComponent;
  let fixture: ComponentFixture<DmnEditorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DmnEditorComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DmnEditorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
