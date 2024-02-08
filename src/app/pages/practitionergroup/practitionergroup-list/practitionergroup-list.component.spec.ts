import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PractitionergroupListComponent } from './practitionergroup-list.component';

describe('PractitionergroupListComponent', () => {
  let component: PractitionergroupListComponent;
  let fixture: ComponentFixture<PractitionergroupListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PractitionergroupListComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PractitionergroupListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
