import type { CanActivateFn } from '@angular/router';
import { AuthenticationService } from '../modules/authentication/services/authentication.service';
import { inject } from '@angular/core';

export const RolesGuard: CanActivateFn = (route, state) => {
	const _authService = inject(AuthenticationService);
	const expectedRoles: string[] = route.data['expectedRoles'] || [];
	const token = _authService.userData();

	if (!token) return false;

	if (expectedRoles.length === 0) return true;

	const roles = token.Roles;

	console.log('Expected Roles:', expectedRoles);
	console.log('Roles:', roles);

	if (Array.isArray(roles)) {
		return roles.some((role) => {
			console.log(expectedRoles.includes(role));
			return expectedRoles.includes(role);
		});
	} else {
		return roles.split(',').some((role) => {
			console.log(expectedRoles.includes(role));
			return expectedRoles.includes(role);
		});
	}
};
