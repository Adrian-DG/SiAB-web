import { Routes } from '@angular/router';
import { authGuard } from './Guards/auth.guard';

export const routes: Routes = [
	{
		path: 'accesos',
		loadChildren: () =>
			import('./modules/accesos/accesos.routes').then(
				(m) => m.accesosRoutes
			),
		canActivate: [authGuard],
	},
	{
		path: 'procesos',
		loadChildren: () =>
			import('./modules/procesos/procesos.routes').then(
				(m) => m.procesosRoutes
			),
		canActivate: [authGuard],
	},
	{
		path: 'existencia',
		loadChildren: () =>
			import('./modules/existencia/existencia.routes').then(
				(m) => m.existenciaRoutes
			),
		canActivate: [authGuard],
	},
	{
		path: 'mantenimientos',
		loadChildren: () =>
			import('./modules/mantenimientos/mantenimientos.routes').then(
				(m) => m.mantenimientosRoutes
			),
		canActivate: [authGuard],
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
