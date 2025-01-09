import {
	ChangeDetectionStrategy,
	Component,
	EventEmitter,
	Input,
	Output,
} from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';

@Component({
	selector: 'app-update-create-dialog-actions',
	standalone: true,
	imports: [MatDialogModule, MatButtonModule],
	template: `
		<div mat-dialog-actions>
			<button mat-button mat-dialog-close>Cancelar</button>
			@if(isUpdate) {
			<button mat-flat-button (click)="onUpdateEvent()">
				Actualizar
			</button>
			}@else {
			<button mat-flat-button (click)="onSaveEvent()">Guardar</button>
			}
		</div>
	`,
	styleUrl: './update-create-dialog-actions.component.scss',
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UpdateCreateDialogActionsComponent {
	@Input() isUpdate!: boolean;

	@Output('on-save') saveEvent = new EventEmitter<void>();
	@Output('on-update') updateEvent = new EventEmitter<void>();

	onSaveEvent() {
		this.saveEvent.emit();
	}

	onUpdateEvent() {
		this.updateEvent.emit();
	}
}
