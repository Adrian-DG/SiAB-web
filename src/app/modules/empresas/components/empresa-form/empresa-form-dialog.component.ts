import {
	ChangeDetectionStrategy,
	Component,
	OnInit,
	signal,
} from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import {
	FormArray,
	FormControl,
	FormGroup,
	ReactiveFormsModule,
} from '@angular/forms';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatStepperModule } from '@angular/material/stepper';
import { provideMomentDateAdapter } from '@angular/material-moment-adapter';
import { EmpresaService } from '../../services/empresa.service';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
@Component({
	selector: 'app-proveedor-form',
	standalone: true,
	imports: [
		CommonModule,
		MatDialogModule,
		MatDividerModule,
		MatButtonModule,
		MatFormFieldModule,
		MatInputModule,
		MatDatepickerModule,
		MatStepperModule,
		MatIconModule,
		ReactiveFormsModule,
	],
	templateUrl: './empresa-form-dialog.component.html',
	styleUrl: './empresa-form-dialog.component.scss',
	changeDetection: ChangeDetectionStrategy.OnPush,
	providers: [],
})
export class EmpresaFormComponent implements OnInit {
	empresaForm!: FormGroup;
	constructor(
		private dialogRef: MatDialogRef<EmpresaFormComponent>,
		private _empresaService: EmpresaService
	) {}

	ngOnInit(): void {
		this.empresaForm = new FormGroup({
			nombre: new FormControl(''),
			rnc: new FormControl(''),
			titulares: new FormArray([]),
			contactos: new FormArray([]),
		});

		this.addTitular();
		this.addContacto();
	}

	get titulares(): FormArray {
		return this.empresaForm.controls['titulares'] as unknown as FormArray;
	}

	get contactos(): FormArray {
		return this.empresaForm.controls['contactos'] as unknown as FormArray;
	}

	addTitular() {
		const titularForm = new FormGroup({
			identificacion: new FormControl(''),
			nombre: new FormControl(''),
			apellido: new FormControl(''),
		});
		this.titulares.push(titularForm);
	}

	removeTitular(index: number) {
		this.titulares.removeAt(index);
	}

	addContacto() {
		const contactoForm = new FormGroup({
			telefono: new FormControl(''),
		});

		this.contactos.push(contactoForm);
	}

	removeContacto(index: number) {
		this.contactos.removeAt(index);
	}

	onSave() {}
}
