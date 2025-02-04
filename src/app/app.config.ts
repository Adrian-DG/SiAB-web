import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import {
	provideHttpClient,
	withInterceptors,
	withInterceptorsFromDi,
} from '@angular/common/http';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { jwtInterceptor } from './interceptors/jwt.interceptor';
import { ErrorInterceptor } from './interceptors/error.interceptor';
import { loadingInterceptor } from './interceptors/loading.interceptor';
import { provideMomentDateAdapter } from '@angular/material-moment-adapter';

export const appConfig: ApplicationConfig = {
	providers: [
		provideZoneChangeDetection({ eventCoalescing: true }),
		provideRouter(routes),
		provideAnimationsAsync(),
		provideHttpClient(
			withInterceptors([
				jwtInterceptor,
				ErrorInterceptor,
				loadingInterceptor,
			])
		),
		provideMomentDateAdapter({
			parse: { dateInput: 'DD/MM/YYYY' },
			display: {
				dateInput: 'DD/MM/YYYY',
				monthYearLabel: 'MMM YYYY',
				dateA11yLabel: 'DD/MM/YYYY',
				monthYearA11yLabel: 'MMMM YYYY',
			},
		}),
	],
};
