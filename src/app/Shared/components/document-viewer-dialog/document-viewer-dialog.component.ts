import { ChangeDetectionStrategy, Component, Inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import {
	MAT_DIALOG_DATA,
	MatDialogModule,
	MatDialogRef,
} from '@angular/material/dialog';
import { MatDividerModule } from '@angular/material/divider';

@Component({
	selector: 'app-document-viewer-dialog',
	standalone: true,
	imports: [MatDialogModule, MatButtonModule, MatDividerModule],
	template: `
		<h1 mat-dialog-title>{{ data.title }}</h1>
		<mat-divider></mat-divider>
		<iframe
			[src]="data.url"
			frameborder="0"
			width="600"
			height="800"
		></iframe>
		<div mat-dialog-actions>
			<button mat-button mat-dialog-close>Cerrar</button>
		</div>
	`,
	styleUrl: './document-viewer-dialog.component.scss',
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DocumentViewerDialogComponent {
	file: any;

	constructor(
		@Inject(MAT_DIALOG_DATA) public data: { title: string; url: string },
		private _dialog: MatDialogRef<DocumentViewerDialogComponent>
	) {}
}
