import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PractitionersListComponent } from './practitioners-list.component';

describe('PractitionersListComponent', () => {
  let component: PractitionersListComponent;
  let fixture: ComponentFixture<PractitionersListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PractitionersListComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PractitionersListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
