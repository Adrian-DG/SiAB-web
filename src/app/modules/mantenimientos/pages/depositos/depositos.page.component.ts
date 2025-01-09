import {
	AfterViewInit,
	ChangeDetectionStrategy,
	Component,
	CUSTOM_ELEMENTS_SCHEMA,
} from '@angular/core';
import { BaseListResource } from '../../../../Shared/helpers/base-list-resource.metadata';
import { IDepositoDetailModel } from '../../models/ideposito-detail.model';
import { MatDialog } from '@angular/material/dialog';
import { DepositosService } from '../../services/depositos.service';
import { PageIntroComponent } from '../../../../Shared/components/page-intro/page-intro.component';
import { MatTableModule } from '@angular/material/table';
import { PagePaginatorComponent } from '../../../../Shared/components/page-paginator/page-paginator.component';
import { IPagedData } from '../../../../Shared/Models/ipaged-data.model';
import { DepositosFormDialogComponent } from '../../components/depositos-form-dialog/depositos-form-dialog.component';
import { ConfirmDialogComponent } from '../../../../Shared/components/confirm-dialog/confirm-dialog.component';
import { CrudActionsComponent } from '../../../../Shared/components/crud-actions/crud-actions.component';

@Component({
	selector: 'app-depositos',
	standalone: true,
	imports: [
		PageIntroComponent,
		MatTableModule,
		PagePaginatorComponent,
		CrudActionsComponent,
	],
	templateUrl: './depositos.page.component.html',
	styleUrl: './depositos.page.component.scss',
	changeDetection: ChangeDetectionStrategy.OnPush,
	providers: [DepositosService],
	schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class DepositosPageComponent
	extends BaseListResource<IDepositoDetailModel>
	implements AfterViewInit
{
	override title: string = 'Depositos';
	override description: string = 'Listado de depositos';
	override displayedColumns: string[] = [
		'id',
		'nombre',
		'funcion',
		'dependencia',
		'acciones',
	];

	constructor(
		protected override _dialog: MatDialog,
		private _depositosService: DepositosService
	) {
		super(_dialog);
	}

	ngAfterViewInit(): void {
		this.onLoadData();
	}

	override onEdit(event: any): void {
		this._dialog
			.open(DepositosFormDialogComponent, {
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
			.subscribe((res) => {
				if (res) {
					this._depositosService
						.delete(event.id)
						.subscribe(() => this.onLoadData());
				}
			});
	}

	override onCreate(event: any): void {
		this._dialog
			.open(DepositosFormDialogComponent, { ...this.dialogConfig })
			.afterClosed()
			.subscribe(() => this.onLoadData());
	}

	override onLoadData(): void {
		this._depositosService
			.get<IDepositoDetailModel>(this.filters$())
			.subscribe((response: IPagedData<IDepositoDetailModel>) => {
				this.records$.set(response.rows);
				this.totalCount$.set(response.totalCount);
			});
	}
}
