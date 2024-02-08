import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CouriercompanyListComponent } from './couriercompany-list.component';

describe('CouriercompanyListComponent', () => {
  let component: CouriercompanyListComponent;
  let fixture: ComponentFixture<CouriercompanyListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CouriercompanyListComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CouriercompanyListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
