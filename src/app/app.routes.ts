import { Routes } from '@angular/router';
import { authGuard } from './Guards/auth.guard';
import { RolesGuard } from './Guards/roles.guard';
import { AppPermissions } from './app.permissions';

export const routes: Routes = [
	{
		path: 'proveedores',
		loadChildren: () =>
			import('./modules/proveedores/proveedores.routes').then(
				(m) => m.proveedoresRoutes
			),
		canActivate: [authGuard, RolesGuard],
		data: {
			expectedRoles: [
				AppPermissions.ADMINISTRADOR,
				AppPermissions.PROVEEDORES,
			],
		},
	},
	{
		path: 'inventario',
		loadChildren: () =>
			import('./modules/carga-registros/carga-registros.routes').then(
				(m) => m.cargaRegistrosRoutes
			),
		canActivate: [authGuard, RolesGuard],
		data: { expectedRoles: [AppPermissions.ADMINISTRADOR] },
	},
	{
		path: 'accesos',
		loadChildren: () =>
			import('./modules/accesos/accesos.routes').then(
				(m) => m.accesosRoutes
			),
		canActivate: [authGuard, RolesGuard],
		data: { expectedRoles: [AppPermissions.ADMINISTRADOR] },
	},
	{
		path: 'procesos',
		loadChildren: () =>
			import('./modules/procesos/procesos.routes').then(
				(m) => m.procesosRoutes
			),
		canActivate: [authGuard, RolesGuard],
		data: { expectedRoles: [AppPermissions.ADMINISTRADOR] },
	},
	{
		path: 'existencia',
		loadChildren: () =>
			import('./modules/existencia/existencia.routes').then(
				(m) => m.existenciaRoutes
			),
		canActivate: [authGuard, RolesGuard],
		data: { expectedRoles: [AppPermissions.ADMINISTRADOR] },
	},
	{
		path: 'mantenimientos',
		loadChildren: () =>
			import('./modules/mantenimientos/mantenimientos.routes').then(
				(m) => m.mantenimientosRoutes
			),
		canActivate: [authGuard, RolesGuard],
		data: {
			expectedRoles: [AppPermissions.ADMINISTRADOR],
		},
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
