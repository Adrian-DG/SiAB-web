import { Routes } from '@angular/router';

export const empresasRoutes: Routes = [
	{
		path: ':id/ordenes',
		loadComponent: () =>
			import('./pages/orders/orders.page').then((m) => m.OrdersComponent),
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
