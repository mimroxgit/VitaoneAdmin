import { TestBed } from '@angular/core/testing';

import { SmstempalteService } from './smstempalte.service';

describe('SmstempalteService', () => {
  let service: SmstempalteService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SmstempalteService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
