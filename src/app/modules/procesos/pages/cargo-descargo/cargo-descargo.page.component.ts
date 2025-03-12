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
import { DebitoArticulosTableComponent } from '../../components/debito-articulos-table/debito-articulos-table.component';
import { SecuenciasService } from '../../services/Secuencias.service';
import { FileInputComponent } from '../../../../Shared/components/file-input/file-input.component';
import { TransaccionService } from '../../../carga-registros/services/transaccion.service';
import { debounceTime, distinctUntilChanged } from 'rxjs';
import { MatDatepickerModule } from '@angular/material/datepicker';
import * as _ from 'lodash';
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
		MatDatepickerModule,
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
		SecuenciasService,
		TransaccionService,
	],
	schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class CargoDescargoPageComponent implements OnInit, AfterViewInit {
	private readonly MINIMUN_FILTER_LENGTH = 2;

	// Variables de control
	debitosList = signal<IFilterMiembroResult[]>([]);
	creditosList = signal<IFilterMiembroResult[]>([]);
	intendentesList = signal<IFilterMiembroResult[]>([]);
	articulosList = signal<any[]>([]);
	articulosSelected = signal<any[]>([]);

	secuencia_53 = signal<string>('');

	subtipoSelected = '';
	serieSelected = '';
	cantidadSelected = 0;

	documentoPDF = '';

	//  Formulario de cargo descargo

	registroDebitoCreditoForm: FormGroup = new FormGroup({
		tipoCargoDebito: new FormControl(
			this.tipoCargoDescargo.MIEMBRO,
			Validators.required
		),
		tipoCargoCredito: new FormControl(
			this.tipoCargoDescargo.DEPOSITO,
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

	reportDetailsForm: FormGroup = new FormGroup({
		encargadoArmas: new FormControl(''),
		encargadoDepositos: new FormControl(''),
		entrega: new FormControl(''),
		recibe: new FormControl(''),
		firma: new FormControl(''),
	});

	constructor(
		private _miembrosService: MiembroService,
		private _depositosService: DepositosService,
		private _secuenciasService: SecuenciasService,
		private _transaccionService: TransaccionService
	) {}

	ngOnInit(): void {
		this._secuenciasService
			.GetSecuenciaInstitucion()
			.subscribe((value: string) => this.secuencia_53.set(value));
	}

	ngAfterViewInit(): void {
		// TODO: Implementar busqueda de debitos y creditos

		this.registroDebitoCreditoForm.controls['debito'].valueChanges
			.pipe(debounceTime(3000), distinctUntilChanged())
			.subscribe((value: string | null) => {
				if (
					value &&
					value !== '' &&
					value.length > this.MINIMUN_FILTER_LENGTH
				) {
					const tipoDebito =
						this.registroDebitoCreditoForm.controls[
							'tipoCargoDebito'
						].value;
					this.getInfoTipoCargo(tipoDebito, 'debito', value);
				}
			});

		this.registroDebitoCreditoForm.controls['credito'].valueChanges
			.pipe(debounceTime(3000), distinctUntilChanged())
			.subscribe((value: string | null) => {
				if (
					value &&
					value !== '' &&
					value.length > this.MINIMUN_FILTER_LENGTH
				) {
					const tipoCargo =
						this.registroDebitoCreditoForm.controls[
							'tipoCargoCredito'
						].value;
					this.getInfoTipoCargo(tipoCargo, 'credito', value);
				}
			});

		this.registroDebitoCreditoForm.controls['intendente'].valueChanges
			.pipe(debounceTime(3000), distinctUntilChanged())
			.subscribe((value: string | null) => {
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
			case TipoDebitoCreditoEnum.CIVIL:
				// Buscar el civil por cedula
				break;
			case TipoDebitoCreditoEnum.DEPOSITO:
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
		}
	}

	onSelectedCredito() {
		const tipoCargoCredito = this.registroDebitoCreditoForm.controls[
			'tipoCargoCredito'
		].value as number;
		const debitadoA = (
			this.registroDebitoCreditoForm.controls['credito']
				.value as unknown as IFilterMiembroResult
		).param1;

		this._transaccionService
			.getArticulosOrigenTransaccion(tipoCargoCredito, debitadoA)
			.subscribe((data: any[]) => {
				this.articulosList.set(data);
			});
	}

	get articulos_subtipos() {
		const dict = _.groupBy(this.articulosList(), 'subTipo');
		return Object.keys(dict);
	}

	get articulos_series() {
		return this.articulosList().filter(
			(articulo) => articulo.subTipo === this.subtipoSelected
		);
	}

	get articulo_max_cantidad() {
		return this.articulosList().filter(
			(articulo) => articulo.serie == this.serieSelected
		).length;
	}

	onSerieChange() {
		this.cantidadSelected++;
	}

	get isArticuloFormValid() {
		return (
			this.subtipoSelected !== '' &&
			this.serieSelected !== '' &&
			this.cantidadSelected > 0
		);
	}

	addArticulo() {
		const articulo = this.articulosList().find(
			(articulo) => articulo.serie == this.serieSelected
		);
		this.articulosSelected.update(() => [
			...this.articulosSelected(),
			articulo,
		]);
	}

	onDeleteItem(event: any) {
		const updatedArticulos = this.articulosSelected().filter(
			(articulo) => articulo.serie !== event.serie
		);
		this.articulosSelected.set(updatedArticulos);
	}

	onFileUploaded(event: string) {
		this.documentoPDF = event;
	}

	createCargoDescargo() {
		const registroDebitoCredito = this.registroDebitoCreditoForm.value;
		const reportDetails = this.reportDetailsForm.value;

		console.log({
			secuencia: this.secuencia_53,
			...registroDebitoCredito,
			...reportDetails,
			articulos: this.articulosSelected(),
			documentoPDF: this.documentoPDF,
		});

		this._transaccionService
			.CreateTransaccionCargoDescargo({
				secuencia: this.secuencia_53() ?? '',
				...registroDebitoCredito,
				...reportDetails,
				fecha: new Date(registroDebitoCredito.fecha).toISOString(),
				debito: registroDebitoCredito.debito.param1,
				credito: registroDebitoCredito.credito.param1,
				intendente: registroDebitoCredito.intendente.param1,
				articulos: this.articulosSelected(),
				documentoPDF: this.documentoPDF,
			})
			.subscribe(() => {
				console.log('Transaccion creada');
			});
	}
}
