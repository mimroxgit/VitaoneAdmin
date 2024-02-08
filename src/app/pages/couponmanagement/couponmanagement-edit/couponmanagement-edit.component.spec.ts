import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CouponmanagementEditComponent } from './couponmanagement-edit.component';

describe('CouponmanagementEditComponent', () => {
  let component: CouponmanagementEditComponent;
  let fixture: ComponentFixture<CouponmanagementEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CouponmanagementEditComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CouponmanagementEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
