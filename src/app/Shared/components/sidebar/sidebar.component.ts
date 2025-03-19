import { Component } from '@angular/core';
import { AuthenticationService } from '../../../modules/authentication/services/authentication.service';
import { IUrlOption } from '../../Models/iurl-option.model';
import { routes as AppRoutes } from '../../../app.routes';
import { CommonModule } from '@angular/common';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { RouterModule } from '@angular/router';
import { SideBarService } from '../../Services/SideBar.service';
import { inject } from '@angular/core';

@Component({
    selector: 'app-sidebar',
    standalone: true,
    imports: [
        CommonModule,
        MatSidenavModule,
        MatListModule,
        RouterModule
    ],
    templateUrl: './sidebar.component.html',
    styleUrl: './sidebar.component.scss'
})
export class SidebarComponent {

    sideBarService = inject(SideBarService);

    modules: IUrlOption[] = [
        { url: 'estadisticas', name: 'Estadisticas', icon: 'chevron_right' },
        { url: 'existencia', name: 'Existencia', icon: 'chevron_right' },
        { url: 'procesos', name: 'Procesos', icon: 'chevron_right' },
        { url: 'reportes', name: 'Reportes', icon: 'chevron_right' },
        { url: 'mantenimientos', name: 'Mantenimientos', icon: 'chevron_right' },
        { url: 'inventario', name: 'Inventarios', icon: 'chevron_right' },
        { url: 'empresas', name: 'Empresas', icon: 'chevron_right' },
        { url: 'accesos', name: 'Accesos', icon: 'chevron_right' },
    ];

    constructor(public authService: AuthenticationService) { }

    hasPermission(url: string): boolean {
        const routeData = AppRoutes.find(route => route.path === url)?.data as { expectedRoles: string[] };
        const permissions = routeData?.expectedRoles ?? [];

        if (permissions.length === 0) return true;

        const userRoles = this.authService.userData()?.Roles ?? [];
        return Array.isArray(userRoles)
            ? userRoles.some(role => permissions.includes(role))
            : userRoles.split(',').some(role => permissions.includes(role));
    }
}