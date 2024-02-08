import { TestBed } from '@angular/core/testing';

import { GetinquiryService } from './getinquiry.service';

describe('GetinquiryService', () => {
  let service: GetinquiryService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GetinquiryService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
