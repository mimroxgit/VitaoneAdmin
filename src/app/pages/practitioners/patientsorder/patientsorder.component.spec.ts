import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PatientsorderComponent } from './patientsorder.component';

describe('PatientsorderComponent', () => {
  let component: PatientsorderComponent;
  let fixture: ComponentFixture<PatientsorderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PatientsorderComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PatientsorderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
