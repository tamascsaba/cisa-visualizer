import { TestBed, waitForAsync } from '@angular/core/testing';

import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { CisaVulnerability } from '@cisa-visualizer/shared/data-cisa';
import { ChartService } from './chart.service';

describe('ChartService', () => {
  let service: ChartService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        provideHttpClient(withInterceptorsFromDi()),
        provideHttpClientTesting()
      ],
    });
    service = TestBed.inject(ChartService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should return the top vendor projects based on number of vulnerabilities', waitForAsync(() => {
    const mockVulnerabilities: CisaVulnerability[] = [
      { cveID: 'CVE-2021-27104', vendorProject: 'Apple', product: 'Product1', vulnerabilityName: 'Vuln1', dateAdded: '2021-11-03', shortDescription: '', requiredAction: '', dueDate: '', knownRansomwareCampaignUse: '', notes: '', cwes: [] },
      { cveID: 'CVE-2021-27105', vendorProject: 'Apple', product: 'Product2', vulnerabilityName: 'Vuln2', dateAdded: '2021-11-15', shortDescription: '', requiredAction: '', dueDate: '', knownRansomwareCampaignUse: '', notes: '', cwes: [] },
      { cveID: 'CVE-2021-27106', vendorProject: 'Microsoft', product: 'Product3', vulnerabilityName: 'Vuln3', dateAdded: '2021-12-01', shortDescription: '', requiredAction: '', dueDate: '', knownRansomwareCampaignUse: '', notes: '', cwes: [] },
      { cveID: 'CVE-2021-27107', vendorProject: 'Microsoft', product: 'Product4', vulnerabilityName: 'Vuln4', dateAdded: '2021-12-02', shortDescription: '', requiredAction: '', dueDate: '', knownRansomwareCampaignUse: '', notes: '', cwes: [] },
      { cveID: 'CVE-2021-27108', vendorProject: 'Google', product: 'Product5', vulnerabilityName: 'Vuln5', dateAdded: '2021-12-03', shortDescription: '', requiredAction: '', dueDate: '', knownRansomwareCampaignUse: '', notes: '', cwes: [] },
    ];

    const expectedTop = [
      { name: 'Apple', value: 2 },
      { name: 'Microsoft', value: 2 },
      { name: 'Google', value: 1 },
    ];


    service.getPieChartData().subscribe(pieChartData => {
      expect(pieChartData).toEqual(expectedTop);
    });

    const req = httpMock.expectOne('/api/cisa/vulnerabilities');
    expect(req.request.method).toBe('GET');
    req.flush({vulnerabilities: mockVulnerabilities});
  }));

  it('should handle the case where there are fewer projects', waitForAsync(() => {
    const mockVulnerabilities: CisaVulnerability[] = [
      { cveID: 'CVE-2021-27104', vendorProject: 'Apple', product: 'Product1', vulnerabilityName: 'Vuln1', dateAdded: '2021-11-03', shortDescription: '', requiredAction: '', dueDate: '', knownRansomwareCampaignUse: '', notes: '', cwes: [] },
      { cveID: 'CVE-2021-27105', vendorProject: 'Microsoft', product: 'Product2', vulnerabilityName: 'Vuln2', dateAdded: '2021-11-15', shortDescription: '', requiredAction: '', dueDate: '', knownRansomwareCampaignUse: '', notes: '', cwes: [] }
    ];

    const expectedTopVendors = [
      { name: 'Apple', value: 1 },
      { name: 'Microsoft', value: 1 }
    ];

    service.getPieChartData().subscribe(pieChartData => {
      expect(pieChartData).toEqual(expectedTopVendors);
    });

    const req = httpMock.expectOne('/api/cisa/vulnerabilities');
    expect(req.request.method).toBe('GET');
    req.flush({vulnerabilities: mockVulnerabilities});
  }));


  it('should return an empty array if no vulnerabilities are returned', waitForAsync(() => {
    service.getBarChartData().subscribe(barChartData => {
      expect(barChartData).toEqual([]);
    });

    const req = httpMock.expectOne('/api/cisa/vulnerabilities');
    expect(req.request.method).toBe('GET');
    req.flush({vulnerabilities: []});
  }));

  it('should return bar chart data for monthly vulnerability visualization', waitForAsync(() => {
    const mockVulnerabilities: CisaVulnerability[] = [
      { cveID: 'CVE-2021-27104', vendorProject: 'Apple', product: 'FTA', vulnerabilityName: 'Some Vulnerability', dateAdded: '2021-11-03', shortDescription: '', requiredAction: '', dueDate: '', knownRansomwareCampaignUse: '', notes: '', cwes: [] },
      { cveID: 'CVE-2021-27105', vendorProject: 'Microsoft', product: 'FTA', vulnerabilityName: 'Another Vulnerability', dateAdded: '2021-11-15', shortDescription: '', requiredAction: '', dueDate: '', knownRansomwareCampaignUse: '', notes: '', cwes: [] },
      { cveID: 'CVE-2021-27106', vendorProject: 'Google', product: 'FTA', vulnerabilityName: 'Yet Another Vulnerability', dateAdded: '2021-12-01', shortDescription: '', requiredAction: '', dueDate: '', knownRansomwareCampaignUse: '', notes: '', cwes: [] },
      { cveID: 'CVE-2022-12345', vendorProject: 'AnotherVendor', product: 'ProductX', vulnerabilityName: 'Vulnerability in ProductX', dateAdded: '2022-01-20', shortDescription: '', requiredAction: '', dueDate: '', knownRansomwareCampaignUse: '', notes: '', cwes: [] }
    ];

    const expectedMonthlyCounts = [
      { name: '2021-11', value: 2 },
      { name: '2021-12', value: 1 },
      { name: '2022-01', value: 1 }
    ];

    service.getBarChartData().subscribe(barChartData => {
      expect(barChartData).toEqual(expectedMonthlyCounts);
    });

    const req = httpMock.expectOne('/api/cisa/vulnerabilities'); // Replace with your actual API URL
    expect(req.request.method).toBe('GET');
    req.flush({vulnerabilities: mockVulnerabilities});
  }));

});
