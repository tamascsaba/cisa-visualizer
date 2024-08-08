import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CisaResponse } from './cisa-vulnerability';
import { toSignal } from '@angular/core/rxjs-interop';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class CisaVulnerabilitiesService {

  constructor(private readonly http: HttpClient) {}

  public getVulnerabilities() {
    return this.http.get<CisaResponse>('/api/cisa/vulnerabilities')
      .pipe(map( res => res.vulnerabilities));
  }

  public getVulnerabilitiesSignal() {
    return toSignal(this.getVulnerabilities(), {initialValue: null});
  }
}
