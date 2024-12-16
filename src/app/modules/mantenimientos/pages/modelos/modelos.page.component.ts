import {
	AfterViewInit,
	ChangeDetectionStrategy,
	Component,
	CUSTOM_ELEMENTS_SCHEMA,
} from '@angular/core';
import { BaseListResource } from '../../../../Shared/helpers/base-list-resource.metadata';
import { PageEvent } from '@angular/material/paginator';
import { IModeloDetail } from '../../models/imodelo-detail.model';
import { ModelosService } from '../../services/modelos.service';
import { IPagedData } from '../../../../Shared/Models/ipaged-data.model';
import { PageIntroComponent } from '../../../../Shared/components/page-intro/page-intro.component';
import { PagePaginatorComponent } from '../../../../Shared/components/page-paginator/page-paginator.component';
import { MatCardModule } from '@angular/material/card';
import { MatTableModule } from '@angular/material/table';

@Component({
	selector: 'app-modelos.page',
	standalone: true,
	imports: [
		PageIntroComponent,
		PagePaginatorComponent,
		MatCardModule,
		MatTableModule,
	],
	templateUrl: './modelos.page.component.html',
	styleUrl: './modelos.page.component.scss',
	changeDetection: ChangeDetectionStrategy.OnPush,
	providers: [ModelosService],
	schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class ModelosPageComponent
	extends BaseListResource<IModeloDetail>
	implements AfterViewInit
{
	override title: string = 'Modelos';
	override description: string = 'Listado de modelos';
	override displayedColumns: string[] = ['id', 'nombre', 'marca', 'acciones'];

	constructor(private _modelosService: ModelosService) {
		super();
	}

	ngAfterViewInit(): void {
		this.onLoadData();
	}

	override onDelete(event: any): void {
		throw new Error('Method not implemented.');
	}

	override onLoadData(): void {
		this._modelosService
			.get<IModeloDetail>(this.filters$())
			.subscribe((response: IPagedData<IModeloDetail>) => {
				this.records$.set(response.rows);
				this.totalCount$.set(response.totalCount);
			});
	}
}
