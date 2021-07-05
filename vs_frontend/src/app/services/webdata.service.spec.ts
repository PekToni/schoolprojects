import { TestBed } from '@angular/core/testing';

import { WebdataService } from './webdata.service';

describe('WebdataService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: WebdataService = TestBed.get(WebdataService);
    expect(service).toBeTruthy();
  });
});
