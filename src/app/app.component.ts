import { Component } from '@angular/core';
import { RouterModule, RouterOutlet } from '@angular/router';
import { IUrlOption } from './Shared/Models/IUrlOption.model';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatListModule } from '@angular/material/list';
import { MatMenuModule } from '@angular/material/menu';

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
})
export class AppComponent {
	isVisible: boolean = false;
	modules: IUrlOption[] = [
		{ url: 'link', name: 'Estadisticas', icon: 'chevron_right' },
		{ url: 'link', name: 'Procesos', icon: 'chevron_right' },
		{
			url: 'mantenimientos',
			name: 'Mantenimientos',
			icon: 'chevron_right',
		},
	];
}
