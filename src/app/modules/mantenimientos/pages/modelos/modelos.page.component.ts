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
import { MatDialog } from '@angular/material/dialog';
import { CrudActionsComponent } from '../../../../Shared/components/crud-actions/crud-actions.component';

@Component({
	selector: 'app-modelos.page',
	standalone: true,
	imports: [
		PageIntroComponent,
		PagePaginatorComponent,
		CrudActionsComponent,
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

	constructor(
		protected override _confirmDialog: MatDialog,
		private _modelosService: ModelosService
	) {
		super(_confirmDialog);
	}

	ngAfterViewInit(): void {
		this.onLoadData();
	}

	override onDelete(event: any): void {
		this.showConfirmDialog('Se eliminará el registro seleccionado');
		this.confirmDialogRef.afterClosed().subscribe((result) => {
			if (result) {
				this._modelosService.delete(event as number).subscribe(() => {
					this.onLoadData();
				});
			}
		});
	}

	override onEdit(event: any): void {
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
