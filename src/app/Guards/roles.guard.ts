import type { CanActivateFn } from '@angular/router';
import { AuthenticationService } from '../modules/authentication/services/authentication.service';
import { inject } from '@angular/core';

export const RolesGuard: CanActivateFn = (route, state) => {
	const _authService = inject(AuthenticationService);
	const expectedRoles: string[] = route.data['expectedRoles'] || [];
	const token = _authService.userData();

	if (!token) return false;

	if (expectedRoles.length === 0) return true;

	const userRoles = token.Roles;

	if (Array.isArray(userRoles)) {
		const roles = userRoles.map((role) => role.replace(' ', '_'));
		return roles.some((role) => expectedRoles.includes(role));
	} else {
		const roles = userRoles.replace(' ', '_');
		return roles.split(',').some((role) => expectedRoles.includes(role));
	}
};
