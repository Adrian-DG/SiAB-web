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
import { map } from 'rxjs';
import { IApiResponse } from '../../../../Shared/Models/iapi-response.model';
import { SubtipoFormDialogComponent } from '../../components/subtipo-form-dialog/subtipo-form-dialog.component';
import { ConfirmDialogComponent } from '../../../../Shared/components/confirm-dialog/confirm-dialog.component';
import { CrudActionsComponent } from '../../../../Shared/components/crud-actions/crud-actions.component';

@Component({
	selector: 'app-subtipos.page',
	standalone: true,
	imports: [
		MatTableModule,
		PageIntroComponent,
		PagePaginatorComponent,
		CrudActionsComponent,
	],
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
		this._dialog
			.open(SubtipoFormDialogComponent, {
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
					this._subTipoService
						.delete(event.id)
						.subscribe(() => this.onLoadData());
				}
			});
	}

	override onCreate(event: any): void {
		this._dialog
			.open(SubtipoFormDialogComponent, {
				...this.dialogConfig,
			})
			.afterClosed()
			.subscribe(() => this.onLoadData());
	}

	override onLoadData(): void {
		this._subTipoService
			.get<ISubtipoDetail>(this.filters$())
			.subscribe((response: IPagedData<ISubtipoDetail>) => {
				this.data$.set(response);
			});
	}
}
