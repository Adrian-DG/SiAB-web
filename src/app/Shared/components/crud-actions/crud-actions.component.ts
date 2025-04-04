import {
	ChangeDetectionStrategy,
	Component,
	EventEmitter,
	Input,
	Output,
} from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { IUpdateEntityDto } from '../../../modules/mantenimientos/dtos/iupdate-entity.dto';

@Component({
	selector: 'app-crud-actions',
	standalone: true,
	imports: [MatButtonModule, MatIconModule],
	template: `
		<div class="crud-actions">
			@if(showEdit) {
			<button
				mat-icon-button
				color="primary"
				(click)="onEdit(id, entity)"
			>
				<mat-icon>edit</mat-icon>
			</button>
			} @if(showDetails) {
			<button mat-icon-button color="warn" (click)="onDetails(id)">
				<mat-icon>remove_red_eye</mat-icon>
			</button>

			} @if(showFileUpload) {
			<button mat-icon-button color="primary" (click)="onFileUpload(id)">
				<mat-icon>upload_file</mat-icon>
			</button>
			} @if(showDelete) {
			<button mat-icon-button color="warn" (click)="onDelete(id)">
				<mat-icon>delete</mat-icon>
			</button>
			}
		</div>
	`,
	styleUrl: './crud-actions.component.scss',
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CrudActionsComponent {
	@Input() id!: number;
	@Input() entity!: any;
	@Input() showDetails: boolean = false;
	@Input() showEdit: boolean = true;
	@Input() showDelete: boolean = true;
	@Input() showFileUpload: boolean = false;
	@Output('on-delete') deleteEvent = new EventEmitter<number>();
	@Output('on-edit') editEvent = new EventEmitter<IUpdateEntityDto<any>>();
	@Output('on-details') detailsEvent = new EventEmitter<number>();
	@Output('on-upload-file') fileUploadEvent = new EventEmitter<any>();

	onDelete(id: number) {
		this.deleteEvent.emit(id);
	}

	onEdit(id: number, entity: any) {
		this.editEvent.emit({ id, entity });
	}

	onDetails(id: number) {
		this.detailsEvent.emit(id);
	}

	onFileUpload(id: number) {
		this.fileUploadEvent.emit(id);
	}
}
