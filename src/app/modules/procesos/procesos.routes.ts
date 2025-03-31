import { Routes } from '@angular/router';
import { RolesGuard } from '../../Guards/roles.guard';
import { AppPermissions } from '../../app.permissions';

export const procesosRoutes: Routes = [
	{
		path: ':id/detalles-transaccion',
		loadComponent: () =>
			import('./pages/details/details.page.component').then(
				(m) => m.DetailsComponent
			),
		canActivate: [RolesGuard],
		data: {
			expectedRoles: [
				AppPermissions.ADMINISTRADOR,
				AppPermissions.TRANSACCIONES_VISUALIZAR_DETALLES,
			],
		},
	},
	{
		path: 'cargo-descargo',
		loadComponent: () =>
			import('./pages/cargo-descargo/cargo-descargo.page.component').then(
				(m) => m.CargoDescargoPageComponent
			),
		canActivate: [RolesGuard],
		data: {
			expectedRoles: [
				AppPermissions.ADMINISTRADOR,
				AppPermissions.TRANSACCIONES_CREAR_CARGO_DESCARGO,
			],
		},
	},
	{
		path: '',
		pathMatch: 'full',
		loadComponent: () =>
			import('./pages/index/index.page.component').then(
				(m) => m.IndexPageComponent
			),
	},
];
