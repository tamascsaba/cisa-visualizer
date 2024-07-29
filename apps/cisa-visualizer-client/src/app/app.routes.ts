import { Routes } from '@angular/router';

export const appRoutes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'home'
  },
  {
    path: 'home',
    loadComponent: () => import('@cisa-visualizer/feature-home')
      .then(m => m.FeatureHomeComponent)
  },
  {
    path: 'charts',
    loadComponent: () => import('@cisa-visualizer/feature-charts')
      .then(m => m.FeatureChartsComponent)
  },
  {
    path: 'table',
    loadComponent: () => import('@cisa-visualizer/feature-table')
      .then(m => m.FeatureTableComponent)
  }
];
