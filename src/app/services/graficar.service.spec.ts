import { TestBed } from '@angular/core/testing';

import { GraficarService } from './graficar.service';

describe('GraficarService', () => {
  let service: GraficarService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GraficarService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
