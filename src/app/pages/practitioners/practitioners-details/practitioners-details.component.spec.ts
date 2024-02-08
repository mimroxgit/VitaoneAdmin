import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PractitionersDetailsComponent } from './practitioners-details.component';

describe('PractitionersDetailsComponent', () => {
  let component: PractitionersDetailsComponent;
  let fixture: ComponentFixture<PractitionersDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PractitionersDetailsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PractitionersDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
