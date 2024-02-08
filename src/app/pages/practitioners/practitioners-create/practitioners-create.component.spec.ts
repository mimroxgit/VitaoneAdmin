import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PractitionersCreateComponent } from './practitioners-create.component';

describe('PractitionersCreateComponent', () => {
  let component: PractitionersCreateComponent;
  let fixture: ComponentFixture<PractitionersCreateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PractitionersCreateComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PractitionersCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
