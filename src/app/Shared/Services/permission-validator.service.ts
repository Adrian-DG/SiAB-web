import { Injectable } from '@angular/core';
import { AuthenticationService } from '../../modules/authentication/services/authentication.service';
import { AppPermissions } from '../../app.permissions';

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

	hasAnyPermission(permissions: string[]): boolean {
		return permissions.some(
			(permission) =>
				this.userPermissions.includes(permission) ||
				this.userPermissions.includes(AppPermissions.ADMINISTRADOR)
		);
	}

	setPermissions(permissions: string[]): void {
		// Clear the existing permissions
		this.userPermissions = [];
		// Set the new permissions
		this.userPermissions.push(...permissions);
	}
}
