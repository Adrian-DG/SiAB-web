import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import {
	MAT_DIALOG_DATA,
	MatDialog,
	MatDialogModule,
} from '@angular/material/dialog';

@Component({
	selector: 'app-confirm-dialog',
	standalone: true,
	imports: [MatDialogModule],
	template: `
		<div>
			<h2>Confirmar acción</h2>
			<p>
				{{ data.action }}, esta seguro de realizar la siguiente acción
				?.
			</p>
		</div>
	`,
	styleUrl: './confirm-dialog.component.scss',
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ConfirmDialogComponent {
	data: any = inject(MAT_DIALOG_DATA);
}
