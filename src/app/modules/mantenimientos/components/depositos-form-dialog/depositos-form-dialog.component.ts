import {
	AfterViewInit,
	ChangeDetectionStrategy,
	Component,
	OnInit,
	signal,
} from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { DepositosService } from '../../services/depositos.service';
import {
	FormControl,
	FormsModule,
	ReactiveFormsModule,
	Validators,
} from '@angular/forms';
import { MatSelectModule } from '@angular/material/select';
import { FuncionesService } from '../../services/funciones.service';
import { IFuncionDetail } from '../../models/ifuncion-detail.model';
import { FormularyMetadata } from '../../../../Shared/helpers/formulary-metadata';
import { DependenciasService } from '../../services/dependencias.service';
import { INamedEntity } from '../../../../Shared/Models/inamed-entity.model';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { ICreateDepositoDto } from '../../dtos/icreate-deposito.dto';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { IUpdateEntityDto } from '../../dtos/iupdate-entity.dto';
import { IDepositoDetailModel } from '../../models/ideposito-detail.model';
import { UpdateCreateDialogActionsComponent } from '../../../../Shared/components/update-create-dialog-actions/update-create-dialog-actions.component';
import { debounceTime, distinctUntilChanged } from 'rxjs';

@Component({
	selector: 'app-depositos-form-dialog',
	standalone: true,
	imports: [
		MatDialogModule,
		MatFormFieldModule,
		MatInputModule,
		MatButtonModule,
		MatAutocompleteModule,
		MatCheckboxModule,
		FormsModule,
		ReactiveFormsModule,
		UpdateCreateDialogActionsComponent,
	],
	templateUrl: './depositos-form-dialog.component.html',
	styleUrl: './depositos-form-dialog.component.scss',
	changeDetection: ChangeDetectionStrategy.OnPush,
	providers: [DepositosService, DependenciasService],
})
export class DepositosFormDialogComponent
	extends FormularyMetadata<
		DepositosFormDialogComponent,
		IDepositoDetailModel
	>
	implements OnInit
{
	dependencias$ = signal<INamedEntity[]>([]);
	depositoObj = { nombre: '', esFuncion: false };
	dependenciaControl = new FormControl<string>('', Validators.required);

	constructor(
		protected dialogRef: MatDialogRef<DepositosFormDialogComponent>,
		private _dependenciasService: DependenciasService,
		private _depositosService: DepositosService
	) {
		super(dialogRef);
	}

	ngOnInit(): void {
		this.dependenciaControl.valueChanges
			.pipe(debounceTime(300), distinctUntilChanged())
			.subscribe((value: string | null) => {
				if (value && value !== '' && value.length > 2) {
					this._dependenciasService
						.getFilter<INamedEntity>(value)
						.subscribe((data: INamedEntity[]) => {
							this.dependencias$.set(data);
						});
				}
			});
	}

	displayDependenciaFn(dependencia: INamedEntity): string {
		return dependencia.nombre;
	}

	override onUpdate(event: any): void {
		throw new Error('Method not implemented.');
	}

	override onSave(event: any): void {
		const dependencia = this.dependenciaControl
			.value as unknown as INamedEntity;

		const newDepositosObj: ICreateDepositoDto = {
			nombre: this.depositoObj.nombre.trim(),
			dependenciaId: dependencia.id,
			esFuncion: this.depositoObj.esFuncion,
		};

		this._depositosService
			.create<ICreateDepositoDto>(newDepositosObj)
			.subscribe(() => this.dialogRef.close());
	}
}
