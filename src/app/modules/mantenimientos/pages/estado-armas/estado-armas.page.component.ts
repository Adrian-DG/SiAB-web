import {
	AfterViewInit,
	ChangeDetectionStrategy,
	Component,
	CUSTOM_ELEMENTS_SCHEMA,
} from '@angular/core';
import { MatTableModule } from '@angular/material/table';
import { PageIntroComponent } from '../../../../Shared/components/page-intro/page-intro.component';
import { PagePaginatorComponent } from '../../../../Shared/components/page-paginator/page-paginator.component';
import { EstadoArmasService } from '../../services/estado-armas.service';
import { BaseListResource } from '../../../../Shared/helpers/base-list-resource.metadata';
import { INamedEntity } from '../../../../Shared/Models/inamed-entity.model';
import { MatDialog } from '@angular/material/dialog';
import { IPagedData } from '../../../../Shared/Models/ipaged-data.model';

@Component({
	selector: 'app-estado-armas.page',
	standalone: true,
	imports: [MatTableModule, PageIntroComponent, PagePaginatorComponent],
	templateUrl: './estado-armas.page.component.html',
	styleUrl: './estado-armas.page.component.scss',
	changeDetection: ChangeDetectionStrategy.OnPush,
	providers: [EstadoArmasService],
	schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class EstadoArmasPageComponent
	extends BaseListResource<INamedEntity>
	implements AfterViewInit
{
	override title: string = 'Estado de Armas';
	override description: string = 'Listado de los estados de las armas';
	override displayedColumns: string[] = ['id', 'name', 'actions'];

	constructor(
		protected override _dialog: MatDialog,
		private _estadoArmasService: EstadoArmasService
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
		this._estadoArmasService
			.get<INamedEntity>(this.filters$())
			.subscribe((data: IPagedData<INamedEntity>) => {
				this.records$.set(data.rows);
			});
	}
}
