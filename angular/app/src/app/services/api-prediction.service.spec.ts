import { TestBed } from '@angular/core/testing';

import { ApiPredictionService } from './api-prediction.service';

describe('ApiPredictionService', () => {
  let service: ApiPredictionService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ApiPredictionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
