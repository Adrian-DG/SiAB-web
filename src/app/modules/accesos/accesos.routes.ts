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
		path: 'create',
		loadComponent: () =>
			import('./pages/create/create.page.component').then(
				(m) => m.CreatePageComponent
			),
	},
	{
		path: ':id',
		loadComponent: () =>
			import('./pages/edit/edit.page.component').then(
				(m) => m.EditPageComponent
			),
	},
	{
		path: '',
		redirectTo: 'usuarios',
		pathMatch: 'full',
	},
];
