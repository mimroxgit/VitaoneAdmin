import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InputcontrolComponent } from './inputcontrol.component';

describe('InputcontrolComponent', () => {
  let component: InputcontrolComponent;
  let fixture: ComponentFixture<InputcontrolComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InputcontrolComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InputcontrolComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
