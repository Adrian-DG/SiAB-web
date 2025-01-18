import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { LoadingService } from '../../Services/loading.service';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';

@Component({
	selector: 'app-loading-spinner',
	standalone: true,
	imports: [MatDialogModule, MatProgressSpinnerModule],
	template: `
		@if(_loadingService.isLoading$()) {
		<h5 mat-dialog-title>Por favor espere...</h5>
		<mat-dialog-content>
			<div class="loading-spinner-overlay">
				<div class="loading-spinner">
					<mat-spinner></mat-spinner>
				</div>
			</div>
		</mat-dialog-content>
		}
	`,
	styleUrl: './loading-spinner.component.scss',
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoadingSpinnerComponent {
	constructor(
		public _loadingService: LoadingService,
		private _dialogRef: MatDialogRef<LoadingSpinnerComponent>
	) {}
}
