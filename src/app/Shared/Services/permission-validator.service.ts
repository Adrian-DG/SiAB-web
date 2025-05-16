import { Injectable } from '@angular/core';
import { AuthenticationService } from '../../modules/authentication/services/authentication.service';
import { AppPermissions } from '../../app.permissions';
import { routes as app_routes } from '../../app.routes';
import { mantenimientosRoutes as misc_routes } from '../../modules/mantenimientos/mantenimientos.routes';
import { procesosRoutes as procesos_routes } from '../../modules/procesos/procesos.routes';
import { Route } from '@angular/router';

@Injectable({
	providedIn: 'root',
})
export class PermissionValidatorService {
	private userPermissions: string[] = [];
	private routes_array: Route[] = [];
	constructor(private _authService: AuthenticationService) {
		const userData = this._authService.userData$();
		if (userData && userData.Roles) {
			this.userPermissions = Array.isArray(userData.Roles)
				? userData.Roles
				: userData.Roles.split(',');

			this.routes_array = [
				...app_routes,
				...misc_routes,
				...procesos_routes,
			];
		}
	}

	hasRoutePermission(route: string): boolean {
		const routePermissions = this.routes_array.find((r) => r.path === route)
			?.data?.['expectedRoles'];
		if (routePermissions) {
			return this.userPermissions.some((permission) =>
				routePermissions.includes(permission)
			);
		}

		return false;
	}

	hasModulePermission(module: string): boolean {
		return this.userPermissions.includes(module);
	}

	hasActionPermission(permission: string): boolean {
		return (
			this.userPermissions.includes(permission) ||
			this.userPermissions.includes(AppPermissions.ADMINISTRADOR_GENERAL)
		);
	}
}
