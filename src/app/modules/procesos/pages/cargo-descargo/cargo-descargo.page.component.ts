import {
	AfterViewInit,
	ChangeDetectionStrategy,
	Component,
	CUSTOM_ELEMENTS_SCHEMA,
	NO_ERRORS_SCHEMA,
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
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatDividerModule } from '@angular/material/divider';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { INamedEntity } from '../../../../Shared/Models/inamed-entity.model';
import { IRegistroDebitoArticulo } from '../../models/iregistro-debito-articulo.model';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatRadioModule } from '@angular/material/radio';
import { TipoDebitoCreditoEnum } from '../../enums/tipo-debito-credito.enum';
import { MiembroService } from '../../../existencia/services/miembro.service';
import { IFilterMiembroResult } from '../../models/ifilter-miembro-result.model';
import { IMiembroListDetail } from '../../../existencia/models/imiembro-list-deatil.model';
import { DepositosService } from '../../../mantenimientos/services/depositos.service';
import { RDCService } from '../../services/RDC.service';
import { DebitoArticulosTableComponent } from '../../components/debito-articulos-table/debito-articulos-table.component';
import { SecuenciasService } from '../../services/Secuencias.service';
import { FileInputComponent } from '../../../../Shared/components/file-input/file-input.component';

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
		DebitoArticulosTableComponent,
		FileInputComponent,
	],
	templateUrl: './cargo-descargo.page.component.html',
	styleUrl: './cargo-descargo.page.component.scss',
	changeDetection: ChangeDetectionStrategy.OnPush,
	providers: [
		MiembroService,
		DepositosService,
		RDCService,
		SecuenciasService,
	],
	schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class CargoDescargoPageComponent implements OnInit, AfterViewInit {
	private readonly MINIMUN_FILTER_LENGTH = 5;

	// Variables de control
	debitosList = signal<IFilterMiembroResult[]>([]);
	creditosList = signal<IFilterMiembroResult[]>([]);
	intendentesList = signal<IFilterMiembroResult[]>([]);
	articulosList = signal<IRegistroDebitoArticulo[]>([]);
	articulosSelected: IRegistroDebitoArticulo[] = [];

	secuencia_53 = signal<string>('');

	//  Formulario de cargo descargo

	registroDebitoCreditoForm: FormGroup = new FormGroup({
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
		fecha: new FormControl('', Validators.required),
		intendente: new FormControl('', Validators.required),
		observacion: new FormControl(''),
	});

	constructor(
		private _miembrosService: MiembroService,
		private _depositosService: DepositosService,
		private _rdcService: RDCService,
		private _secuenciasService: SecuenciasService
	) {}

	ngOnInit(): void {
		this._secuenciasService
			.GetSecuenciaInstitucion()
			.subscribe((value: string) => this.secuencia_53.set(value));
	}

	ngAfterViewInit(): void {
		// TODO: Implementar busqueda de debitos y creditos

		this.registroDebitoCreditoForm.controls[
			'debito'
		].valueChanges.subscribe((value: string | null) => {
			if (
				value &&
				value !== '' &&
				value.length > this.MINIMUN_FILTER_LENGTH
			) {
				const tipoDebito =
					this.registroDebitoCreditoForm.controls['tipoCargoDebito']
						.value;
				this.getInfoTipoCargo(tipoDebito, 'debito', value);
			}
		});

		this.registroDebitoCreditoForm.controls[
			'credito'
		].valueChanges.subscribe((value: string | null) => {
			if (
				value &&
				value !== '' &&
				value.length > this.MINIMUN_FILTER_LENGTH
			) {
				const tipoCargo =
					this.registroDebitoCreditoForm.controls['tipoCargoCredito']
						.value;
				this.getInfoTipoCargo(tipoCargo, 'credito', value);
			}
		});

		this.registroDebitoCreditoForm.controls[
			'intendente'
		].valueChanges.subscribe((value: string | null) => {
			if (
				value &&
				value !== '' &&
				value.length > this.MINIMUN_FILTER_LENGTH
			) {
				this._miembrosService
					.getMiembrosByCedulaNombre(value)
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
		});
	}

	get tipoCargoDescargo() {
		return TipoDebitoCreditoEnum;
	}

	displaySelectedFormated(result: IFilterMiembroResult): string {
		return result.param2;
	}

	displaySelectedArticulo(result: IRegistroDebitoArticulo): string {
		return result.nombre;
	}

	getInfoTipoCargo(
		tipo: TipoDebitoCreditoEnum,
		forType: 'debito' | 'credito',
		value: string
	) {
		switch (tipo) {
			case TipoDebitoCreditoEnum.MIEMBRO:
				this._miembrosService
					.getMiembrosByCedulaNombre(value)
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
			case TipoDebitoCreditoEnum.S4:
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
			case TipoDebitoCreditoEnum.CIVIL:
				// Buscar el civil por cedula
				break;
		}
	}

	onSelectedCredito(event: any) {
		const debitadoA =
			this.registroDebitoCreditoForm.controls['credito'].value;
		this._rdcService
			.getArticulosDebito(debitadoA)
			.subscribe((value: IRegistroDebitoArticulo[]) => {
				this.articulosList.set(value);
			});
	}

	onDeleteItem(event: any) {
		console.log(event);
	}

	onFileUploaded(event: string) {
		console.log(event);
	}

	createCargoDescargo() {
		console.log(this.registroDebitoCreditoForm.value);
	}
}
