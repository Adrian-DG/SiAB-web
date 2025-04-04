import {
	ChangeDetectionStrategy,
	ChangeDetectorRef,
	Component,
	OnInit,
} from '@angular/core';
import { IUrlOption } from '../../../../Shared/Models/iurl-option.model';
import { RouterModule } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { mantenimientosRoutes } from '../../mantenimientos.routes';
import { AuthenticationService } from '../../../authentication/services/authentication.service';

@Component({
	selector: 'app-menu.page',
	standalone: true,
	imports: [RouterModule, MatButtonModule],
	templateUrl: './menu.page.component.html',
	styleUrl: './menu.page.component.scss',
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MenuPageComponent implements OnInit {
	userRoles: string | string[] = [];

	constructor(
		private cdr: ChangeDetectorRef,
		public _authService: AuthenticationService
	) {}

	ngOnInit(): void {
		this.userRoles = this._authService.userData()?.Roles ?? [];
		console.log('User Roles: ', this.userRoles);
	}

	modules: IUrlOption[] = [
		{ url: 'propiedades', name: 'Propiedades', icon: '' },
		{ url: 'categorias', name: 'Categorias', icon: '' },
		{ url: 'tipos', name: 'Tipos', icon: '' },
		{ url: 'subtipos', name: 'Subtipos', icon: '' },
		{ url: 'marcas', name: 'Marcas', icon: '' },
		{ url: 'modelos', name: 'Modelos', icon: '' },
		{ url: 'calibres', name: 'Calibres', icon: '' },
		{ url: 'dependencias', name: 'Dependencias', icon: '' },
		{ url: 'instituciones', name: 'Instituciones', icon: '' },
	];

	hasPermission(url: string): boolean {
		const routeData = mantenimientosRoutes.find(
			(route) => route.path === url
		)?.data as { expectedRoles: string[] };

		const permissions = routeData?.expectedRoles ?? [];

		if (permissions.length === 0) return true;

		const hasPermission = Array.isArray(this.userRoles)
			? this.userRoles.some((role) => permissions.includes(role))
			: this.userRoles
					.split(',')
					.some((role) => permissions.includes(role));

		return hasPermission;
	}

	search(event: Event): void {
		console.log(event);
	}
}
