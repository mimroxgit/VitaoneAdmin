import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CouriercompanyEditComponent } from './couriercompany-edit.component';

describe('CouriercompanyEditComponent', () => {
  let component: CouriercompanyEditComponent;
  let fixture: ComponentFixture<CouriercompanyEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CouriercompanyEditComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CouriercompanyEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
