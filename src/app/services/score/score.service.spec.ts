import { TestBed } from '@angular/core/testing';

import { ScoreService } from './score.service';

describe('ScoreServiceService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ScoreService = TestBed.get(ScoreService);
    expect(service).toBeTruthy();
  });
});
