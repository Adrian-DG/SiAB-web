import { Route } from '@angular/router';
import { RolesGuard } from '../../Guards/roles.guard';
import { AppPermissions } from '../../app.permissions';

export const mantenimientosRoutes: Route[] = [
	{
		path: 'instituciones',
		loadComponent: () =>
			import('./pages/dependencias/dependencias.page.component').then(
				(c) => c.DependenciasPageComponent
			),
		canActivate: [RolesGuard],
		data: {
			expectedRoles: [
				AppPermissions.ADMINISTRADOR_GENERAL,
				AppPermissions.MANTENIMIENTO_INSTITUCIONES,
			],
		},
	},
	{
		path: 'dependencias',
		loadComponent: () =>
			import('./pages/depositos/depositos.page.component').then(
				(c) => c.DepositosPageComponent
			),
		canActivate: [RolesGuard],
		data: {
			expectedRoles: [
				AppPermissions.ADMINISTRADOR_GENERAL,
				AppPermissions.MANTENIMIENTO_DEPENDENCIAS,
			],
		},
	},
	{
		path: 'propiedades',
		loadComponent: () =>
			import('./pages/propiedades/propiedades.page.component').then(
				(c) => c.PropiedadesPageComponent
			),
		canActivate: [RolesGuard],
		data: {
			expectedRoles: [
				AppPermissions.ADMINISTRADOR_GENERAL,
				AppPermissions.MANTENIMIENTO_PROPIEDADES,
			],
		},
	},
	{
		path: 'tipos-documentos',
		loadComponent: () =>
			import(
				'./pages/tipo-documentos/tipos-documentos.page.component'
			).then((c) => c.TiposDocumentosPageComponent),
		canActivate: [RolesGuard],
		data: {
			expectedRoles: [
				AppPermissions.ADMINISTRADOR_GENERAL,
				AppPermissions.MANTENIMIENTO_TIPOS_DOCUMENTOS,
			],
		},
	},
	{
		path: 'calibres',
		loadComponent: () =>
			import('./pages/calibres/calibres.page.component').then(
				(c) => c.CalibresPageComponent
			),
		canActivate: [RolesGuard],
		data: {
			expectedRoles: [
				AppPermissions.ADMINISTRADOR_GENERAL,
				AppPermissions.MANTENIMIENTO_CALIBRES,
			],
		},
	},
	{
		path: 'categorias',
		loadComponent: () =>
			import('./pages/categorias/categorias.page.component').then(
				(c) => c.CategoriasPageComponent
			),
		canActivate: [RolesGuard],
		data: {
			expectedRoles: [
				AppPermissions.ADMINISTRADOR_GENERAL,
				AppPermissions.MANTENIMIENTO_CATEGORIAS,
			],
		},
	},
	{
		path: 'subtipos',
		loadComponent: () =>
			import('./pages/subtipos/subtipos.page.component').then(
				(c) => c.SubtiposPageComponent
			),
		canActivate: [RolesGuard],
		data: {
			expectedRoles: [
				AppPermissions.ADMINISTRADOR_GENERAL,
				AppPermissions.MANTENIMIENTO_SUBTIPOS,
			],
		},
	},
	{
		path: 'tipos',
		loadComponent: () =>
			import('./pages/tipos/tipos.page.component').then(
				(c) => c.TiposPageComponent
			),
		canActivate: [RolesGuard],
		data: {
			expectedRoles: [
				AppPermissions.ADMINISTRADOR_GENERAL,
				AppPermissions.MANTENIMIENTO_TIPOS,
			],
		},
	},

	{
		path: 'marcas',
		loadComponent: () =>
			import('./pages/marcas/marcas.page.component').then(
				(c) => c.MarcasPageComponent
			),
		canActivate: [RolesGuard],
		data: {
			expectedRoles: [
				AppPermissions.ADMINISTRADOR_GENERAL,
				AppPermissions.MANTENIMIENTO_MARCAS,
			],
		},
	},
	{
		path: 'modelos',
		loadComponent: () =>
			import('./pages/modelos/modelos.page.component').then(
				(c) => c.ModelosPageComponent
			),
		canActivate: [RolesGuard],
		data: {
			expectedRoles: [
				AppPermissions.ADMINISTRADOR_GENERAL,
				AppPermissions.MANTENIMIENTO_MODELOS,
			],
		},
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
