import { inject } from '@angular/core';
import { Router, type CanActivateFn } from '@angular/router';
import { AuthenticationService } from '../modules/authentication/services/authentication.service';
import { MatDialog } from '@angular/material/dialog';
import { ErrorDialogComponent } from '../Shared/components/error-dialog/error-dialog.component';

export const authGuard: CanActivateFn = (route, state) => {
	// This is where you would check if the user is authenticated
	// and return true or false based on that.
	// For the sake of this example, we'll just return true.
	const authService = inject(AuthenticationService);
	const router = inject(Router);
	const dialog = inject(MatDialog);

	if (!authService.isAuthenticated$()) {
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
		return false;
	}

	return true;
};
