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
import { INamedEntity } from '../../../../Shared/Models/inamed-entity.model';
import { MatDialog } from '@angular/material/dialog';
import { CalibreService } from '../../services/calibre.service';
import { IPagedData } from '../../../../Shared/Models/ipaged-data.model';

@Component({
	selector: 'app-calibres',
	standalone: true,
	imports: [MatTableModule, PageIntroComponent, PagePaginatorComponent],
	templateUrl: './calibres.page.component.html',
	styleUrl: './calibres.page.component.scss',
	changeDetection: ChangeDetectionStrategy.OnPush,
	providers: [CalibreService],
	schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class CalibresPageComponent
	extends BaseListResource<INamedEntity>
	implements AfterViewInit
{
	override title: string = 'Calibres';
	override description: string = 'Listado de calibres';
	override displayedColumns: string[] = ['id', 'nombre', 'actions'];

	constructor(
		protected override _confirmDialog: MatDialog,
		private _calibreService: CalibreService
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
		this._calibreService
			.get<INamedEntity>(this.filters$())
			.subscribe((response: IPagedData<INamedEntity>) => {
				this.records$.set(response.rows);
				this.totalCount$.set(response.totalCount);
			});
	}
}
