import { TestBed } from '@angular/core/testing';

import { ChartsService } from './charts.service';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';

describe('ChartsService', () => {
  let service: ChartsService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideHttpClient(withInterceptorsFromDi())],
    });
    service = TestBed.inject(ChartsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
