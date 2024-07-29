import { Component, Signal, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { tap } from 'rxjs/operators';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { ChartsService } from '../charts.service';
import { toSignal } from '@angular/core/rxjs-interop';

@Component({
  selector: 'lib-feature-charts',
  standalone: true,
  imports: [CommonModule, NgxChartsModule],
  templateUrl: './feature-charts.component.html',
  styleUrl: './feature-charts.component.css',
})
export class FeatureChartsComponent {
  private loading = signal(true);
  public pieChartData!: Signal<Array<{ name: string, value: number }> | null>;
  public barChartData!: Signal<Array<{ name: string, value: number }> | null>;

  constructor(private readonly chartsService: ChartsService) {
    this.pieChartData = toSignal(
      this.chartsService.getPieChartData().pipe(tap(() => this.loading.set(false))),
      { initialValue: null}
    );

    this.barChartData = toSignal(
      this.chartsService.getBarChartData().pipe(tap(() => this.loading.set(false))),
      { initialValue: null}
    );
  }

  protected isLoading() {
    return this.loading();
  }
}
