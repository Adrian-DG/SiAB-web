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
import { IFilterDebitoCreditoResult } from '../../models/ifilter-debito-credito-result.model';
import { IMiembroListDetail } from '../../../existencia/models/imiembro-list-deatil.model';

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
	schemas: [NO_ERRORS_SCHEMA, CUSTOM_ELEMENTS_SCHEMA],
})
export class CargoDescargoPageComponent implements AfterViewInit {
	debitoControl = new FormControl('', Validators.required);
	creditosControl = new FormControl('', Validators.required);
	articuloControl = new FormControl('');

	cargoDescargoObj = {
		tipoCargoDebito: this.tipoCargoDescargo.MIEMBRO,
		tipoCargoCredito: this.tipoCargoDescargo.MIEMBRO,
		debito: '',
		credito: '',
	};

	debitosList = signal<IFilterDebitoCreditoResult[]>([]);
	creditosList = signal<IFilterDebitoCreditoResult[]>([]);
	articulosList = signal<any[]>([]);
	articulosSelected: IArticuloCargoDescargoInfo[] = [
		{ id: 1, cantidad: 1, embalaje: 'Caja', articulo: 'Articulo 1' },
	];

	constructor(private _miembrosController: MiembroService) {}

	ngAfterViewInit(): void {
		// TODO: Implementar busqueda de debitos y creditos

		this.debitoControl.valueChanges.subscribe((value: string | null) => {
			if (value && value !== '' && value.length > 5) {
				this.getInfoDebito(
					this.cargoDescargoObj.tipoCargoDebito,
					value
				);
			}
		});

		this.creditosControl.valueChanges.subscribe((value: string | null) => {
			if (value && value !== '' && value.length > 5) {
				this.getInfoCredito(
					this.cargoDescargoObj.tipoCargoCredito,
					value
				);
			}
		});

		this.articuloControl.valueChanges.subscribe((value) => {
			console.log(value);
		});
	}

	get tipoCargoDescargo() {
		return TipoCargoDescargoEnum;
	}

	displayDebitoCreditoString(result: IFilterDebitoCreditoResult): string {
		return result.param2;
	}

	getInfoDebito(tipo: TipoCargoDescargoEnum, value: string) {
		switch (tipo) {
			case TipoCargoDescargoEnum.MIEMBRO:
				this._miembrosController
					.getMiembrosByCedula(value)
					.subscribe((miembros: IMiembroListDetail[]) => {
						this.debitosList.set(
							miembros.map((miembro) => {
								return {
									param1: miembro.cedula,
									param2: miembro.nombreApellidoCompleto,
								};
							})
						);
					});
				break;
			case TipoCargoDescargoEnum.S4:
				// Buscar el deposito
				break;
			case TipoCargoDescargoEnum.CIVIL:
				// Buscar el civil por cedula
				break;
		}
	}

	getInfoCredito(tipo: TipoCargoDescargoEnum, value: string) {
		switch (tipo) {
			case TipoCargoDescargoEnum.MIEMBRO:
				this._miembrosController
					.getMiembrosByCedula(value)
					.subscribe((miembros: IMiembroListDetail[]) => {
						this.creditosList.set(
							miembros.map((miembro) => {
								return {
									param1: miembro.cedula,
									param2: miembro.nombreApellidoCompleto,
								};
							})
						);
					});
				break;
			case TipoCargoDescargoEnum.S4:
				// Buscar el deposito
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
		const debito = this.debitoControl.value;
		const credito = this.creditosControl.value;

		if (!debito || !credito) {
			return;
		}

		console.log(debito, credito);

		this.cargoDescargoObj.debito = (
			debito as unknown as IFilterDebitoCreditoResult
		).param1;
		this.cargoDescargoObj.credito = (
			credito as unknown as IFilterDebitoCreditoResult
		).param1;

		console.log(this.cargoDescargoObj);
	}
}
