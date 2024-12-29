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
import { ISubtipoDetail } from '../../models/isubtipo-detail.model';
import { MatDialog } from '@angular/material/dialog';
import { SubtipoService } from '../../services/subtipo.service';
import { IPagedData } from '../../../../Shared/Models/ipaged-data.model';

@Component({
	selector: 'app-subtipos.page',
	standalone: true,
	imports: [MatTableModule, PageIntroComponent, PagePaginatorComponent],
	templateUrl: './subtipos.page.component.html',
	styleUrl: './subtipos.page.component.scss',
	changeDetection: ChangeDetectionStrategy.OnPush,
	providers: [SubtipoService],
	schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class SubtiposPageComponent
	extends BaseListResource<ISubtipoDetail>
	implements AfterViewInit
{
	override title: string = 'Subtipos';
	override description: string = 'Listado de subtipos';
	override displayedColumns: string[] = ['id', 'nombre', 'tipo', 'acciones'];

	constructor(
		protected override _dialog: MatDialog,
		private _subTipoService: SubtipoService
	) {
		super(_dialog);
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
		this._subTipoService
			.get<ISubtipoDetail>(this.filters$())
			.subscribe((response: IPagedData<ISubtipoDetail>) => {
				this.records$.set(response.rows);
				this.totalCount$.set(response.totalCount);
			});
	}
}
