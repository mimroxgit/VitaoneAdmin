import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PatientsloaderComponent } from './patientsloader.component';

describe('PatientsloaderComponent', () => {
  let component: PatientsloaderComponent;
  let fixture: ComponentFixture<PatientsloaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PatientsloaderComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PatientsloaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
