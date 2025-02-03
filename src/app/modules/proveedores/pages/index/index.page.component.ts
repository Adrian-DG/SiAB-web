import {
	AfterViewInit,
	ChangeDetectionStrategy,
	Component,
	CUSTOM_ELEMENTS_SCHEMA,
} from '@angular/core';
import { BaseListResource } from '../../../../Shared/helpers/base-list-resource.metadata';
import { IUpdateEntityDto } from '../../../mantenimientos/dtos/iupdate-entity.dto';
import { MatDialog } from '@angular/material/dialog';
import { MatTableModule } from '@angular/material/table';
import { MatCardModule } from '@angular/material/card';
import { PageIntroComponent } from '../../../../Shared/components/page-intro/page-intro.component';
import { PagePaginatorComponent } from '../../../../Shared/components/page-paginator/page-paginator.component';
import { CrudActionsComponent } from '../../../../Shared/components/crud-actions/crud-actions.component';
import { IProveedorModel } from '../../models/iproveedor.model';
import { ProveedorService } from '../../services/proveedor.service';
import { IPagedData } from '../../../../Shared/Models/ipaged-data.model';

@Component({
	selector: 'app-index.page',
	standalone: true,
	imports: [
		MatTableModule,
		MatCardModule,
		PageIntroComponent,
		PagePaginatorComponent,
		CrudActionsComponent,
	],
	templateUrl: './index.page.component.html',
	styleUrl: './index.page.component.scss',
	changeDetection: ChangeDetectionStrategy.OnPush,
	schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class IndexPageComponent
	extends BaseListResource<IProveedorModel>
	implements AfterViewInit
{
	override title: string = 'Proveedores';
	override description: string = 'Listado de proveedores';
	override displayedColumns: string[] = [
		'id',
		'nombre',
		'telefono',
		'acciones',
	];

	constructor(
		protected override _dialog: MatDialog,
		private _proveedorService: ProveedorService
	) {
		super(_dialog);
	}

	ngAfterViewInit(): void {
		this.onLoadData();
	}

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
		this._proveedorService
			.get<IProveedorModel>(this.filters$())
			.subscribe((data: IPagedData<IProveedorModel>) => {
				this.records$.set(data.rows);
				this.totalCount$.set(data.totalCount);
			});
	}
}
