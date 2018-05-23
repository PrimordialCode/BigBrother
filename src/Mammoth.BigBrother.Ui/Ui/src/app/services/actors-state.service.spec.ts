import { TestBed, inject } from '@angular/core/testing';

import { ActorsStateService } from './actors-state.service';

describe('ActorsStateService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ActorsStateService]
    });
  });

  it('should be created', inject([ActorsStateService], (service: ActorsStateService) => {
    expect(service).toBeTruthy();
  }));
});
