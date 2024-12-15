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
		path: '',
		pathMatch: 'full',
		loadComponent: () =>
			import('./pages/menu/menu.page.component').then(
				(c) => c.MenuPageComponent
			),
	},
];
