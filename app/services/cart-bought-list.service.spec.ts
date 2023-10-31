import { TestBed } from '@angular/core/testing';

import { CartBoughtListService } from './cart-bought-list.service';

describe('CartBoughtListService', () => {
  let service: CartBoughtListService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CartBoughtListService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
