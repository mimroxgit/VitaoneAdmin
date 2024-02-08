import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ToggleswitchcontrolComponent } from './toggleswitchcontrol.component';

describe('ToggleswitchcontrolComponent', () => {
  let component: ToggleswitchcontrolComponent;
  let fixture: ComponentFixture<ToggleswitchcontrolComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ToggleswitchcontrolComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ToggleswitchcontrolComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
