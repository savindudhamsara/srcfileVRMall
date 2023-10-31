import { TestBed } from '@angular/core/testing';

import { CheckoutListService } from './checkout-list.service';

describe('CheckoutListService', () => {
  let service: CheckoutListService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CheckoutListService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
