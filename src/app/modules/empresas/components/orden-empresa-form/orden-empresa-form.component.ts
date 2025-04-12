import { CommonModule, DatePipe } from '@angular/common';
import {
	AfterViewInit,
	ChangeDetectionStrategy,
	Component,
	inject,
	LOCALE_ID,
	OnInit,
	signal,
} from '@angular/core';
import {
	FormArray,
	FormControl,
	FormGroup,
	ReactiveFormsModule,
	Validators,
} from '@angular/forms';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatButtonModule } from '@angular/material/button';
import { MatDatepickerModule } from '@angular/material/datepicker';
import {
	MAT_DIALOG_DATA,
	MatDialogModule,
	MatDialogRef,
} from '@angular/material/dialog';
import { MatDividerModule } from '@angular/material/divider';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatStepperModule } from '@angular/material/stepper';
import { FileInputComponent } from '../../../../Shared/components/file-input/file-input.component';
import { OrdenesEmpresaService } from '../../services/ordenes-empresa.service';
import { ICreateOrdenEmpresaDto } from '../../dto/icreate-orden-empresa.dto';
import { ICreateArticuloDto } from '../../dto/icreate-articulo.dto';
import { ICreateDocumentoDto } from '../../dto/icreate-documento.dto';
import { CategoriaService } from '../../../mantenimientos/services/categoria.service';
import { TipoService } from '../../../mantenimientos/services/tipo.service';
import { SubtipoService } from '../../../mantenimientos/services/subtipo.service';
import { MarcaService } from '../../../mantenimientos/services/marca.service';
import { ModelosService } from '../../../mantenimientos/services/modelos.service';
import { CalibreService } from '../../../mantenimientos/services/calibre.service';
import { INamedEntity } from '../../../../Shared/Models/inamed-entity.model';
import { TiposDocumentosService } from '../../../mantenimientos/services/tipos-documentos.service';

@Component({
	selector: 'app-orden-empresa-form',
	standalone: true,
	imports: [
		CommonModule,
		MatIconModule,
		MatDialogModule,
		MatFormFieldModule,
		MatInputModule,
		MatButtonModule,
		MatStepperModule,
		MatDatepickerModule,
		MatSelectModule,
		MatAutocompleteModule,
		MatDividerModule,
		ReactiveFormsModule,
		FileInputComponent,
	],
	templateUrl: './orden-empresa-form.component.html',
	styleUrl: './orden-empresa-form.component.scss',
	changeDetection: ChangeDetectionStrategy.OnPush,
	providers: [
		OrdenesEmpresaService,
		DatePipe,
		{ provide: LOCALE_ID, useValue: 'es-ES' },
		CategoriaService,
		TipoService,
		SubtipoService,
		MarcaService,
		ModelosService,
		CalibreService,
		TiposDocumentosService,
	],
})
export class OrdenEmpresaFormComponent implements OnInit, AfterViewInit {
	categorias$ = signal<INamedEntity[]>([]);
	tipos$ = signal<INamedEntity[]>([]);
	subTipos$ = signal<INamedEntity[]>([]);
	marcas$ = signal<INamedEntity[]>([]);
	calibres$ = signal<INamedEntity[]>([]);
	tipoDocumentos$ = signal<INamedEntity[]>([]);

	datosForm: FormGroup = new FormGroup({
		fechaEfectividad: new FormControl(''),
		comentario: new FormControl(''),
	});

	articulosForm: FormGroup = new FormGroup({
		articulos: new FormArray([]),
	});

	documentosForm: FormGroup = new FormGroup({
		documentos: new FormArray([]),
	});

	datePipe = inject(DatePipe);

	data: { id: number } = inject(MAT_DIALOG_DATA);

	constructor(
		private _dialogRef: MatDialogRef<OrdenEmpresaFormComponent>,
		private _ordenEmpresaService: OrdenesEmpresaService,
		private _categoriaService: CategoriaService,
		private _tipoService: TipoService,
		private _subtipoService: SubtipoService,
		private _marcaService: MarcaService,
		private _modeloService: ModelosService,
		private _calibreService: CalibreService,
		private _tiposDocumentosService: TiposDocumentosService
	) {}

	ngOnInit(): void {
		this.addArticulo();
		this.addDocumento();
	}

