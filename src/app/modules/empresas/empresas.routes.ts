import { Routes } from '@angular/router';

export const empresasRoutes: Routes = [
	{
		path: ':id/ordenes',
		loadComponent: () =>
			import('./pages/orders/orders.page').then((m) => m.OrdersComponent),
	},
	{
		path: ':empresaId/ordenes/:ordenId/detalles',
		loadComponent: () =>
			import('./pages/details/details.page.component').then(
				(m) => m.DetailsPageComponent
			),
	},
	{
		path: '',
		pathMatch: 'full',
		loadComponent: () =>
			import('./pages/index/index.page.component').then(
				(m) => m.IndexPageComponent
			),
	},
];
