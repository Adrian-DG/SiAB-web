import {
	ChangeDetectionStrategy,
	ChangeDetectorRef,
	Component,
	OnInit,
} from '@angular/core';
import { IUrlOption } from '../../../../Shared/Models/iurl-option.model';
import { RouterModule } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { mantenimientosRoutes } from '../../mantenimientos.routes';
import { AuthenticationService } from '../../../authentication/services/authentication.service';
import { PermissionValidatorService } from '../../../../Shared/Services/permission-validator.service';

@Component({
	selector: 'app-menu.page',
	standalone: true,
	imports: [RouterModule, MatButtonModule],
	templateUrl: './menu.page.component.html',
	styleUrl: './menu.page.component.scss',
	changeDetection: ChangeDetectionStrategy.OnPush,
	providers: [AuthenticationService, PermissionValidatorService],
})
export class MenuPageComponent {
	constructor(
		private cdr: ChangeDetectorRef,
		public _authService: AuthenticationService,
		public _permissionValidatorService: PermissionValidatorService
	) {}

	modules: IUrlOption[] = [
		{ url: 'propiedades', name: 'Propiedades', icon: '' },
		{ url: 'categorias', name: 'Categorias', icon: '' },
		{ url: 'tipos', name: 'Tipos', icon: '' },
		{ url: 'subtipos', name: 'Subtipos', icon: '' },
		{ url: 'marcas', name: 'Marcas', icon: '' },
		{ url: 'modelos', name: 'Modelos', icon: '' },
		{ url: 'calibres', name: 'Calibres', icon: '' },
		{ url: 'dependencias', name: 'Dependencias', icon: '' },
		{ url: 'instituciones', name: 'Instituciones', icon: '' },
	];
}
