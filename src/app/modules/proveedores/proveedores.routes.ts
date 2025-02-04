import { Routes } from '@angular/router';

export const proveedoresRoutes: Routes = [
	{
		path: ':id',
		loadComponent: () =>
			import('./pages/details/details.page.component').then(
				(m) => m.DetailsPageComponent
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
