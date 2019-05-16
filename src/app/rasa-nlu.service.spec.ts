import { TestBed } from '@angular/core/testing';

import { RasaNluService } from './rasa-nlu.service';

describe('RasaNluService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: RasaNluService = TestBed.get(RasaNluService);
    expect(service).toBeTruthy();
  });
});
