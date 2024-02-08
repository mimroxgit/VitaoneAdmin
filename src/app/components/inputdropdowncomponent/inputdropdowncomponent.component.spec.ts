import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InputdropdowncomponentComponent } from './inputdropdowncomponent.component';

describe('InputdropdowncomponentComponent', () => {
  let component: InputdropdowncomponentComponent;
  let fixture: ComponentFixture<InputdropdowncomponentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InputdropdowncomponentComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InputdropdowncomponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
