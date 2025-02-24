import {
	AfterViewInit,
	ChangeDetectionStrategy,
	Component,
	CUSTOM_ELEMENTS_SCHEMA,
} from '@angular/core';
import { BaseListResource } from '../../../../Shared/helpers/base-list-resource.metadata';
import { ISerieDetail } from '../../models/iserie-detail.model';
import { MatDialog } from '@angular/material/dialog';
import { SerieService } from '../../services/serie.service';
import { IPagedData } from '../../../../Shared/Models/ipaged-data.model';
import { PageIntroComponent } from '../../../../Shared/components/page-intro/page-intro.component';
import { PagePaginatorComponent } from '../../../../Shared/components/page-paginator/page-paginator.component';
import { MatTableModule } from '@angular/material/table';
import { map } from 'rxjs';
import { IApiResponse } from '../../../../Shared/Models/iapi-response.model';

@Component({
	selector: 'app-serie.page',
	standalone: true,
	imports: [MatTableModule, PageIntroComponent, PagePaginatorComponent],
	templateUrl: './series.page.component.html',
	styleUrl: './series.page.component.scss',
	changeDetection: ChangeDetectionStrategy.OnPush,
	providers: [SerieService],
	schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class SeriePageComponent
	extends BaseListResource<ISerieDetail>
	implements AfterViewInit
{
	override title: string = 'Series';
	override description: string = 'Listado de series';
	override displayedColumns: string[] = [
		'id',
		'serie',
		'articulo',
		'propiedad',
		'comentario',
		'acciones',
	];

	constructor(
		protected override _dialog: MatDialog,
		private _serieService: SerieService
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
		this._serieService
			.get<ISerieDetail>(this.filters$())
			.subscribe((response: IPagedData<ISerieDetail>) => {
				this.data$.set(response);
			});
	}
}
