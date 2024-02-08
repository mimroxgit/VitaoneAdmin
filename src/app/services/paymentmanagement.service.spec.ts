import { TestBed } from '@angular/core/testing';

import { PaymentmanagementService } from './paymentmanagement.service';

describe('PaymentmanagementService', () => {
  let service: PaymentmanagementService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PaymentmanagementService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
