import { TestBed } from '@angular/core/testing';

import { BucketListService } from './bucket-list-service';

describe('BucektListService', () => {
  let service: BucketListService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BucketListService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
