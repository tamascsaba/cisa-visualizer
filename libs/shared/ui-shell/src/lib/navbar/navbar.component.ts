import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';

@Component({
    standalone: true,
    selector: 'app-navbar-cmp',
    templateUrl: './navbar.component.html',
    imports: [
        CommonModule,
        MatToolbarModule,
        MatIconModule
    ]
})
export class NavbarComponent {
}
