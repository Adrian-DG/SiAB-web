import { Component, computed, OnInit, signal, Signal } from '@angular/core';
import { RouterModule, RouterOutlet } from '@angular/router';
import { IUrlOption } from './Shared/Models/iurl-option.model';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatListModule } from '@angular/material/list';
import { MatMenuModule } from '@angular/material/menu';
import { AuthenticationService } from './modules/authentication/services/authentication.service';

@Component({
	selector: 'app-root',
	standalone: true,
	imports: [
		RouterOutlet,
		RouterModule,
		MatSidenavModule,
		MatToolbarModule,
		MatIconModule,
		MatButtonModule,
		MatListModule,
		MatMenuModule,
	],
	templateUrl: './app.component.html',
	styleUrl: './app.component.scss',
	providers: [AuthenticationService],
})
export class AppComponent implements OnInit {
	modules: IUrlOption[] = [
		{
			url: 'link',
			name: 'Estadisticas',
			icon: 'chevron_right',
			permissions: [],
		},
		{
			url: 'existencia',
			name: 'Existencia',
			icon: 'chevron_right',
			permissions: [],
		},
		{
			url: 'procesos',
			name: 'Procesos',
			icon: 'chevron_right',
			permissions: [],
		},
		{
			url: 'mantenimientos',
			name: 'Mantenimientos',
			icon: 'chevron_right',
			permissions: ['ADMIN'],
		},
	];

	isVisible$ = computed<boolean>(() =>
		this._authService.isAuthenticated().valueOf()
	);

	constructor(public _authService: AuthenticationService) {}

	ngOnInit(): void {
		throw new Error('Method not implemented.');
	}

	hasPermission(permissions: string[]): boolean {
		if (!permissions || permissions.length === 0) return true;

		const userRoles = this._authService.userData()?.Roles ?? [];

		return Array.isArray(userRoles)
			? userRoles.some((role) => permissions.includes(role))
			: userRoles.split(',').some((role) => permissions.includes(role));
	}

	onLogout() {
		this._authService.logout();
	}
}
