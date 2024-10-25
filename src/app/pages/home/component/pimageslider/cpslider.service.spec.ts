import { TestBed } from '@angular/core/testing';

import { CpsliderService } from './cpslider.service';

describe('CpsliderService', () => {
  let service: CpsliderService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CpsliderService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
