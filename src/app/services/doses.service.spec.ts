import { TestBed } from '@angular/core/testing';

import { DosesService } from './doses.service';

describe('DosesService', () => {
  let service: DosesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DosesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
