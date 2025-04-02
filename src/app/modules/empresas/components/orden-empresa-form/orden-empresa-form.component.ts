import { CommonModule } from '@angular/common';
import {
	ChangeDetectionStrategy,
	Component,
	inject,
	OnInit,
} from '@angular/core';
import {
	FormArray,
	FormControl,
	FormGroup,
	ReactiveFormsModule,
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
	],
	templateUrl: './orden-empresa-form.component.html',
	styleUrl: './orden-empresa-form.component.scss',
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class OrdenEmpresaFormComponent implements OnInit {
	datosForm: FormGroup = new FormGroup({
		fecha: new FormControl(''),
		comentario: new FormControl(''),
	});

	articulosForm: FormGroup = new FormGroup({
		articulos: new FormArray([]),
	});
	documentosForm: FormGroup = new FormGroup({});

	data = inject(MAT_DIALOG_DATA);

	constructor(private _dialogRef: MatDialogRef<OrdenEmpresaFormComponent>) {}

	ngOnInit(): void {
		this.addArticulo();
	}

	get articulos(): FormArray {
		return this.articulosForm.get('articulos') as FormArray;
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

	onClose() {
		this._dialogRef.close();
	}

	onSave() {
		this._dialogRef.close();
	}
}
