import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PatientlistloaderComponent } from './patientlistloader.component';

describe('PatientlistloaderComponent', () => {
  let component: PatientlistloaderComponent;
  let fixture: ComponentFixture<PatientlistloaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PatientlistloaderComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PatientlistloaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
