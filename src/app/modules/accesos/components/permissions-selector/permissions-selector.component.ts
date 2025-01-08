import {
	ChangeDetectionStrategy,
	Component,
	EventEmitter,
	Input,
	Output,
} from '@angular/core';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatListModule } from '@angular/material/list';
import { IPermissionModel } from '../../models/ipermission.model';
import { MatDividerModule } from '@angular/material/divider';

@Component({
	selector: 'app-permissions-selector',
	standalone: true,
	imports: [MatCheckboxModule, MatListModule, MatDividerModule],
	templateUrl: './permissions-selector.component.html',
	styleUrl: './permissions-selector.component.scss',
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PermissionsSelectorComponent {
	@Input() permissions: IPermissionModel[] = [];
	@Output('on-permission-saved') markPermissionEvent = new EventEmitter<
		number[]
	>();
	markedPermissions: number[] = [];

	onMarkPermission(permissionId: number): void {
		if (this.markedPermissions.includes(permissionId)) {
			this.markedPermissions = this.markedPermissions.filter(
				(id) => id !== permissionId
			);
		} else {
			this.markedPermissions.push(permissionId);
		}
		this.markPermissionEvent.emit(this.markedPermissions);
	}
}
