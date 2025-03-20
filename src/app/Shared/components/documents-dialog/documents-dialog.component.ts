import { ChangeDetectionStrategy, Component, Inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
	selector: 'app-documents-dialog',
	standalone: true,
	imports: [MatDialogModule, MatButtonModule, MatTableModule, MatIconModule],
	template: `
		<h1 mat-dialog-title>Documentos</h1>
		<div mat-dialog-content>
			<div class="row">
				<div class="col-4">
					<iframe frameborder="0"></iframe>
				</div>
				<div class="col-8">
					<table
						mat-table
						[dataSource]="data.documents"
						class="mat-elevation-z8"
					>
						<ng-container matColumnDef="info">
							<th mat-header-cell *matHeaderCellDef>Info</th>
							<td mat-cell *matCellDef="let element">
								{{ element.position }}
							</td>
						</ng-container>

						<!-- Name Column -->
						<ng-container matColumnDef="actions">
							<th mat-header-cell *matHeaderCellDef>Acciones</th>
							<td mat-cell *matCellDef="let element">
								<button
									mat-button
									(click)="onDocumentClick(element)"
								>
									<mat-icon>visibility</mat-icon>
								</button>
							</td>
						</ng-container>

						<tr mat-header-row *matHeaderRowDef="columns"></tr>
						<tr mat-row *matRowDef="let row; columns: columns"></tr>
					</table>
				</div>
			</div>
		</div>
		<div mat-dialog-actions>
			<button mat-button>Cancelar</button>
		</div>
	`,
	styleUrl: './documents-dialog.component.scss',
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DocumentsDialogComponent {
	columns = ['Info', 'actions'];
	constructor(
		@Inject(MAT_DIALOG_DATA) public data: { documents: any[] },
		private _domSanitizer: DomSanitizer
	) {}

	onDocumentClick(item: any) {
		const iframe = document.getElementById(
			'iframe'
		) as HTMLIFrameElement | null;
		if (iframe) {
			iframe.src = this._domSanitizer.bypassSecurityTrustResourceUrl(
				item.archivo
			) as string;
		}
	}
}
