import { Injectable } from '@angular/core';
import { CisaVulnerabilitiesService, CisaVulnerability } from '@cisa-visualizer/shared/data-cisa';
import { groupBy, map, mergeMap, reduce, toArray } from 'rxjs/operators';
import { from } from 'rxjs';

const PIE_CHART_LIMIT = 10;

@Injectable({
  providedIn: 'root'
})
export class ChartService {
  constructor(private readonly cisa: CisaVulnerabilitiesService) {
  }

  getPieChartData() {
    return this.cisa.getVulnerabilities().pipe(
      mergeMap(vulnerabilities => from(vulnerabilities)),
      groupBy(p => p.vendorProject),
      mergeMap(group => group.pipe(
        reduce<CisaVulnerability, CisaVulnerability[]>((acc, curr) => [...acc, curr], []),
        map(vulnerabilities => ({
          name: vulnerabilities[0].vendorProject,
          value: vulnerabilities.length
        }))
      )),
      toArray(),
      map(arr => arr.sort((a, b) => b.value - a.value).slice(0, PIE_CHART_LIMIT))
    );
  }

  getBarChartData() {
    return this.cisa.getVulnerabilities().pipe(
      map(vulnerabilities => {
        const monthlyCounts = vulnerabilities.reduce((acc, curr) => {
          const date = new Date(curr.dateAdded);
          const yearMonth = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`;
          if (!acc[yearMonth]) acc[yearMonth] = 0;
          acc[yearMonth]++;
          return acc;
        }, {} as { [key: string]: number });

        const sortedKeys = Object.keys(monthlyCounts).sort();
        return sortedKeys.map(key => ({ name: key, value: monthlyCounts[key] }));
      })
    );
  }


}
