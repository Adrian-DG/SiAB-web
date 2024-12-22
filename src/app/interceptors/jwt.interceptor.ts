import type { HttpInterceptorFn } from '@angular/common/http';

export const jwtInterceptor: HttpInterceptorFn = (req, next) => {
	const token = localStorage.getItem('token');

	if (req.url.includes('authentication')) {
		return next(req);
	}

	const clonedRequest = req.clone({
		setHeaders: {
			Authorization: `Bearer ${token}`,
		},
	});

	return next(clonedRequest);
};
