import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PractitionercatEditComponent } from './practitionercat-edit.component';

describe('PractitionercatEditComponent', () => {
  let component: PractitionercatEditComponent;
  let fixture: ComponentFixture<PractitionercatEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PractitionercatEditComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PractitionercatEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
