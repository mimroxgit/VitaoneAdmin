import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PractitionergroupDetailsComponent } from './practitionergroup-details.component';

describe('PractitionergroupDetailsComponent', () => {
  let component: PractitionergroupDetailsComponent;
  let fixture: ComponentFixture<PractitionergroupDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PractitionergroupDetailsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PractitionergroupDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
