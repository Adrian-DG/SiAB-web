import { CommonModule, DatePipe } from '@angular/common';
import {
	ChangeDetectionStrategy,
	Component,
	inject,
	LOCALE_ID,
	OnInit,
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
	],
})
export class OrdenEmpresaFormComponent implements OnInit {
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

	data = inject(MAT_DIALOG_DATA);

	constructor(
		private _dialogRef: MatDialogRef<OrdenEmpresaFormComponent>,
		private _ordenEmpresaService: OrdenesEmpresaService
	) {}

	ngOnInit(): void {
		this.addArticulo();
		this.addDocumento();
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
			categoria: new FormControl(''),
			tipo: new FormControl(''),
			subTipo: new FormControl(''),
			marca: new FormControl(''),
			modelo: new FormControl(''),
			calibre: new FormControl(''),
			serie: new FormControl(''),
			cantidad: new FormControl(''),
		});

		this.articulos.push(articulo);
	}

	removeArticulo(index: number) {
		this.articulos.removeAt(index);
	}

	addDocumento() {
		const documento = new FormGroup({
			tipoDocumento: new FormControl(0),
			archivo: new FormControl(''),
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

	onSave() {
		if (this.datosForm.valid && this.articulosForm.valid) {
			const datos = this.datosForm.value as {
				fechaEfectividad: Date;
				comentario: string;
			};

			const formattedDate = this.datePipe.transform(
				datos.fechaEfectividad ?? new Date(),
				'yyyy-MM-dd'
			);

			const articulos = this.articulosForm.value
				.articulos as ICreateArticuloDto[];

			const documentos = this.documentosForm.value
				.documentos as ICreateDocumentoDto[];

			console.log('Datos:', datos);
			console.log('Articulos:', articulos);
			console.log('Documentos:', documentos);
		} else {
			console.error('Formulario inválido');
		}
	}
}
