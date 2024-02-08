import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CouponlistloaderComponent } from './couponlistloader.component';

describe('CouponlistloaderComponent', () => {
  let component: CouponlistloaderComponent;
  let fixture: ComponentFixture<CouponlistloaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CouponlistloaderComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CouponlistloaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
