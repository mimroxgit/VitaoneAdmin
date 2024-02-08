import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PractitionergroupCreateComponent } from './practitionergroup-create.component';

describe('PractitionergroupCreateComponent', () => {
  let component: PractitionergroupCreateComponent;
  let fixture: ComponentFixture<PractitionergroupCreateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PractitionergroupCreateComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PractitionergroupCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
