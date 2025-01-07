import { Route } from '@angular/router';
import { ListPageComponent } from './pages/list/list.page.component';

export const accesosRoutes: Route[] = [
	{
		path: 'usuarios',
		loadComponent: () =>
			import('./pages/list/list.page.component').then(
				(m) => m.ListPageComponent
			),
	},
	{
		path: '',
		redirectTo: 'usuarios',
		pathMatch: 'full',
	},
];
