import { TestBed } from '@angular/core/testing';

import { PractitionergroupService } from './practitionergroup.service';

describe('PractitionergroupService', () => {
  let service: PractitionergroupService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PractitionergroupService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
