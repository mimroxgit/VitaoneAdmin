import { TestBed } from '@angular/core/testing';

import { CouriercompanyService } from './couriercompany.service';

describe('CouriercompanyService', () => {
  let service: CouriercompanyService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CouriercompanyService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
