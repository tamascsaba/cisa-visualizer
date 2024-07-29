import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CisaVulnerability } from './cisa-vulnerability';
import { toSignal } from '@angular/core/rxjs-interop';

@Injectable({
  providedIn: 'root',
})
export class CisaVulnerabilitiesService {

  constructor(private readonly http: HttpClient) {}

  public getVulnerabilities() {
    return this.http.get<CisaVulnerability[]>('/api/cisa/vulnerabilities');
  }

  public getVulnerabilitiesSignal() {
    return toSignal(this.getVulnerabilities());
  }
}
