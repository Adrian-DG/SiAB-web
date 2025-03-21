import { ChangeDetectionStrategy, Component } from '@angular/core';
import { BaseListResource } from '../../../../Shared/helpers/base-list-resource.metadata';
import { IUpdateEntityDto } from '../../../mantenimientos/dtos/iupdate-entity.dto';
import { MatDialog } from '@angular/material/dialog';

@Component({
	selector: 'app-index.page',
	standalone: true,
	imports: [],
	template: `<p>index.page works!</p>`,
	styleUrl: './index.page.component.scss',
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class IndexPageComponent extends BaseListResource<any> {
	constructor(protected override _dialog: MatDialog) {
		super(_dialog);
	}
	override title: string = 'Transacciones';
	override description: string = 'Listado de transacciones';
	override displayedColumns: string[] = [
		'id',
		'name',
		'description',
		'actions',
	];
	override onEdit(event: IUpdateEntityDto<any>): void {
		throw new Error('Method not implemented.');
	}
	override onDelete(event: number): void {
		throw new Error('Method not implemented.');
	}
	override onCreate(event: any): void {
		throw new Error('Method not implemented.');
	}
	override onLoadData(): void {
		throw new Error('Method not implemented.');
	}
}
