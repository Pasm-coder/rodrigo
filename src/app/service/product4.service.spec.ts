import { TestBed } from '@angular/core/testing';

import { Product4Service } from './product4.service';

describe('Product4Service', () => {
  let service: Product4Service;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Product4Service);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
