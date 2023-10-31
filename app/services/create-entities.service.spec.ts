import { TestBed } from '@angular/core/testing';

import { CreateEntitiesService } from './create-entities.service';

describe('CreateEntitiesService', () => {
  let service: CreateEntitiesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CreateEntitiesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
