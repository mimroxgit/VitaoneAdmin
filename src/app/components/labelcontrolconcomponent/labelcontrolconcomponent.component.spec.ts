import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LabelcontrolconcomponentComponent } from './labelcontrolconcomponent.component';

describe('LabelcontrolconcomponentComponent', () => {
  let component: LabelcontrolconcomponentComponent;
  let fixture: ComponentFixture<LabelcontrolconcomponentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LabelcontrolconcomponentComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LabelcontrolconcomponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
