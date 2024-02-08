import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PractitionercatListComponent } from './practitionercat-list.component';

describe('PractitionercatListComponent', () => {
  let component: PractitionercatListComponent;
  let fixture: ComponentFixture<PractitionercatListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PractitionercatListComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PractitionercatListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
