import { Component, Output, EventEmitter, Input, inject, ChangeDetectionStrategy } from '@angular/core';
import { AuthenticationService } from '../../../modules/authentication/services/authentication.service';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';
import { CommonModule } from '@angular/common';
import { SideBarService } from '../../Services/SideBar.service';



@Component({
    selector: 'app-header',
    standalone: true,
    imports: [
        CommonModule,
        MatToolbarModule,
        MatIconModule,
        MatButtonModule,
        MatMenuModule
        
    ],
    templateUrl: './header.component.html',
    styleUrl: './header.component.scss',
    changeDetection: ChangeDetectionStrategy.Default
})
export class HeaderComponent {
    @Input() appTitle = 'SiAB';
    @Input() additionalStyles = {};
    @Output() logout = new EventEmitter<void>();
    sideBarService = inject(SideBarService);

    constructor(public authService: AuthenticationService) { }

    onLogout(): void {
        this.authService.logout();
    }
}