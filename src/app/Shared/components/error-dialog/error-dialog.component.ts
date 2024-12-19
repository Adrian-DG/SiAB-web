import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';

@Component({
	selector: 'app-error-dialog',
	standalone: true,
	imports: [MatDialogModule, MatIconModule, MatButtonModule],
	template: `
		<h2 mat-dialog-title>Error</h2>
		<mat-dialog-content class="content">
			<mat-icon>error</mat-icon>
			<p>{{ data.message }}</p>
		</mat-dialog-content>
		<mat-dialog-actions>
			<button mat-flat-button mat-dialog-close class="button">Ok</button>
		</mat-dialog-actions>
	`,
	styleUrl: './error-dialog.component.scss',
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ErrorDialogComponent {
	data: { message: string } = inject(MAT_DIALOG_DATA);
}
