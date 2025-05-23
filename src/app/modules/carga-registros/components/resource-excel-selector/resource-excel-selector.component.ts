import {
	ChangeDetectionStrategy,
	Component,
	EventEmitter,
	Output,
	signal,
	ViewEncapsulation,
} from '@angular/core';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { DepositosService } from '../../../mantenimientos/services/depositos.service';
import { INamedEntity } from '../../../../Shared/Models/inamed-entity.model';
import { debounce, debounceTime, distinctUntilChanged } from 'rxjs';
import { TipoDebitoCreditoEnum } from '../../../procesos/enums/tipo-debito-credito.enum';

@Component({
	selector: 'app-resource-excel-selector',
	standalone: true,
	imports: [
		MatAutocompleteModule,
		MatInputModule,
		MatFormFieldModule,
		MatSelectModule,
		MatButtonModule,
		MatIconModule,
		FormsModule,
		ReactiveFormsModule,
	],
	template: `
		<div class="row">
			<mat-form-field class="select-field">
				<mat-label>Origen</mat-label>
				<mat-select [(ngModel)]="origen">
					<mat-option [value]="TipoDebitoCredito.MIEMBRO"
						>Militar</mat-option
					>
					<mat-option [value]="TipoDebitoCredito.CIVIL"
						>Civil</mat-option
					>
					<mat-option [value]="TipoDebitoCredito.DEPOSITO"
						>Deposito</mat-option
					>
					<mat-option [value]="TipoDebitoCredito.FUNCION_S4"
						>Función (S4)</mat-option
					>
				</mat-select>
			</mat-form-field>

			<mat-form-field class="select-field">
				<mat-label>Destino</mat-label>
				<mat-select [(ngModel)]="destino">
					<mat-option [value]="TipoDebitoCredito.MIEMBRO"
						>Militar</mat-option
					>
					<mat-option [value]="TipoDebitoCredito.CIVIL"
						>Civil</mat-option
					>
					<mat-option [value]="TipoDebitoCredito.DEPOSITO"
						>Deposito</mat-option
					>
					<mat-option [value]="TipoDebitoCredito.FUNCION_S4"
						>Función (S4)</mat-option
					>
				</mat-select>
			</mat-form-field>

			<mat-form-field class="dependencia-field">
				<mat-label>Dependencia</mat-label>
				<input
					type="text"
					placeholder="Buscar dependencia"
					matInput
					[formControl]="dependenciaControl"
					[matAutocomplete]="dependencia"
				/>
				<mat-autocomplete
					#dependencia="matAutocomplete"
					[displayWith]="displayDependencia"
				>
					@for (option of dependencias(); track $index) {
					<mat-option [value]="option">{{
						option.nombre
					}}</mat-option>
					}
				</mat-autocomplete>
			</mat-form-field>

			<button mat-raised-button (click)="downloadTemplate()">
				<mat-icon>cloud_download</mat-icon>
				Descargar plantilla
			</button>
			<button mat-flat-button (click)="uploadInfo()">
				<mat-icon>cloud_upload</mat-icon>
				subir informacion
			</button>
		</div>
	`,
	styleUrl: './resource-excel-selector.component.scss',
	changeDetection: ChangeDetectionStrategy.OnPush,
	providers: [DepositosService],
})
export class ResourceExcelSelectorComponent {
	@Output('on-template-download') templateDownload =
		new EventEmitter<string>();
	@Output('on-info-upload') infoUpload = new EventEmitter<{
		origen: number;
		destino: number;
	}>();

	origen: number = 3;
	destino: number = 3;
	dependenciaControl = new FormControl();

	dependencias = signal<INamedEntity[]>([]);

	constructor(private _depositosService: DepositosService) {}

	ngOnInit() {
		this.dependenciaControl.valueChanges
			.pipe(debounceTime(1000), distinctUntilChanged())
			.subscribe((value: string | null) => {
				if (value && value.length > 3) {
					this._depositosService
						.getFilterDepositos(value)
						.subscribe((data: INamedEntity[]) => {
							this.dependencias.set(data);
						});
				}
			});
	}

	get TipoDebitoCredito() {
		return TipoDebitoCreditoEnum;
	}

	displayDependencia(dependencia: INamedEntity) {
		return dependencia ? dependencia.nombre : '';
	}

	downloadTemplate() {
		// Download template
		const dependencia = this.dependenciaControl.value as INamedEntity;
		if (!dependencia || dependencia.nombre === '') {
			alert('Debe seleccionar una dependencia');
			return;
		}
		this.templateDownload.emit(dependencia.nombre);
	}

	uploadInfo() {
		// Upload info
		this.infoUpload.emit({ origen: this.origen, destino: this.destino });
	}
}
