import { Route } from '@angular/router';

export const authenticationRoutes: Route[] = [
	{
		path: '',
		pathMatch: 'full',
		loadComponent: () =>
			import(
				'./pages/authentication.page/authentication.page.component'
			).then((c) => c.AuthenticationPageComponent),
	},
];
