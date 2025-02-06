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
import { MatRadioModule } from '@angular/material/radio';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatStepperModule } from '@angular/material/stepper';
import { provideMomentDateAdapter } from '@angular/material-moment-adapter';
import moment from 'moment';
import { EmpresaService } from '../../services/empresa.service';
import { DocumentoEmpresaFormComponent } from '../documento-empresa-form/documento-empresa-form.component';
import { TipoDocumentoEnum } from '../../enums/tipo-documento.enum';
import { IDocumentoEmpresaModel } from '../../models/idocumento-empresa.model';
@Component({
	selector: 'app-proveedor-form',
	standalone: true,
	imports: [
		MatDialogModule,
		MatButtonModule,
		MatFormFieldModule,
		MatInputModule,
		MatDatepickerModule,
		MatStepperModule,
		ReactiveFormsModule,
		DocumentoEmpresaFormComponent,
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
export class EmpresaFormComponent implements OnInit {
	empresaForm: FormGroup = new FormGroup({
		nombre: new FormControl(''),
		telefono: new FormControl(''),
		titular: new FormControl(''),
		rnc: new FormControl(''),
	});

	filesInfo: { [key: string]: IDocumentoEmpresaModel } = {};

	constructor(
		private dialogRef: MatDialogRef<EmpresaFormComponent>,
		private _empresaService: EmpresaService
	) {}

	ngOnInit(): void {
		throw new Error('Method not implemented.');
	}

	get tipoDocumento(): typeof TipoDocumentoEnum {
		return TipoDocumentoEnum;
	}

	onInfoRecieved(event: {
		context: string;
		data: IDocumentoEmpresaModel;
	}): void {
		this.filesInfo[event.context] = event.data;
	}

	onSave(): void {
		const empresa: ICreateEmpresaDto = {
			nombre: this.empresaForm.get('nombre')?.value,
			telefono: this.empresaForm.get('telefono')?.value,
			rnc: this.empresaForm.get('rnc')?.value,
			titular: this.empresaForm.get('titular')?.value,
			dataArchivos: Object.values(this.filesInfo),
		};

		this._empresaService
			.create<ICreateEmpresaDto>(empresa)
			.subscribe((res) => {
				this.dialogRef.close(res);
			});
	}
}
