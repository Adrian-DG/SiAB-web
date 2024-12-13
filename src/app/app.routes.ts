import { Routes } from '@angular/router';

export const routes: Routes = [
	{
		path: 'mantenimientos',
		loadComponent: () =>
			import('./Shared/pages/miscelaneo/miscelaneo.component').then(
				(c) => c.MiscelaneoComponent
			),
	},
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
			import('./Shared/pages/notFound/notFound.page.component').then(
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
