import { Routes } from '@angular/router';

export const routes: Routes = [
	{
		path: 'mantenimientos',
		loadChildren: () =>
			import('./modules/mantenimientos/mantenimientos.routes').then(
				(m) => m.mantenimientosRoutes
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
				(c) => c.NotFoundPageComponent
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
