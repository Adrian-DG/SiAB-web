import {
	HttpErrorResponse,
	HttpHandlerFn,
	HttpInterceptorFn,
	HttpRequest,
} from '@angular/common/http';
import { inject } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { catchError, throwError } from 'rxjs';
import { ErrorDialogComponent } from '../Shared/components/error-dialog/error-dialog.component';

export const ErrorInterceptor: HttpInterceptorFn = (
	req: HttpRequest<any>,
	next: HttpHandlerFn
) => {
	const dialog = inject(MatDialog);

	return next(req).pipe(
		catchError((error: HttpErrorResponse) => {
			console.log('Enter ErrorInterceptor: ', req);
			let errorMessage = '';
			if (error.error instanceof ErrorEvent) {
				// Client-side error
				errorMessage = `Client-side error: ${error.message}`;
			} else {
				// Server-side error
				errorMessage = `Server-side error: ${error.status} ${error.message}`;
			}
			// Here you can add more logic to format the error message as needed

			// Open a dialog to show the error message
			dialog.open(ErrorDialogComponent, {
				data: { message: 'Error al realizar solicitud/proceso.' },
			});

			return throwError(errorMessage);
		})
	);
};
