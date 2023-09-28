import { TestBed } from '@angular/core/testing';

import { FungiLocationService } from './fungi-location.service';

describe('FungiLocationService', () => {
  let service: FungiLocationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FungiLocationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
