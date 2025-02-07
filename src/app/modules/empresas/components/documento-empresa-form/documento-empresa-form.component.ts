import {
	ChangeDetectionStrategy,
	Component,
	EventEmitter,
	Input,
	OnChanges,
	Output,
	SimpleChanges,
} from '@angular/core';
import { MatButtonModule, MatIconButton } from '@angular/material/button';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FileInputComponent } from '../../../../Shared/components/file-input/file-input.component';
import { IDocumentoEmpresaModel } from '../../models/idocumento-empresa.model';
import { FormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';

@Component({
	selector: 'app-documento-empresa-form',
	standalone: true,
	imports: [
		MatButtonModule,
		MatFormFieldModule,
		MatInputModule,
		MatDatepickerModule,
		MatIconModule,
		FormsModule,
	],
	templateUrl: './documento-empresa-form.component.html',
	styleUrl: './documento-empresa-form.component.scss',
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DocumentoEmpresaFormComponent implements OnChanges {
	@Input('context') context!: string;
	@Input('tipo-documento') tipoDocumento!: number;
	@Output('on-info-sent') onInfoSentEvent = new EventEmitter<{
		context: string;
		data: IDocumentoEmpresaModel;
	}>();

	documentoInfo: IDocumentoEmpresaModel = {
		tipo: 0,
		numeracion: '',
		fechaEmision: new Date(),
		fechaVigencia: new Date(),
		fechaVencimiento: new Date(),
	};

	ngOnChanges(changes: SimpleChanges): void {
		this.documentoInfo.tipo = changes['tipoDocumento'].currentValue;
	}

	onInfoSent() {
		this.onInfoSentEvent.emit({
			context: this.context,
			data: this.documentoInfo,
		});
	}
}
