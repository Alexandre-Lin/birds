import { TestBed } from '@angular/core/testing';

import { BirdApiService } from './bird-api.service';

describe('BirdApiService', () => {
  let service: BirdApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BirdApiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
