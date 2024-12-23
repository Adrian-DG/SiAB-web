import {
	AfterViewInit,
	ChangeDetectionStrategy,
	Component,
	CUSTOM_ELEMENTS_SCHEMA,
} from '@angular/core';
import { MatTableModule } from '@angular/material/table';
import { PageIntroComponent } from '../../../../Shared/components/page-intro/page-intro.component';
import { PagePaginatorComponent } from '../../../../Shared/components/page-paginator/page-paginator.component';
import { BaseListResource } from '../../../../Shared/helpers/base-list-resource.metadata';
import { MatDialog } from '@angular/material/dialog';
import { IFuncionDetail } from '../../models/ifuncion-detail.model';
import { FuncionesService } from '../../services/funciones.service';
import { IPagedData } from '../../../../Shared/Models/ipaged-data.model';

@Component({
	selector: 'app-funciones.page',
	standalone: true,
	imports: [MatTableModule, PageIntroComponent, PagePaginatorComponent],
	templateUrl: './funciones.page.component.html',
	styleUrl: './funciones.page.component.scss',
	changeDetection: ChangeDetectionStrategy.OnPush,
	providers: [FuncionesService],
	schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class FuncionesPageComponent
	extends BaseListResource<IFuncionDetail>
	implements AfterViewInit
{
	override title: string = 'Funciones';
	override description: string = 'Listado de funciones';
	override displayedColumns: string[] = [
		'id',
		'nombre',
		'dependencia',
		'acciones',
	];

	constructor(
		protected override _confirmDialog: MatDialog,
		private _funcionesService: FuncionesService
	) {
		super(_confirmDialog);
	}

	ngAfterViewInit(): void {
		this.onLoadData();
	}

	override onEdit(event: any): void {
		throw new Error('Method not implemented.');
	}

	override onDelete(event: any): void {
		throw new Error('Method not implemented.');
	}

	override onCreate(event: any): void {
		throw new Error('Method not implemented.');
	}

	override onLoadData(): void {
		this._funcionesService
			.get<IFuncionDetail>(this.filters$())
			.subscribe((response: IPagedData<IFuncionDetail>) => {
				this.records$.set(response.rows);
				this.totalCount$.set(response.totalCount);
			});
	}
}
