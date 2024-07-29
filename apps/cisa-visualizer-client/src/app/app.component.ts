import { Component } from '@angular/core';

import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { NavbarComponent, SidebarComponent } from '@cisa-visualizer/shared/ui-shell';

import material from './material';

@Component({
  standalone: true,
  selector: 'app-root',
  imports: [
    ...material,
    RouterModule,
    CommonModule,
    NavbarComponent,
    SidebarComponent,
  ],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
}
