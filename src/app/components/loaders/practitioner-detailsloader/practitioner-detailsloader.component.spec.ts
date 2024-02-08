import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PractitionerDetailsloaderComponent } from './practitioner-detailsloader.component';

describe('PractitionerDetailsloaderComponent', () => {
  let component: PractitionerDetailsloaderComponent;
  let fixture: ComponentFixture<PractitionerDetailsloaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PractitionerDetailsloaderComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PractitionerDetailsloaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
