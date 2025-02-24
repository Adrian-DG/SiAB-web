import { Component, OnInit } from '@angular/core';
import { RouterModule, RouterOutlet } from '@angular/router';
import { IUrlOption } from './Shared/Models/iurl-option.model';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatListModule } from '@angular/material/list';
import { MatMenuModule } from '@angular/material/menu';
import { AuthenticationService } from './modules/authentication/services/authentication.service';
import { routes as AppRoutes } from './app.routes';

@Component({
	selector: 'app-root',
	standalone: true,
	imports: [
		RouterOutlet,
		RouterModule,
		MatSidenavModule,
		MatToolbarModule,
		MatIconModule,
		MatButtonModule,
		MatListModule,
		MatMenuModule,
	],
	templateUrl: './app.component.html',
	styleUrl: './app.component.scss',
	providers: [AuthenticationService],
})
export class AppComponent implements OnInit {
	userRoles: string | string[] = [];
	modules: IUrlOption[] = [
		{
			url: 'link',
			name: 'Estadisticas',
			icon: 'chevron_right',
		},
		{
			url: 'existencia',
			name: 'Existencia',
			icon: 'chevron_right',
		},
		{
			url: 'procesos',
			name: 'Procesos',
			icon: 'chevron_right',
		},
		{
			url: 'reportes',
			name: 'Reportes',
			icon: 'chevron_right',
		},
		{
			url: 'mantenimientos',
			name: 'Mantenimientos',
			icon: 'chevron_right',
		},
		{
			url: 'inventario',
			name: 'Inventarios',
			icon: 'chevron_right',
		},
		{
			url: 'empresas',
			name: 'Empresas',
			icon: 'chevron_right',
		},
		{
			url: 'accesos',
			name: 'Accesos',
			icon: 'chevron_right',
		},
	];

	constructor(public _authService: AuthenticationService) {}

	ngOnInit(): void {
		this.userRoles = this._authService.userData()?.Roles ?? [];
		// throw new Error('Method not implemented.');
	}

	hasPermission(url: string): boolean {
		const routeData = AppRoutes.find((route) => route.path === url)
			?.data as { expectedRoles: string[] };
		const permissions = routeData?.expectedRoles ?? [];

		if (permissions.length === 0) return true;

		const hasPermission = Array.isArray(this.userRoles)
			? this.userRoles.some((role) => permissions.includes(role))
			: this.userRoles
					.split(',')
					.some((role) => permissions.includes(role));

		return hasPermission;
	}

	onLogout() {
		this._authService.logout();
	}
}
