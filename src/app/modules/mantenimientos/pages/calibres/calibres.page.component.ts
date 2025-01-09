import {
	AfterViewInit,
	ChangeDetectionStrategy,
	Component,
	CUSTOM_ELEMENTS_SCHEMA,
	TemplateRef,
	ViewChild,
} from '@angular/core';
import { MatTableModule } from '@angular/material/table';
import { PageIntroComponent } from '../../../../Shared/components/page-intro/page-intro.component';
import { PagePaginatorComponent } from '../../../../Shared/components/page-paginator/page-paginator.component';
import { BaseListResource } from '../../../../Shared/helpers/base-list-resource.metadata';
import { INamedEntity } from '../../../../Shared/Models/inamed-entity.model';
import { MatDialog } from '@angular/material/dialog';
import { CalibreService } from '../../services/calibre.service';
import { IPagedData } from '../../../../Shared/Models/ipaged-data.model';
import { FormDialogComponent } from '../../../../Shared/components/form-dialog/form-dialog.component';
import { CalibreFormDialogComponent } from '../../components/calibre-form-dialog/calibre-form-dialog.component';
import { CrudActionsComponent } from '../../../../Shared/components/crud-actions/crud-actions.component';
import { IUpdateEntityDto } from '../../dtos/iupdate-entity.dto';
import { ConfirmDialogComponent } from '../../../../Shared/components/confirm-dialog/confirm-dialog.component';

@Component({
	selector: 'app-calibres',
	standalone: true,
	imports: [
		MatTableModule,
		PageIntroComponent,
		PagePaginatorComponent,
		CrudActionsComponent,
	],
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
	override displayedColumns: string[] = ['id', 'nombre', 'acciones'];

	constructor(
		protected override _dialog: MatDialog,
		private _calibreService: CalibreService
	) {
		super(_dialog);
	}

	ngAfterViewInit(): void {
		this.onLoadData();
	}

	override onEdit(event: IUpdateEntityDto<INamedEntity>): void {
		this._dialog
			.open(CalibreFormDialogComponent, {
				...this.dialogConfig,
				width: '500px',
				data: { ...event },
			})
			.afterClosed()
			.subscribe(() => {
				this.onLoadData();
			});
	}

	override onDelete(event: number): void {
		this._dialog
			.open(ConfirmDialogComponent, {
				...this.dialogConfig,
				data: { action: 'Eliminar' },
			})
			.afterClosed()
			.subscribe((res: boolean) => {
				if (res) {
					this._calibreService.delete(event).subscribe(() => {
						this.onLoadData();
					});
				}
			});
	}

	override onCreate(event: any): void {
		this._dialog
			.open(CalibreFormDialogComponent, {
				...this.dialogConfig,
				width: '500px',
				data: null,
			})
			.afterClosed()
			.subscribe(() => {
				this.onLoadData();
			});
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
