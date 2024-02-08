import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FloatinginputcontrolComponent } from './floatinginputcontrol.component';

describe('FloatinginputcontrolComponent', () => {
  let component: FloatinginputcontrolComponent;
  let fixture: ComponentFixture<FloatinginputcontrolComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FloatinginputcontrolComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FloatinginputcontrolComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
