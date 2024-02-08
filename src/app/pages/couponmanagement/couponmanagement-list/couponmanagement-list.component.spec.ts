import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CouponmanagementListComponent } from './couponmanagement-list.component';

describe('CouponmanagementListComponent', () => {
  let component: CouponmanagementListComponent;
  let fixture: ComponentFixture<CouponmanagementListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CouponmanagementListComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CouponmanagementListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
