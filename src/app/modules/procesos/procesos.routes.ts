import { Routes } from '@angular/router';

export const procesosRoutes: Routes = [
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
		redirectTo: 'cargo-descargo',
	},
];
