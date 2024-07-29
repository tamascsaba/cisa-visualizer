import { Component, signal, ViewChild, AfterViewInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CisaVulnerabilitiesService, CisaVulnerability } from '@cisa-visualizer/shared/data-cisa';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';

import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';

@Component({
  selector: 'lib-feature-table',
  standalone: true,
  imports: [CommonModule, NgxDatatableModule, MatTableModule, MatPaginator],
  templateUrl: './feature-table.component.html',
  styleUrl: 'feature-table.component.scss'
})
export class FeatureTableComponent implements AfterViewInit {
  private loading = signal(true);
  public dataSource = new MatTableDataSource<CisaVulnerability>();
  public displayedColumns: string[] = ['cveID', 'vendorProject', 'product', 'dateAdded', 'shortDescription'];

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(private readonly cisa: CisaVulnerabilitiesService) {
  }

  ngAfterViewInit() {
    this.cisa.getVulnerabilities().subscribe(vulnerabilities => {
      this.dataSource.data = vulnerabilities;
      this.dataSource.paginator = this.paginator;
    });
  }

  protected isLoading() {
    return this.loading();
  }
}
