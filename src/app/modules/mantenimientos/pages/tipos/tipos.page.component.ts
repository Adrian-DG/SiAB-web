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
import { map } from 'rxjs';
import { IApiResponse } from '../../../../Shared/Models/iapi-response.model';
import { CrudActionsComponent } from '../../../../Shared/components/crud-actions/crud-actions.component';
import { ConfirmDialogComponent } from '../../../../Shared/components/confirm-dialog/confirm-dialog.component';
import { TiposFormDialogComponent } from '../../components/tipos-form-dialog/tipos-form-dialog.component';

@Component({
	selector: 'app-tipos.page',
	standalone: true,
	imports: [
		MatTableModule,
		PageIntroComponent,
		PagePaginatorComponent,
		CrudActionsComponent,
	],
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
		protected override _dialog: MatDialog,
		private _tiposService: TipoService
	) {
		super(_dialog);
	}

	ngAfterViewInit(): void {
		this.onLoadData();
	}

	override onEdit(event: any): void {
		this._dialog
			.open(TiposFormDialogComponent, {
				...this.dialogConfig,
				data: event,
			})
			.afterClosed()
			.subscribe(() => this.onLoadData());
	}

	override onDelete(event: any): void {
		this._dialog
			.open(ConfirmDialogComponent, {
				...this.dialogConfig,
				data: { action: 'Eliminar' },
			})
			.afterClosed()
			.subscribe((res: boolean) => {
				if (res) {
					this._tiposService.delete(event).subscribe(() => {
						this.onLoadData();
					});
				}
			});
	}

	override onCreate(event: any): void {
		this._dialog
			.open(TiposFormDialogComponent, this.dialogConfig)
			.afterClosed()
			.subscribe((res) => this.onLoadData());
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
