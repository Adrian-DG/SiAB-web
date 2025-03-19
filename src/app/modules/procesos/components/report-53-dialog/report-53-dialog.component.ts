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

@Component({
	selector: 'app-report-53-dialog',
	standalone: true,
	imports: [MatDialogModule, MatButtonModule, MatDividerModule],
	template: `
		<h1 mat-dialog-title>Formulario 53</h1>
		<mat-divider></mat-divider>
		<div mat-dialog-content class="dialog-content">
			<iframe
				[src]="data.url"
				frameborder="0"
				width="600"
				height="800"
			></iframe>
		</div>
		<div mat-dialog-actions>
			<button mat-button mat-dialog-close>Cerrar</button>
		</div>
	`,
	styleUrl: './report-53-dialog.component.scss',
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Report53DialogComponent {
	constructor(
		@Inject(MAT_DIALOG_DATA) public data: IAdjuntarFormularioDto,
		private _dialog: MatDialogRef<Report53DialogComponent>
	) {}
}
