import { TestBed } from '@angular/core/testing';

import { CreateLaptopsService } from './create-laptops.service';

describe('CreateLaptopsService', () => {
  let service: CreateLaptopsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CreateLaptopsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
