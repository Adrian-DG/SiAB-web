import {
	ChangeDetectionStrategy,
	ChangeDetectorRef,
	Component,
	OnInit,
} from '@angular/core';
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
import { CommonModule } from '@angular/common';

@Component({
	selector: 'app-root',
	standalone: true,
	imports: [
		CommonModule,
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
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent implements OnInit {
	userRoles: string | string[] = [];
	modules: IUrlOption[] = [
		{
			url: 'estadisticas',
			name: 'Estadisticas',
			icon: 'dashboard',
		},
		{
			url: 'existencia',
			name: 'Existencia',
			icon: 'search',
		},
		{
			url: 'transacciones',
			name: 'Transacciones',
			icon: 'compare_arrows',
		},
		{
			url: 'cargar-inventario',
			name: 'Cargar Inventario',
			icon: 'cloud_upload',
		},
		{
			url: 'mantenimientos',
			name: 'Mantenimientos',
			icon: 'apps',
		},
		{
			url: 'empresas',
			name: 'Empresas',
			icon: 'store_mall_directory',
		},
		{
			url: 'accesos',
			name: 'Accesos',
			icon: 'lock',
		},
	];

	constructor(
		private cdr: ChangeDetectorRef,
		public _authService: AuthenticationService
	) {}

	ngOnInit(): void {
		this._authService.isAuthenticated$()
			? this.cdr.detectChanges()
			: this._authService.checkIfAuthenticated();

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
