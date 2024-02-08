import { TestBed } from '@angular/core/testing';

import { CouponmanagementService } from './couponmanagement.service';

describe('CouponmanagementService', () => {
  let service: CouponmanagementService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CouponmanagementService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
