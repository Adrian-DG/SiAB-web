import {
	ChangeDetectionStrategy,
	Component,
	inject,
	OnInit,
	signal,
} from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import {
	MAT_DIALOG_DATA,
	MatDialogModule,
	MatDialogRef,
} from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { FileInputComponent } from '../../../../Shared/components/file-input/file-input.component';
import { TiposDocumentosService } from '../../../mantenimientos/services/tipos-documentos.service';
import { INamedEntity } from '../../../../Shared/Models/inamed-entity.model';
import { FormsModule } from '@angular/forms';

@Component({
	selector: 'app-adjuntar-documento-dialog',
	standalone: true,
	imports: [
		MatDialogModule,
		MatFormFieldModule,
		MatInputModule,
		MatSelectModule,
		MatButtonModule,
		FormsModule,
		FileInputComponent,
	],
	template: `
		<h2 mat-dialog-title>Adjuntar Documento</h2>
		<mat-dialog-content style="width: 100%;">
			<mat-form-field appearance="fill">
				<mat-label>Nombre del Documento</mat-label>
				<mat-select [(ngModel)]="tipoDocumentoId">
					@for(documento of documentos$(); track $index) {
					<mat-option [value]="documento.id">{{
						documento.nombre
					}}</mat-option>
					}
				</mat-select>
			</mat-form-field>

			<mat-form-field appearance="fill">
				<mat-label>Numeración</mat-label>
				<input matInput [(ngModel)]="numeracion" />
			</mat-form-field>

			<app-file-input
				[title]="'Seleccionar Archivo'"
				[fileType]="'application/pdf'"
				(on-file-upluoded)="onFileUploaded($event)"
			></app-file-input>
		</mat-dialog-content>
		<mat-dialog-actions align="end">
			<button mat-stroked-button mat-dialog-close>Cancelar</button>
			<button mat-flat-button (click)="onSubmit()">Subir Archivo</button>
		</mat-dialog-actions>
	`,
	styleUrl: './adjuntar-documento-dialog.component.scss',
	changeDetection: ChangeDetectionStrategy.OnPush,
	providers: [TiposDocumentosService],
})
export class AdjuntarDocumentoDialogComponent implements OnInit {
	tipoDocumentoId: number = 0;
	numeracion: string | null = null;
	archivo: string | null = null;

	// Using signal for better performance and reactivity
	documentos$ = signal<INamedEntity[]>([]);

	data: { id: number } = inject(MAT_DIALOG_DATA);

	constructor(
		private _tipoDocumentoService: TiposDocumentosService,
		private _dialogRef: MatDialogRef<AdjuntarDocumentoDialogComponent>
	) {}

	ngOnInit(): void {
		this._tipoDocumentoService
			.getAllResource<INamedEntity>()
			.subscribe((response) => {
				this.documentos$.set(response);
			});
	}

	onFileUploaded(file: string) {
		this.archivo = file === null || file === '' ? null : file;
	}

	onSubmit() {
		this._dialogRef.close({
			id: this.data.id,
			tipoDocumentoId: this.tipoDocumentoId,
			numeracion: this.numeracion,
			archivo: this.archivo,
		});
	}
}
