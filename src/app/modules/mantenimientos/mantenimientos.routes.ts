import { Route } from '@angular/router';

export const mantenimientosRoutes: Route[] = [
	{
		path: 'propiedades',
		loadComponent: () =>
			import('./pages/propiedades/propiedades.page.component').then(
				(c) => c.PropiedadesPageComponent
			),
	},
	{
		path: 'dependencias',
		loadComponent: () =>
			import('./pages/dependencias/dependencias.page.component').then(
				(c) => c.DependenciasPageComponent
			),
	},
	{
		path: 'calibres',
		loadComponent: () =>
			import('./pages/calibres/calibres.page.component').then(
				(c) => c.CalibresPageComponent
			),
	},
	{
		path: 'categorias',
		loadComponent: () =>
			import('./pages/categorias/categorias.page.component').then(
				(c) => c.CategoriasPageComponent
			),
	},
	{
		path: 'series',
		loadComponent: () =>
			import('./pages/series/series.page.component').then(
				(c) => c.SeriePageComponent
			),
	},
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
