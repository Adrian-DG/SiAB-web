import {
	ChangeDetectionStrategy,
	Component,
	inject,
	Inject,
	OnInit,
} from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import {
	MAT_DIALOG_DATA,
	MatDialog,
	MatDialogModule,
	MatDialogRef,
} from '@angular/material/dialog';
import { MatDividerModule } from '@angular/material/divider';
import { DomSanitizer } from '@angular/platform-browser';
import { IAdjuntarFormularioDto } from '../../../carga-registros/dto/iadjuntar-formulario.dto';
import { FileInputComponent } from '../../../../Shared/components/file-input/file-input.component';
import { MatTabsModule } from '@angular/material/tabs';

@Component({
	selector: 'app-report-53-dialog',
	standalone: true,
	imports: [
		MatDialogModule,
		MatButtonModule,
		MatDividerModule,
		MatTabsModule,
		FileInputComponent,
	],
	template: `
		<h1 mat-dialog-title>Formulario 53</h1>
		<mat-divider></mat-divider>
		<div mat-dialog-content class="dialog-content">
			<mat-tab-group>
				<mat-tab label="Vista Previa">
					<iframe
						[src]="data.url"
						frameborder="0"
						width="600"
						height="800"
					></iframe>
				</mat-tab>
				<mat-tab label="Formulario 53">
					<app-file-input
						(on-file-upluoded)="onFileUploaded($event)"
					></app-file-input>
				</mat-tab>
			</mat-tab-group>
		</div>
		<div mat-dialog-actions>
			<button mat-button (click)="closeDialog()">Guardar</button>
		</div>
	`,
	styleUrl: './report-53-dialog.component.scss',
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Report53DialogComponent {
	file: any;

	constructor(
		@Inject(MAT_DIALOG_DATA) public data: IAdjuntarFormularioDto,
		private _dialog: MatDialogRef<Report53DialogComponent>
	) {}

	onFileUploaded(event: any): void {
		this.file = event;
	}

	closeDialog(): void {
		this._dialog.close({ file: this.file });
	}
}