	ngAfterViewInit(): void {
		this._categoriaService
			.getAll<INamedEntity>()
			.subscribe((res) => this.categorias$.set(res));

		this._marcaService
			.getAllResource<INamedEntity>()
			.subscribe((res) => this.marcas$.set(res));

		this._calibreService
			.getAllResource<INamedEntity>()
			.subscribe((res) => this.calibres$.set(res));

		this._tiposDocumentosService
			.getAllResource<INamedEntity>()
			.subscribe((res) => this.tipoDocumentos$.set(res));
	}

	onCategoriaSelected() {
		const categoriaId = this.articulos.at(0).get('categoriaId')?.value;
		this._tipoService
			.getTiposByCategoriaId(categoriaId)
			.subscribe((res) => {
				this.tipos$.set(res);
			});
	}

	onTipoSelected() {
		const tipoId = this.articulos.at(0).get('tipoId')?.value;
		this._subtipoService.getSubTiposByTipoId(tipoId).subscribe((res) => {
			this.subTipos$.set(res);
		});
	}

	get articulos(): FormArray {
		return this.articulosForm.get('articulos') as FormArray;
	}

	get documentos(): FormArray {
		return this.documentosForm.get('documentos') as FormArray;
	}

	get isFormValid(): boolean {
		return this.datosForm.valid && this.articulosForm.valid;
	}

	addArticulo() {
		const articulo = new FormGroup({
			categoriaId: new FormControl('', Validators.required),
			tipoId: new FormControl('', Validators.required),
			subTipoId: new FormControl('', Validators.required),
			marcaId: new FormControl('', Validators.required),
			modeloId: new FormControl(1),
			calibreId: new FormControl('', Validators.required),
			serie: new FormControl(''),
			cantidad: new FormControl('', Validators.required),
		});

		this.articulos.push(articulo);
	}

	removeArticulo(index: number) {
		this.articulos.removeAt(index);
	}

	addDocumento() {
		const documento = new FormGroup({
			tipoDocumentoId: new FormControl(0),
			archivo: new FormControl(''),
			nombre: new FormControl(''),
			fechaEmision: new FormControl('', Validators.required),
			fechaRecepcion: new FormControl('', Validators.required),
			fechaExpiracion: new FormControl('', Validators.required),
		});

		this.documentos.push(documento);
	}

	removeDocumento(index: number) {
		this.documentos.removeAt(index);
	}

	onFileSelected(event: string, index: number) {
		this.documentos.at(index).patchValue({
			archivo: event,
		});
	}

	onClose() {
		this._dialogRef.close();
	}

	private formatDateString(date: string) {
		let stringToDate = new Date(date);
		return this.datePipe.transform(stringToDate, 'yyyy-MM-dd');
	}

	private formatDate(date: Date) {
		return date ? this.datePipe.transform(date, 'yyyy-MM-dd') : null;
	}

	onSave() {
		if (this.datosForm.valid && this.articulosForm.valid) {
			const datos = this.datosForm.value as {
				fechaEfectividad: Date;
				comentario: string;
			};

			const articulos = this.articulosForm.value
				.articulos as ICreateArticuloDto[];

			let documentos = this.documentosForm.value
				.documentos as ICreateDocumentoDto[];

			documentos = documentos.map((documento) => {
				return {
					...documento,
					fechaEmision:
						this.formatDateString(documento.fechaEmision) ?? '',
					fechaRecepcion:
						this.formatDateString(documento.fechaRecepcion) ?? '',
					fechaExpiracion:
						this.formatDateString(documento.fechaExpiracion) ?? '',
				};
			});

			// console.log('Datos:', datos);
			// console.log('Articulos:', articulos);
			// console.log('Documentos:', documentos);

			const ordenEmpresa: ICreateOrdenEmpresaDto = {
				fechaEfectividad: this.formatDate(datos.fechaEfectividad) ?? '',
				comentario: datos.comentario,
				articulos: articulos,
				documentos: documentos,
			};

			this._ordenEmpresaService
				.createOrdenEmpresa(this.data.id, ordenEmpresa)
				.subscribe(() => {
					this._dialogRef.close(true);
				});
		} else {
			console.error('Formulario inválido');
		}
	}
}
