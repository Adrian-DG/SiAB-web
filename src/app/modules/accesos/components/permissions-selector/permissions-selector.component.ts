import {
	AfterViewInit,
	ChangeDetectionStrategy,
	Component,
	EventEmitter,
	Input,
	OnChanges,
	OnInit,
	Output,
	SimpleChanges,
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
export class PermissionsSelectorComponent implements OnInit, OnChanges {
	@Input() permissions: IPermissionModel[] = [];
	@Output('on-permission-saved') markPermissionEvent = new EventEmitter<
		number[]
	>();
	markedPermissions: number[] = [];

	ngOnInit(): void {
		console.log(
			'PermissionsSelectorComponent initialized: ',
			this.permissions
		);
	}

	ngOnChanges(changes: SimpleChanges): void {
		console.log('PermissionsSelectorComponent changes: ', changes);
		const checkedPermissions = (
			changes['permissions'].currentValue as IPermissionModel[]
		).filter((p) => p.checked);
		checkedPermissions.forEach((p) => this.onMarkPermission(p.id));
	}

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
