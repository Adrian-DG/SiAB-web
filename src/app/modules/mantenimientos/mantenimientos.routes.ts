import { Route } from '@angular/router';

export const mantenimientosRoutes: Route[] = [
	{
		path: 'marcas',
		loadComponent: () =>
			import('./pages/marcas/marcas.page.component').then(
				(c) => c.MarcasPageComponent
			),
	},
	{
		path: 'modelos',
		loadComponent: () =>
			import('./pages/modelos/modelos.page.component').then(
				(c) => c.ModelosPageComponent
			),
	},
	{
		path: '',
		pathMatch: 'full',
		loadComponent: () =>
			import('./pages/menu/menu.page.component').then(
				(c) => c.MenuPageComponent
			),
	},
];
