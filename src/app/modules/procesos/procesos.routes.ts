import { Routes } from '@angular/router';

export const procesosRoutes: Routes = [
	{
		path: ':id/detalles-transaccion',
		loadComponent: () =>
			import('./pages/details/details.page.component').then(
				(m) => m.DetailsComponent
			),
	},
	{
		path: 'cargo-descargo',
		loadComponent: () =>
			import('./pages/cargo-descargo/cargo-descargo.page.component').then(
				(m) => m.CargoDescargoPageComponent
			),
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
