import { TestBed } from '@angular/core/testing';

import { CisaVulnerabilitiesService } from './cisa-vulnerabilities.service';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';

describe('CisaDataService', () => {
  let service: CisaVulnerabilitiesService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideHttpClient(withInterceptorsFromDi())],
    });
    service = TestBed.inject(CisaVulnerabilitiesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
