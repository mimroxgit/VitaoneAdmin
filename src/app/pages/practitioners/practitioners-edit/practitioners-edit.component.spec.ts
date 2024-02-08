import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PractitionersEditComponent } from './practitioners-edit.component';

describe('PractitionersEditComponent', () => {
  let component: PractitionersEditComponent;
  let fixture: ComponentFixture<PractitionersEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PractitionersEditComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PractitionersEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
