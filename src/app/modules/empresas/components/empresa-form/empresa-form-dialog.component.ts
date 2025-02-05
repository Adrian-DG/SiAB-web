import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { FormularyMetadata } from '../../../../Shared/helpers/formulary-metadata';
import { ICreateEmpresaDto } from '../../dto/icreate-empresa.dto';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { UpdateCreateDialogActionsComponent } from '../../../../Shared/components/update-create-dialog-actions/update-create-dialog-actions.component';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { FileInputComponent } from '../../../../Shared/components/file-input/file-input.component';
import { ProveedorService } from '../../services/proveedor.service';
import { MatRadioModule } from '@angular/material/radio';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { provideMomentDateAdapter } from '@angular/material-moment-adapter';
import moment from 'moment';

@Component({
	selector: 'app-proveedor-form',
	standalone: true,
	imports: [
		MatDialogModule,
		MatButtonModule,
		MatFormFieldModule,
		MatInputModule,
		MatRadioModule,
		MatDatepickerModule,
		UpdateCreateDialogActionsComponent,
		ReactiveFormsModule,
		FileInputComponent,
	],
	templateUrl: './empresa-form-dialog.component.html',
	styleUrl: './empresa-form-dialog.component.scss',
	changeDetection: ChangeDetectionStrategy.OnPush,
	providers: [
		provideMomentDateAdapter({
			parse: { dateInput: 'DD/MM/YYYY' },
			display: {
				dateInput: 'DD/MM/YYYY',
				monthYearLabel: 'MMM YYYY',
				dateA11yLabel: 'DD/MM/YYYY',
				monthYearA11yLabel: 'MMMM YYYY',
			},
		}),
	],
})
export class EmpresaFormComponent
	extends FormularyMetadata<EmpresaFormComponent, ICreateEmpresaDto>
	implements OnInit
{
	proveedorForm: FormGroup = new FormGroup({
		nombre: new FormControl(this.isUpdate ? this.data.entity.nombre : ''),
		telefono: new FormControl(
			this.isUpdate ? this.data.entity.telefono : ''
		),
		tipoLicencia: new FormControl(
			this.isUpdate ? this.data.entity.tipoLicencia : 0
		),
		rnc: new FormControl(this.isUpdate ? this.data.entity.rnc : ''),
		numeracion: new FormControl(
			this.isUpdate ? this.data.entity.numeracion : ''
		),
		fechaEmision: new FormControl(
			this.isUpdate ? moment(this.data.entity.fechaEmision) : ''
		),
		fechaVencimiento: new FormControl(
			this.isUpdate ? moment(this.data.entity.fechaVencimiento) : ''
		),
	});

	file: string = '';

	constructor(
		protected dialogRef: MatDialogRef<EmpresaFormComponent>,
		private _proveedorService: ProveedorService
	) {
		super(dialogRef);
	}

	ngOnInit(): void {
		throw new Error('Method not implemented.');
	}

	onFileUploaded(event: string): void {
		this.file = event;
	}

	override onSave(event: any): void {
		const proveedor: ICreateEmpresaDto = {
			nombre: this.proveedorForm.get('nombre')?.value,
			telefono: this.proveedorForm.get('telefono')?.value,
			rnc: this.proveedorForm.get('rnc')?.value,
			numeracion: this.proveedorForm.get('numeracion')?.value,
			tipoLicencia: this.proveedorForm.get('tipoLicencia')?.value,
			archivo: this.file,
			fechaEmision: this.proveedorForm.get('fechaEmision')?.value,
			fechaVencimiento: this.proveedorForm.get('fechaVencimiento')?.value,
		};

		this._proveedorService
			.create<ICreateEmpresaDto>(proveedor)
			.subscribe((res) => {
				this.dialogRef.close(res);
			});
	}

	override onUpdate(event: any): void {
		throw new Error('Method not implemented.');
	}
}
