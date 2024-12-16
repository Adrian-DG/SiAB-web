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
	title = 'Marcas';
	description = 'mantenimiento de marcas.';
	displayedColumns: string[] = ['id', 'marca', 'acciones'];

	@ViewChild(MatPaginator) paginator!: MatPaginator;

	constructor(private _marcasService: MarcaService) {
		super();
	}

	ngAfterViewInit(): void {
		this.onLoadData();
	}

	override onSearch(event: string): void {
		this.filters$.set({
			page: 1,
			size: 10,
			searchTerm: event,
		});

		this.onLoadData();
	}

	override onPaginate(event: PageEvent): void {
		this.filters$.set({
			page: event.pageIndex + 1,
			size: event.pageSize,
			searchTerm: this.filters$().searchTerm,
		});

		this.onLoadData();
	}

	override onDelete(event: any): void {
		throw new Error('Method not implemented.');
	}

	override onLoadData(): void {
		this._marcasService
			.get(this.filters$())
			.subscribe((response: IPagedData<INamedEntity>) => {
				this.records$.set(response.rows);
				this.totalCount$.set(response.totalCount);
			});
	}
}
