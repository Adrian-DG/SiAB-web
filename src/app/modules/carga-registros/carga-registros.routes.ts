import { Route } from '@angular/router';

export const cargaRegistrosRoutes: Route[] = [
	{
		path: 'carga-registros',
		loadComponent: () =>
			import('./pages/index/index.page.component').then(
				(c) => c.IndexPageComponent
			),
	},
	{ path: '', redirectTo: 'carga-registros', pathMatch: 'full' },
];
