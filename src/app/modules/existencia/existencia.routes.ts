import { Route } from '@angular/router';

export const existenciaRoutes: Route[] = [
	{
		path: 'existencia',
		loadComponent: () =>
			import('./pages/index/index.page.component').then(
				(m) => m.IndexComponent
			),
	},
	{
		path: '',
		pathMatch: 'full',
		redirectTo: 'existencia',
	},
];
