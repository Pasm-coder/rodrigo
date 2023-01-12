import { TestBed } from '@angular/core/testing';

import { Product3Service } from './product3.service';

describe('Product3Service', () => {
  let service: Product3Service;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Product3Service);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
