import {
	ChangeDetectionStrategy,
	Component,
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
	data: { action: 'Eliminar' | 'Actualizar' } = inject(MAT_DIALOG_DATA);
	constructor(private _dialogRef: MatDialogRef<ConfirmDialogComponent>) {}

	onOptionSelected(cond: boolean) {
		this._dialogRef.close(cond);
	}
}
