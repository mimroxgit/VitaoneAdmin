import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CouponmanagementCreateComponent } from './couponmanagement-create.component';

describe('CouponmanagementCreateComponent', () => {
  let component: CouponmanagementCreateComponent;
  let fixture: ComponentFixture<CouponmanagementCreateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CouponmanagementCreateComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CouponmanagementCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
