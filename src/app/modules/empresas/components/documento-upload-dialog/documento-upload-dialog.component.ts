import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import {
	MAT_DIALOG_DATA,
	MatDialogModule,
	MatDialogRef,
} from '@angular/material/dialog';
import { DocumentoEmpresaFormComponent } from '../documento-empresa-form/documento-empresa-form.component';
import { OrdenesEmpresaService } from '../../services/ordenes-empresa.service';
import { ICreateDocumentoDto } from '../../dto/icreate-documento.dto';
import { DatePipe } from '@angular/common';
import { IDocumentoEmpresaModel } from '../../models/idocumento-empresa.model';

@Component({
	selector: 'app-documento-upload-dialog',
	standalone: true,
	imports: [MatDialogModule, MatButtonModule, DocumentoEmpresaFormComponent],
	template: `
		<h1 mat-dialog-title>Subir Documento</h1>
		<div mat-dialog-content>
			<app-documento-empresa-form
				[tipo-documento]="data.tipoDocumento"
				[context]="data.context"
				(on-info-sent)="onInfoSent($event)"
			>
			</app-documento-empresa-form>
		</div>
		<div mat-dialog-actions>
			<button mat-button (click)="dialogRef.close()">Cancelar</button>
			<button
				mat-flat-button
				(click)="onUpload()"
				[disabled]="isFormValid"
			>
				Subir
			</button>
		</div>
	`,
	styleUrl: './documento-upload-dialog.component.scss',
	changeDetection: ChangeDetectionStrategy.OnPush,
	providers: [OrdenesEmpresaService, DatePipe],
})
export class DocumentoUploadDialogComponent {
	data: { ordenId: number; tipoDocumento: number; context: string } =
		inject(MAT_DIALOG_DATA);
	datePipe = inject(DatePipe);
	documentoDto: ICreateDocumentoDto | null = null;

	constructor(
		public dialogRef: MatDialogRef<DocumentoUploadDialogComponent>,
		private _ordenesEmpresaService: OrdenesEmpresaService
	) {}

	get isFormValid(): boolean {
		return !this.documentoDto;
	}

	onInfoSent(event: { context: string; data: IDocumentoEmpresaModel }) {
		const fechaEmision = this.datePipe.transform(
			event.data.fechaEmision,
			'yyyy-MM-dd'
		);

		const fechaRecepcion = this.datePipe.transform(
			event.data.fechaVigencia,
			'yyyy-MM-dd'
		);

		const fechaExpiracion = this.datePipe.transform(
			event.data.fechaVencimiento,
			'yyyy-MM-dd'
		);

		this.documentoDto = {
			nombre: event.data.numeracion,
			tipoDocumentoId: event.data.tipoDocumentoId,
			archivo: event.data.archivo ?? '',
			fechaEmision: fechaEmision ?? '',
			fechaRecepcion: fechaRecepcion ?? '',
			fechaExpiracion: fechaExpiracion ?? '',
		};
	}

	onUpload() {
		this._ordenesEmpresaService
			.updateOrdenAdjuntarDocumento(
				this.data.ordenId,
				this.documentoDto as ICreateDocumentoDto
			)
			.subscribe(() => this.dialogRef.close());
	}
}
