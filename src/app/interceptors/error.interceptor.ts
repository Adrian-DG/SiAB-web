import { Injectable } from '@angular/core';
import {
	HttpEvent,
	HttpInterceptor,
	HttpHandler,
	HttpRequest,
	HttpErrorResponse,
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
	intercept(
		req: HttpRequest<any>,
		next: HttpHandler
	): Observable<HttpEvent<any>> {
		return next.handle(req).pipe(
			catchError((error: HttpErrorResponse) => {
				let errorMessage = '';
				if (error.error instanceof ErrorEvent) {
					// Client-side error
					errorMessage = `Client-side error: ${error.error.message}`;
				} else {
					// Server-side error
					errorMessage = `Server-side error: ${error.status} ${error.message}`;
				}
				// Here you can add more logic to format the error message as needed
				console.error({ errorMessage: errorMessage });
				return throwError(errorMessage);
			})
		);
	}
}
