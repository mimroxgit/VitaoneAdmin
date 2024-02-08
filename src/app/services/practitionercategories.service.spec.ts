import { TestBed } from '@angular/core/testing';

import { PractitionercategoriesService } from './practitionercategories.service';

describe('PractitionercategoriesService', () => {
  let service: PractitionercategoriesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PractitionercategoriesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
