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
	FormsModule,
	ReactiveFormsModule,
	Validators,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { ActivatedRoute, Router } from '@angular/router';
import { UsuariosService } from '../../services/usuarios.service';
import { PermisosService } from '../../services/permisos.service';
import { IPermissionModel } from '../../models/ipermission.model';
import { INamedEntity } from '../../../../Shared/Models/inamed-entity.model';
import { IUsuarioUpdateModel } from '../../models/usuario-update.model';
import { PermissionsSelectorComponent } from '../../components/permissions-selector/permissions-selector.component';
import { MatSelectModule } from '@angular/material/select';

@Component({
	selector: 'app-edit',
	standalone: true,
	imports: [
		MatCardModule,
		MatFormFieldModule,
		MatInputModule,
		MatButtonModule,
		MatSelectModule,
		ReactiveFormsModule,
		PermissionsSelectorComponent,
	],
	templateUrl: './edit.page.component.html',
	styleUrl: './edit.page.component.scss',
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EditPageComponent implements OnInit, AfterViewInit {
	usuarioId: number = 0;
	usuarioData$ = signal<IUsuarioUpdateModel | null>(null);
	permissions$ = signal<IPermissionModel[]>([]);
	rangos$ = signal<INamedEntity[]>([]);
	selectedPermissions$ = signal<number[]>([]);

	usuarioForm: FormGroup = new FormGroup({
		cedula: new FormControl(this.usuarioData$()?.cedula, [
			Validators.required,
			Validators.minLength(11),
			Validators.maxLength(11),
			Validators.pattern(/^\d{11}$/),
		]),
		nombre: new FormControl(this.usuarioData$()?.nombre, [
			Validators.required,
		]),
		apellido: new FormControl(this.usuarioData$()?.apellido, [
			Validators.required,
		]),
		rangoId: new FormControl(this.usuarioData$()?.rangoId),
	});

	constructor(
		private $route: ActivatedRoute,
		private $router: Router,
		private _permisosService: PermisosService,
		private _usuarioService: UsuariosService
	) {
		this.usuarioId = (this.$route.snapshot.paramMap.get('id') ??
			0) as number;
	}

	ngOnInit(): void {
		this._permisosService.getAllPermisos().subscribe((permissions) => {
			this.permissions$.set(
				permissions.map((p) => ({ ...p, checked: false }))
			);
		});

		this._usuarioService.getRangos().subscribe((rangos) => {
			this.rangos$.set(rangos);
		});
	}

	ngAfterViewInit(): void {
		this._usuarioService
			.getUsuarioById(this.usuarioId)
			.subscribe((data) => {
				this.updateUsuarioFormControl(data);
				this.getPermissions(data.roles);
			});
	}

	private updateUsuarioFormControl(data: IUsuarioUpdateModel | null): void {
		this.usuarioForm.patchValue({
			cedula: data?.cedula,
			nombre: data?.nombre,
			apellido: data?.apellido,
			rangoId: data?.rangoId,
		});
	}

	private getPermissions(userRoles: string[]): void {
		let permissions: IPermissionModel[] = this.permissions$().map((p) => {
			return userRoles.some((r) => r === p.name)
				? { ...p, checked: true }
				: { ...p, checked: false };
		});

		this.permissions$.set(permissions);
	}

	onPermissionSaved(permissions: number[]): void {
		this.selectedPermissions$.set(permissions);
	}

	saveChanges(): void {
		this._usuarioService
			.updateUsuario(this.usuarioId, {
				...this.usuarioForm.value,
				roles: this.selectedPermissions$(),
			})
			.subscribe(() => this.$router.navigate(['/accesos/usuarios']));
	}
}
