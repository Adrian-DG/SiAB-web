import {
	ChangeDetectionStrategy,
	Component,
	CUSTOM_ELEMENTS_SCHEMA,
} from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import { RouterModule } from '@angular/router';
import { BaseListResource } from '../../../../Shared/helpers/base-list-resource.metadata';
import { IUpdateEntityDto } from '../../../mantenimientos/dtos/iupdate-entity.dto';
import { MatDialog } from '@angular/material/dialog';
import { MatCardModule } from '@angular/material/card';
import { CommonModule } from '@angular/common';
import { PageIntroComponent } from '../../../../Shared/components/page-intro/page-intro.component';
import { ModuleIndexPageComponent } from '../../../../Shared/pages/module-index/module-index.page.component';

@Component({
	selector: 'app-orders',
	standalone: true,
	imports: [
		RouterModule,
		MatTableModule,
		MatCardModule,
		MatButtonModule,
		MatIconModule,
		CommonModule,
		PageIntroComponent,
		ModuleIndexPageComponent,
	],
	templateUrl: './orders.page.html',
	styleUrl: './orders.page.scss',
	changeDetection: ChangeDetectionStrategy.OnPush,
	schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class OrdersComponent extends BaseListResource<any> {
	constructor(protected override _dialog: MatDialog) {
		super(_dialog);
	}

	override title: string = 'Ordenes';
	override description: string = 'Listado de ordenes';
	override displayedColumns: string[] = ['id', 'Fecha', 'actions'];

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
