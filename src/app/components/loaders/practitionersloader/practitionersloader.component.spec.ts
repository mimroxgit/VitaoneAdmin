import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PractitionersloaderComponent } from './practitionersloader.component';

describe('PractitionersloaderComponent', () => {
  let component: PractitionersloaderComponent;
  let fixture: ComponentFixture<PractitionersloaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PractitionersloaderComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PractitionersloaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
