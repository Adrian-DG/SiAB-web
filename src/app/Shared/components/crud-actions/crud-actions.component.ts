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
			<button
				mat-icon-button
				color="primary"
				(click)="onEdit(id, entity)"
			>
				<mat-icon>edit</mat-icon>
			</button>
			<button mat-icon-button color="warn" (click)="onDelete(id)">
				<mat-icon>delete</mat-icon>
			</button>
		</div>
	`,
	styleUrl: './crud-actions.component.scss',
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CrudActionsComponent {
	@Input() id!: number;
	@Input() entity!: any;
	@Output('on-delete') deleteEvent = new EventEmitter<number>();
	@Output('on-edit') editEvent = new EventEmitter<IUpdateEntityDto<any>>();

	onDelete(id: number) {
		this.deleteEvent.emit(id);
	}

	onEdit(id: number, entity: any) {
		this.editEvent.emit({ id, entity });
	}
}
