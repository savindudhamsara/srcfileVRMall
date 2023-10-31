import { TestBed } from '@angular/core/testing';

import { Shop2BoxModelsService } from './shop2-box-models.service';

describe('Shop2BoxModelsService', () => {
  let service: Shop2BoxModelsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Shop2BoxModelsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
