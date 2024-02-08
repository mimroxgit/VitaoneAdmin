import { TestBed } from '@angular/core/testing';

import { PaymentgatewayService } from './paymentgateway.service';

describe('PaymentgatewayService', () => {
  let service: PaymentgatewayService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PaymentgatewayService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
