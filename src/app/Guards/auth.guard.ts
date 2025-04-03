import { inject } from '@angular/core';
import { Router, type CanActivateFn } from '@angular/router';
import { AuthenticationService } from '../modules/authentication/services/authentication.service';
import { MatDialog } from '@angular/material/dialog';
import { ErrorDialogComponent } from '../Shared/components/error-dialog/error-dialog.component';
import { tap } from 'rxjs';

export const authGuard: CanActivateFn = (route, state) => {
	const authService = inject(AuthenticationService);
	const router = inject(Router);
	const dialog = inject(MatDialog);

	// Check if the user is authenticated
	authService.checkIfAuthenticated();

	return authService.isAuthenticated$.pipe(
		tap((isAuthenticated: boolean) => {
			if (!isAuthenticated) {
				console.log('User is not authenticated');
				dialog
					.open(ErrorDialogComponent, {
						width: '300px',
						height: '200px',
						hasBackdrop: true,
						role: 'dialog',
						data: { message: 'El usuario no ha sido validado' },
					})
					.afterClosed()
					.subscribe(() => {
						localStorage.clear();
						router.navigate(['authentication']);
					});
			}
			console.log('User is authenticated');
		})
	);
};
