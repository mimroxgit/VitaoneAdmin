import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PractitionercatCreateComponent } from './practitionercat-create.component';

describe('PractitionercatCreateComponent', () => {
  let component: PractitionercatCreateComponent;
  let fixture: ComponentFixture<PractitionercatCreateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PractitionercatCreateComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PractitionercatCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
