import {
	AfterViewInit,
	ChangeDetectionStrategy,
	Component,
	CUSTOM_ELEMENTS_SCHEMA,
	NO_ERRORS_SCHEMA,
	signal,
} from '@angular/core';
import {
	FormControl,
	FormGroup,
	FormsModule,
	ReactiveFormsModule,
	Validators,
} from '@angular/forms';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatDividerModule } from '@angular/material/divider';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { INamedEntity } from '../../../../Shared/Models/inamed-entity.model';
import { CargoDescargoArticulosTableComponent } from '../../components/cargo-descargo-articulos-table/cargo-descargo-articulos-table.component';
import { IArticuloCargoDescargoInfo } from '../../models/iarticulo-cargo-descargo-info.model';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatRadioModule } from '@angular/material/radio';
import { TipoCargoDescargoEnum } from '../../enums/tipo-cargo.enum';
import { MiembroService } from '../../../existencia/services/miembro.service';
import { IFilterMiembroResult } from '../../models/ifilter-miembro-result.model';
import { IMiembroListDetail } from '../../../existencia/models/imiembro-list-deatil.model';
import { DepositosService } from '../../../mantenimientos/services/depositos.service';

@Component({
	selector: 'app-cargo-descargo.page',
	standalone: true,
	imports: [
		MatDividerModule,
		MatFormFieldModule,
		MatInputModule,
		MatSelectModule,
		MatAutocompleteModule,
		MatButtonModule,
		MatIconModule,
		MatRadioModule,
		FormsModule,
		ReactiveFormsModule,
		CargoDescargoArticulosTableComponent,
	],
	templateUrl: './cargo-descargo.page.component.html',
	styleUrl: './cargo-descargo.page.component.scss',
	changeDetection: ChangeDetectionStrategy.OnPush,
	providers: [MiembroService, DepositosService],
	schemas: [NO_ERRORS_SCHEMA, CUSTOM_ELEMENTS_SCHEMA],
})
export class CargoDescargoPageComponent implements AfterViewInit {
	// Variables de control

	debitosList = signal<IFilterMiembroResult[]>([]);
	creditosList = signal<IFilterMiembroResult[]>([]);
	intendentesList = signal<IFilterMiembroResult[]>([]);
	//  Formulario de cargo descargo

	cargoDescargoForm: FormGroup = new FormGroup({
		tipoCargoDebito: new FormControl(
			this.tipoCargoDescargo.MIEMBRO,
			Validators.required
		),
		tipoCargoCredito: new FormControl(
			this.tipoCargoDescargo.MIEMBRO,
			Validators.required
		),
		debito: new FormControl('', Validators.required),
		credito: new FormControl('', Validators.required),
		oficio: new FormControl('', Validators.required),
		noDocumento: new FormControl('', Validators.required),
		intendente: new FormControl('', Validators.required),
		observacion: new FormControl(''),
	});

	articulosList = signal<any[]>([]);
	articulosSelected: IArticuloCargoDescargoInfo[] = [
		{ id: 1, cantidad: 1, embalaje: 'Caja', articulo: 'Articulo 1' },
	];

	constructor(
		private _miembrosService: MiembroService,
		private _depositosService: DepositosService
	) {}

	ngAfterViewInit(): void {
		// TODO: Implementar busqueda de debitos y creditos

		this.cargoDescargoForm.controls['debito'].valueChanges.subscribe(
			(value: string | null) => {
				if (value && value !== '' && value.length > 5) {
					const tipoDebito =
						this.cargoDescargoForm.controls['tipoCargoDebito']
							.value;
					this.getInfoTipoCargo(tipoDebito, 'debito', value);
				}
			}
		);

		this.cargoDescargoForm.controls['credito'].valueChanges.subscribe(
			(value: string | null) => {
				if (value && value !== '' && value.length > 5) {
					const tipoCargo =
						this.cargoDescargoForm.controls['tipoCargoCredito']
							.value;
					this.getInfoTipoCargo(tipoCargo, 'credito', value);
				}
			}
		);

		this.cargoDescargoForm.controls['intendente'].valueChanges.subscribe(
			(value: string | null) => {
				if (value && value !== '' && value.length > 5) {
					this._miembrosService
						.getMiembrosByCedula(value)
						.subscribe((miembros: IMiembroListDetail[]) => {
							this.intendentesList.set(
								miembros.map((miembro) => {
									return {
										param1: miembro.cedula,
										param2: miembro.nombreApellidoCompleto,
									};
								})
							);
						});
				}
			}
		);

		// this.cargoDescargoForm.controls[''].valueChanges.subscribe((value) => {
		// 	console.log(value);
		// });
	}

	get tipoCargoDescargo() {
		return TipoCargoDescargoEnum;
	}

	displaySelectedFormated(result: IFilterMiembroResult): string {
		return result.param2;
	}

	getInfoTipoCargo(
		tipo: TipoCargoDescargoEnum,
		forType: 'debito' | 'credito',
		value: string
	) {
		switch (tipo) {
			case TipoCargoDescargoEnum.MIEMBRO:
				this._miembrosService
					.getMiembrosByCedula(value)
					.subscribe((miembros: IMiembroListDetail[]) => {
						let data = miembros.map((miembro) => ({
							param1: miembro.cedula,
							param2: miembro.nombreApellidoCompleto,
						}));
						forType === 'debito'
							? this.debitosList.set(data)
							: this.creditosList.set(data);
					});
				break;
			case TipoCargoDescargoEnum.S4:
				this._depositosService
					.getFilterDepositos(value)
					.subscribe((depositos: INamedEntity[]) => {
						let data = depositos.map((deposito) => ({
							param1: deposito.id.toString(),
							param2: deposito.nombre,
						}));
						forType === 'debito'
							? this.debitosList.set(data)
							: this.creditosList.set(data);
					});
				break;
			case TipoCargoDescargoEnum.CIVIL:
				// Buscar el civil por cedula
				break;
		}
	}

	onDeleteItem(event: any) {
		console.log(event);
	}

	createCargoDescargo() {
		console.log(this.cargoDescargoForm.value);
	}
}
