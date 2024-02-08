import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PractitionergroupEditComponent } from './practitionergroup-edit.component';

describe('PractitionergroupEditComponent', () => {
  let component: PractitionergroupEditComponent;
  let fixture: ComponentFixture<PractitionergroupEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PractitionergroupEditComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PractitionergroupEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
