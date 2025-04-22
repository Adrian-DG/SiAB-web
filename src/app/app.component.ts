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
import { PermissionValidatorService } from './Shared/Services/permission-validator.service';
import { AppPermissions } from './app.permissions';

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
	providers: [AuthenticationService, PermissionValidatorService],
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
		public _authService: AuthenticationService,
		public _permissionValidatorService: PermissionValidatorService
	) {}

	ngOnInit(): void {
		if (this._authService.isAuthenticated$()) {
			this.cdr.detectChanges();
		}
	}

	get nombre_sistema() {
		return this._permissionValidatorService.hasActionPermission(
			AppPermissions.MODULO_EMPRESAS
		)
			? 'Sistema Dpto. Explosivos'
			: 'Sistema Armamento Bélico (SiAB)';
	}

	onLogout() {
		this._authService.logout();
	}
}
