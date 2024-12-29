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
import { DependenciasService } from '../../services/dependencias.service';
import { IPagedData } from '../../../../Shared/Models/ipaged-data.model';
import { DependenciasFormDialogComponent } from '../../components/dependencias-form-dialog/dependencias-form-dialog.component';

@Component({
	selector: 'app-dependencias.page',
	standalone: true,
	imports: [MatTableModule, PageIntroComponent, PagePaginatorComponent],
	templateUrl: './dependencias.page.component.html',
	styleUrl: './dependencias.page.component.scss',
	changeDetection: ChangeDetectionStrategy.OnPush,
	schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class DependenciasPageComponent
	extends BaseListResource<INamedEntity>
	implements AfterViewInit
{
	override title: string = 'Dependencias';
	override description: string = 'Listado de dependencias';
	override displayedColumns: string[] = ['id', 'nombre', 'acciones'];

	constructor(
		protected override _dialog: MatDialog,
		private _service: DependenciasService
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
		this._dialog
			.open(DependenciasFormDialogComponent, { ...this.dialogConfig })
			.afterClosed()
			.subscribe(() => {
				this.onLoadData();
			});
	}

	override onLoadData(): void {
		this._service
			.get<INamedEntity>(this.filters$())
			.subscribe((data: IPagedData<INamedEntity>) => {
				this.records$.set(data.rows);
				this.totalCount$.set;
			});
	}
}
