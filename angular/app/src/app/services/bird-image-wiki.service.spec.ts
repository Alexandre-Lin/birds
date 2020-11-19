import { TestBed } from '@angular/core/testing';

import { BirdImageWikiService } from './bird-image-wiki.service';

describe('BirdImageWikiService', () => {
  let service: BirdImageWikiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BirdImageWikiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
