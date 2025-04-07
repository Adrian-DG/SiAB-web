import { Routes } from '@angular/router';
import { authGuard } from './Guards/auth.guard';
import { RolesGuard } from './Guards/roles.guard';
import { AppPermissions } from './app.permissions';

export const routes: Routes = [
	{
		path: 'empresas',
		loadChildren: () =>
			import('./modules/empresas/empresas.routes').then(
				(m) => m.empresasRoutes
			),
		canActivate: [authGuard, RolesGuard],
		data: {
			expectedRoles: [
				AppPermissions.ADMINISTRADOR_GENERAL,
				AppPermissions.MODULO_EMPRESAS,
			],
		},
	},
	{
		path: 'cargar-inventario',
		loadChildren: () =>
			import('./modules/carga-registros/carga-registros.routes').then(
				(m) => m.cargaRegistrosRoutes
			),
		canActivate: [authGuard, RolesGuard],
		data: {
			expectedRoles: [
				AppPermissions.ADMINISTRADOR_GENERAL,
				AppPermissions.TRANSACCIONES_CARGAR_INVENTARIO_EXCEL,
			],
		},
	},
	{
		path: 'accesos',
		loadChildren: () =>
			import('./modules/accesos/accesos.routes').then(
				(m) => m.accesosRoutes
			),
		canActivate: [authGuard, RolesGuard],
		data: {
			expectedRoles: [
				AppPermissions.ADMINISTRADOR_GENERAL,
				AppPermissions.MODULO_USUARIOS,
			],
		},
	},
	{
		path: 'transacciones',
		loadChildren: () =>
			import('./modules/procesos/procesos.routes').then(
				(m) => m.procesosRoutes
			),
		canActivate: [authGuard, RolesGuard],
		data: {
			expectedRoles: [
				AppPermissions.ADMINISTRADOR_GENERAL,
				AppPermissions.MODULO_TRANSACCIONES,
			],
		},
	},
	{
		path: 'existencia',
		loadChildren: () =>
			import('./modules/existencia/existencia.routes').then(
				(m) => m.existenciaRoutes
			),
		canActivate: [authGuard, RolesGuard],
		data: {
			expectedRoles: [
				AppPermissions.ADMINISTRADOR_GENERAL,
				AppPermissions.MODULO_EXISTENCIAS,
			],
		},
	},
	{
		path: 'estadisticas',
		loadChildren: () =>
			import('./modules/estadisticas/estadisticas.routes').then(
				(m) => m.estadisticasRoutes
			),
		canActivate: [authGuard, RolesGuard],
		data: {
			expectedRoles: [AppPermissions.ADMINISTRADOR_GENERAL],
		},
	},
	{
		path: 'mantenimientos',
		loadChildren: () =>
			import('./modules/mantenimientos/mantenimientos.routes').then(
				(m) => m.mantenimientosRoutes
			),
		canActivate: [authGuard, RolesGuard],
		data: {
			expectedRoles: [
				AppPermissions.ADMINISTRADOR_GENERAL,
				AppPermissions.MODULO_MANTENIMIENTO,
			],
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
