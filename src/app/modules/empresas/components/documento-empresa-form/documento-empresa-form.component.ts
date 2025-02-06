import {
	ChangeDetectionStrategy,
	Component,
	EventEmitter,
	Input,
	Output,
} from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FileInputComponent } from '../../../../Shared/components/file-input/file-input.component';
import { IDocumentoEmpresaModel } from '../../models/idocumento-empresa.model';
import { FormsModule } from '@angular/forms';

@Component({
	selector: 'app-documento-empresa-form',
	standalone: true,
	imports: [
		MatButtonModule,
		MatFormFieldModule,
		MatInputModule,
		MatDatepickerModule,
		FileInputComponent,
		FormsModule,
	],
	templateUrl: './documento-empresa-form.component.html',
	styleUrl: './documento-empresa-form.component.scss',
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DocumentoEmpresaFormComponent {
	@Input() context!: string;
	@Input('tipo-documento') tipoDocumento!: number;
	@Output('on-info-sent') onInfoSentEvent = new EventEmitter<{
		context: string;
		data: IDocumentoEmpresaModel;
	}>();
	documentoInfo: IDocumentoEmpresaModel = {
		tipo: this.tipoDocumento,
		numeracion: '',
		fechaEmision: new Date(),
		fechaVigencia: new Date(),
		fechaVencimiento: new Date(),
		archivo: null,
	};

	get tipoDocumentoString(): string {
		const fileTypes: { [key: number]: string } = {
			3: 'Licencia',
			4: 'Autorización Importación',
			5: 'Autorización Retiro Aduanal',
		};

		return fileTypes[this.tipoDocumento];
	}

	onFileSelected(event: string[]): void {
		this.documentoInfo.archivo = event[0];
		this.onInfoSentEvent.emit({
			context: this.context,
			data: this.documentoInfo,
		});
	}
}
