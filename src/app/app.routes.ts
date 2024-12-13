import { Routes } from '@angular/router';

export const routes: Routes = [
	{
		path: 'authentication',
		loadChildren: () =>
			import('./modules/authentication/authentication.routes').then(
				(m) => m.authenticationRoutes
			),
	},
	{
		path: '404',
		loadComponent: () =>
			import('./Shared/pages/notFound/notFound.component').then(
				(c) => c.NotFoundComponent
			),
	},
	{
		path: '',
		pathMatch: 'full',
		redirectTo: 'authentication',
	},
	{
		path: '**',
		redirectTo: '404',
	},
];
