import { TestBed } from '@angular/core/testing';

import { ImageWikiService } from './image-wiki.service';

describe('ImageWikiService', () => {
  let service: ImageWikiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ImageWikiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
