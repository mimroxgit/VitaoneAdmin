import { TestBed } from '@angular/core/testing';

import { ItemunitsService } from './itemunits.service';

describe('ItemunitsService', () => {
  let service: ItemunitsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ItemunitsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
