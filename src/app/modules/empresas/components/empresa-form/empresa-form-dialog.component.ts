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
	Validators,
} from '@angular/forms';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatStepperModule } from '@angular/material/stepper';
import { provideMomentDateAdapter } from '@angular/material-moment-adapter';
import { EmpresaService } from '../../services/empresa.service';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { ICreateEmpresaDto } from '../../dto/icreate-empresa.dto';
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
			nombre: new FormControl('', [Validators.required]),
			rnc: new FormControl('', [Validators.required]),
			titulares: new FormArray([]),
			telefonos: new FormArray([]),
		});

		this.addTitular();
		this.addTelefono();
	}

	get titulares(): FormArray {
		return this.empresaForm.controls['titulares'] as unknown as FormArray;
	}

	get telefonos(): FormArray {
		return this.empresaForm.controls['telefonos'] as unknown as FormArray;
	}

	addTitular() {
		const titularForm = new FormGroup({
			identificacion: new FormControl('', [Validators.required]),
			nombre: new FormControl('', [Validators.required]),
			apellido: new FormControl('', [Validators.required]),
		});
		this.titulares.push(titularForm);
	}

	removeTitular(index: number) {
		this.titulares.removeAt(index);
	}

	addTelefono() {
		const contactoForm = new FormGroup({
			telefono: new FormControl('', [Validators.required]),
		});

		this.telefonos.push(contactoForm);
	}

	removeTelefono(index: number) {
		this.telefonos.removeAt(index);
	}

	onSave() {
		const empresaData = this.empresaForm.value as ICreateEmpresaDto;
		this._empresaService
			.createEmpresa(empresaData)
			.subscribe((response) => {
				console.log('Empresa creada:', response);
				this.dialogRef.close();
			});
	}
}
