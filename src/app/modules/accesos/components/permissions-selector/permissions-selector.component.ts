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
		const index = this.markedPermissions.indexOf(permissionId);
		index === -1
			? this.markedPermissions.push(permissionId)
			: this.markedPermissions.splice(index, 1);
		this.markPermissionEvent.emit(this.markedPermissions);
	}
}
