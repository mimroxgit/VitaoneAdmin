import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CouriercompanyCreateComponent } from './couriercompany-create.component';

describe('CouriercompanyCreateComponent', () => {
  let component: CouriercompanyCreateComponent;
  let fixture: ComponentFixture<CouriercompanyCreateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CouriercompanyCreateComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CouriercompanyCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
