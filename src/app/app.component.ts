import { Component, OnInit } from '@angular/core';
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
		{ url: 'link', name: 'Estadisticas', icon: 'chevron_right' },
		{ url: 'existencia', name: 'Existencia', icon: 'chevron_right' },
		{ url: 'procesos', name: 'Procesos', icon: 'chevron_right' },
		{
			url: 'mantenimientos',
			name: 'Mantenimientos',
			icon: 'chevron_right',
		},
	];

	constructor(public _authService: AuthenticationService) {}

	ngOnInit(): void {
		throw new Error('Method not implemented.');
	}

	get isVisible(): boolean {
		return this._authService.isAuthenticated();
	}

	get showUsername(): string {
		return this._authService.showUsername();
	}

	onLogout() {
		this._authService.logout();
	}
}
