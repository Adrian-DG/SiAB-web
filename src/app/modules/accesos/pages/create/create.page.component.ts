import {
	AfterViewInit,
	ChangeDetectionStrategy,
	Component,
	OnInit,
	signal,
} from '@angular/core';
import {
	FormControl,
	FormGroup,
	ReactiveFormsModule,
	Validators,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { PermissionsSelectorComponent } from '../../components/permissions-selector/permissions-selector.component';
import { UsuariosService } from '../../services/usuarios.service';
import { PermisosService } from '../../services/permisos.service';
import { IPermissionModel } from '../../models/ipermission.model';
import { IUsuarioRegisterDto } from '../../../authentication/dto/iusuario-register.dto';
import { Router } from '@angular/router';
import { INamedEntity } from '../../../../Shared/Models/inamed-entity.model';

@Component({
	selector: 'app-create.page',
	standalone: true,
	imports: [
		MatCardModule,
		MatFormFieldModule,
		MatInputModule,
		MatSelectModule,
		MatButtonModule,
		ReactiveFormsModule,
		PermissionsSelectorComponent,
	],
	templateUrl: './create.page.component.html',
	styleUrl: './create.page.component.scss',
	changeDetection: ChangeDetectionStrategy.OnPush,
	providers: [UsuariosService, PermisosService],
})
export class CreatePageComponent implements OnInit, AfterViewInit {
	rangos$ = signal<INamedEntity[]>([]);
	permissions$ = signal<IPermissionModel[]>([]);
	private selectedPermissions: number[] = [];
	usuarioForm: FormGroup = new FormGroup({
		cedula: new FormControl('', [
			Validators.required,
			Validators.minLength(11),
			Validators.maxLength(11),
			Validators.pattern(/^\d{11}$/),
		]),
		nombre: new FormControl('', [Validators.required]),
		apellido: new FormControl('', [Validators.required]),
		username: new FormControl('', [Validators.required]),
		password: new FormControl('', [Validators.required]),
		rangoId: new FormControl(0),
	});

	constructor(
		private _usuarioService: UsuariosService,
		private _permisosService: PermisosService,
		private $router: Router
	) {}

	ngOnInit(): void {
		this._permisosService.getAll().subscribe((permissions) => {
			this.permissions$.set(permissions);
		});
	}

	ngAfterViewInit(): void {
		this._usuarioService.getRangos().subscribe((rangos) => {
			this.rangos$.set(rangos);
		});
	}

	onPermissionSaved(permissions: number[]): void {
		this.selectedPermissions = permissions;
	}

	onCreate() {
		const usuario: IUsuarioRegisterDto = {
			...this.usuarioForm.value,
			roles: this.selectedPermissions,
		};

		console.log(usuario);

		this._usuarioService
			.create<IUsuarioRegisterDto>(usuario)
			.subscribe(() => {
				this.usuarioForm.reset();
				this.selectedPermissions = [];
				this.$router.navigate(['/accesos/usuarios']);
			});
	}
}
