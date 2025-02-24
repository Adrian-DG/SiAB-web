import { Route } from '@angular/router';

export const existenciaRoutes: Route[] = [
	{
		path: '',
		pathMatch: 'full',
		loadComponent: () =>
			import('./pages/index/index.page.component').then(
				(m) => m.IndexComponent
			),
	},
];
