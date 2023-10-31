import { TestBed } from '@angular/core/testing';

import { CreateComputersService } from './create-computers.service';

describe('CreateComputersService', () => {
  let service: CreateComputersService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CreateComputersService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
