import { TestBed } from '@angular/core/testing';

import { CreateBoxModelsService } from './create-box-models.service';

describe('CreateBoxModelsService', () => {
  let service: CreateBoxModelsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CreateBoxModelsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
