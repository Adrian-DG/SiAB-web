import { Routes } from '@angular/router';

export const proveedoresRoutes: Routes = [
	{
		path: '',
		pathMatch: 'full',
		loadComponent: () =>
			import('./pages/index.page/index.page.component').then(
				(m) => m.IndexPageComponent
			),
	},
];
