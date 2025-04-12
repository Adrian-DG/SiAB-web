import { Injectable } from '@angular/core';
import { AuthenticationService } from '../../modules/authentication/services/authentication.service';
import { AppPermissions } from '../../app.permissions';
import { routes as app_routes } from '../../app.routes';

@Injectable({
	providedIn: 'root',
})
export class PermissionValidatorService {
	private userPermissions: string[] = [];
	constructor(private _authService: AuthenticationService) {
		const userData = this._authService.userData();
		if (userData) {
			this.userPermissions = Array.isArray(userData.Roles)
				? userData.Roles
				: userData.Roles.split(',');
		}
	}

	hasRoutePermission(route: string): boolean {
		const routePermissions = app_routes.find((r) => r.path === route)
			?.data?.['expectedRoles'];
		if (routePermissions) {
			return this.userPermissions.some((permission) =>
				routePermissions.includes(permission)
			);
		}

		return false;
	}
}
