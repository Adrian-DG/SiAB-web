import { ChangeDetectionStrategy, Component } from '@angular/core';
import { IUrlOption } from '../../../../Shared/Models/iurl-option.model';
import { RouterModule } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';

@Component({
	selector: 'app-menu.page',
	standalone: true,
	imports: [RouterModule, MatButtonModule],
	templateUrl: './menu.page.component.html',
	styleUrl: './menu.page.component.scss',
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MenuPageComponent {
	modules: IUrlOption[] = [
		{ url: 'articulos', name: 'Articulos', icon: '' },
		{ url: 'categorias', name: 'Categorias', icon: '' },
		{ url: 'tipos', name: 'Tipos', icon: '' },
		{ url: 'subtipos', name: 'Subtipos', icon: '' },
		{ url: 'series', name: 'Series', icon: '' },
		{ url: 'marcas', name: 'Marcas', icon: '' },
		{ url: 'modelos', name: 'Modelos', icon: '' },
		{ url: 'calibres', name: 'Calibres', icon: '' },
		{ url: 'propiedades', name: 'Propiedades', icon: '' },
		{ url: 'estado-armas', name: 'Estado de Armas', icon: '' },
		{ url: 'depositos', name: 'Depositos', icon: '' },
		{ url: 'dependencias', name: 'Dependencias', icon: '' },
	];

	search(event: Event): void {
		console.log(event);
	}
}
