import {
	AfterViewInit,
	ChangeDetectionStrategy,
	Component,
	CUSTOM_ELEMENTS_SCHEMA,
} from '@angular/core';
import { BaseListResource } from '../../../../Shared/helpers/base-list-resource.metadata';
import { INamedEntity } from '../../../../Shared/Models/inamed-entity.model';
import { MatDialog } from '@angular/material/dialog';
import { TipoService } from '../../services/tipo.service';
import { IPagedData } from '../../../../Shared/Models/ipaged-data.model';
import { MatTableModule } from '@angular/material/table';
import { PageIntroComponent } from '../../../../Shared/components/page-intro/page-intro.component';
import { PagePaginatorComponent } from '../../../../Shared/components/page-paginator/page-paginator.component';
import { ITipoDetail } from '../../models/itipo-detail.model';

@Component({
	selector: 'app-tipos.page',
	standalone: true,
	imports: [MatTableModule, PageIntroComponent, PagePaginatorComponent],
	templateUrl: './tipos.page.component.html',
	styleUrl: './tipos.page.component.scss',
	changeDetection: ChangeDetectionStrategy.OnPush,
	providers: [TipoService],
	schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class TiposPageComponent
	extends BaseListResource<INamedEntity>
	implements AfterViewInit
{
	override title: string = 'Tipos';
	override description: string = 'Listado de tipos';
	override displayedColumns: string[] = [
		'id',
		'nombre',
		'categoria',
		'acciones',
	];

	constructor(
		protected override _confirmDialog: MatDialog,
		private _tiposService: TipoService
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

	override onLoadData(): void {
		this._tiposService
			.get<ITipoDetail>(this.filters$())
			.subscribe((response: IPagedData<ITipoDetail>) => {
				this.records$.set(response.rows);
				this.totalCount$.set(response.totalCount);
			});
	}
}
