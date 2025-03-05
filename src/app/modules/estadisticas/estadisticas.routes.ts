import { Route } from '@angular/router';

export const estadisticasRoutes: Route[] = [
	{
		path: '',
		pathMatch: 'full',
		loadComponent: () =>
			import('./pages/index/index.page').then(
				(m) => m.IndexPageComponent
			),
	},
];
