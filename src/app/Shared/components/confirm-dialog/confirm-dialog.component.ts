import {
	ChangeDetectionStrategy,
	Component,
	Inject,
	inject,
	OnInit,
} from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import {
	MAT_DIALOG_DATA,
	MatDialog,
	MatDialogModule,
	MatDialogRef,
} from '@angular/material/dialog';

export interface IConfirmDialogData {
	action: 'Eliminar' | 'Actualizar';
}

@Component({
	selector: 'app-confirm-dialog',
	standalone: true,
	imports: [MatDialogModule, MatButtonModule],
	template: `
		<h2 mat-dialog-title>Confirmar acción</h2>
		<div mat-dialog-content>
			<p>
				{{ data.action }}, ¿está seguro de realizar la siguiente acción?
			</p>
		</div>
		<div mat-dialog-actions>
			<button mat-button (click)="onOptionSelected(false)">
				Cancelar
			</button>
			<button mat-flat-button (click)="onOptionSelected(true)">
				Aceptar
			</button>
		</div>
	`,
	styleUrl: './confirm-dialog.component.scss',
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ConfirmDialogComponent {
	constructor(
		private _dialogRef: MatDialogRef<ConfirmDialogComponent>,
		@Inject(MAT_DIALOG_DATA) public data: IConfirmDialogData
	) {}

	onOptionSelected(cond: boolean) {
		this._dialogRef.close(cond);
	}
}
