import { TestBed } from '@angular/core/testing';

import { ShipMapService } from './ship-map.service';

describe('MapService', () => {
  let service: ShipMapService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ShipMapService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
