import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ButtoncontrolconcomponentComponent } from './buttoncontrolconcomponent.component';

describe('ButtoncontrolconcomponentComponent', () => {
  let component: ButtoncontrolconcomponentComponent;
  let fixture: ComponentFixture<ButtoncontrolconcomponentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ButtoncontrolconcomponentComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ButtoncontrolconcomponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
