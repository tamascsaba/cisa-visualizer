import { Component, Signal, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { tap } from 'rxjs/operators';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { ChartService } from '../chart.service';
import { toSignal } from '@angular/core/rxjs-interop';

@Component({
  selector: 'lib-feature-charts',
  standalone: true,
  imports: [CommonModule, NgxChartsModule],
  templateUrl: './feature-charts.component.html',
  styleUrl: './feature-charts.component.css',
})
export class FeatureChartsComponent {
  protected isPieChartLoading = signal(true);
  protected isBarChartLoading = signal(true);

  protected pieChartData!: Signal<Array<{ name: string, value: number }> | null>;
  protected barChartData!: Signal<Array<{ name: string, value: number }> | null>;

  constructor(private readonly chartService: ChartService) {
    this.pieChartData = toSignal(
      this.chartService.getPieChartData().pipe(tap(() => this.isPieChartLoading.set(false))),
      { initialValue: null}
    );

    this.barChartData = toSignal(
      this.chartService.getBarChartData().pipe(tap(() => this.isBarChartLoading.set(false))),
      { initialValue: null}
    );
  }
}
