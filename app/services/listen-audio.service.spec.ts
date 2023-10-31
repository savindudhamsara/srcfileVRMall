import { TestBed } from '@angular/core/testing';

import { ListenAudioService } from './listen-audio.service';

describe('ListenAudioService', () => {
  let service: ListenAudioService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ListenAudioService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
