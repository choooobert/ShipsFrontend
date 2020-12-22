import { TestBed } from '@angular/core/testing';

import { ShootMapService } from './shoot-map.service';

describe('ShootMapService', () => {
  let service: ShootMapService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ShootMapService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
