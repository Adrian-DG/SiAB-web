import { Route } from '@angular/router';

export const mantenimientosRoutes: Route[] = [
	{
		path: 'subtipos',
		loadComponent: () =>
			import('./pages/subtipos/subtipos.page.component').then(
				(c) => c.SubtiposPageComponent
			),
	},
	{
		path: 'tipos',
		loadComponent: () =>
			import('./pages/tipos/tipos.page.component').then(
				(c) => c.TiposPageComponent
			),
	},
	{
		path: 'depositos',
		loadComponent: () =>
			import('./pages/depositos/depositos.page.component').then(
				(c) => c.DepositosPageComponent
			),
	},
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
