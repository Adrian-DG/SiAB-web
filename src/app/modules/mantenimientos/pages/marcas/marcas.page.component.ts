import {
	AfterViewInit,
	ChangeDetectionStrategy,
	Component,
	CUSTOM_ELEMENTS_SCHEMA,
	OnInit,
	ViewChild,
} from '@angular/core';
import { MatTableModule } from '@angular/material/table';
import { PageIntroComponent } from '../../../../Shared/components/page-intro/page-intro.component';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { PagePaginatorComponent } from '../../../../Shared/components/page-paginator/page-paginator.component';
import { BaseListResource } from '../../../../Shared/helpers/base-list-resource.metadata';
import { INamedEntity } from '../../../../Shared/Models/inamed-entity.model';
import { MarcaService } from '../../services/marca.service';
import { IPagedData } from '../../../../Shared/Models/ipaged-data.model';
import { MatDialog } from '@angular/material/dialog';

@Component({
	selector: 'app-marcas',
	standalone: true,
	imports: [PageIntroComponent, MatTableModule, PagePaginatorComponent],
	templateUrl: './marcas.page.component.html',
	styleUrl: './marcas.page.component.scss',
	changeDetection: ChangeDetectionStrategy.OnPush,
	schemas: [CUSTOM_ELEMENTS_SCHEMA],
	providers: [MarcaService],
})
export class MarcasPageComponent
	extends BaseListResource<INamedEntity>
	implements AfterViewInit
{
	override title: string = 'Marcas';
	override description: string = 'Listado de marcas';
	override displayedColumns: string[] = ['id', 'nombre', 'acciones'];

	@ViewChild(MatPaginator) paginator!: MatPaginator;

	constructor(
		protected override _confirmDialog: MatDialog,
		private _marcasService: MarcaService
	) {
		super(_confirmDialog);
	}

	ngAfterViewInit(): void {
		this.onLoadData();
	}

	override onDelete(event: any): void {
		throw new Error('Method not implemented.');
	}

	override onEdit(event: any): void {
		throw new Error('Method not implemented.');
	}

	override onLoadData(): void {
		this._marcasService
			.get<INamedEntity>(this.filters$())
			.subscribe((response: IPagedData<INamedEntity>) => {
				this.records$.set(response.rows);
				this.totalCount$.set(response.totalCount);
			});
	}
}
