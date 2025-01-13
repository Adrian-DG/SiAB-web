import {
	AfterViewInit,
	ChangeDetectionStrategy,
	Component,
	CUSTOM_ELEMENTS_SCHEMA,
} from '@angular/core';
import { MatTableModule } from '@angular/material/table';
import { PageIntroComponent } from '../../../../Shared/components/page-intro/page-intro.component';
import { PagePaginatorComponent } from '../../../../Shared/components/page-paginator/page-paginator.component';
import { CategoriaService } from '../../services/categoria.service';
import { BaseListResource } from '../../../../Shared/helpers/base-list-resource.metadata';
import { INamedEntity } from '../../../../Shared/Models/inamed-entity.model';
import { MatDialog } from '@angular/material/dialog';
import { IPagedData } from '../../../../Shared/Models/ipaged-data.model';
import { CrudActionsComponent } from '../../../../Shared/components/crud-actions/crud-actions.component';
import { CategoriaFormDialogComponent } from '../../components/categoria-form-dialog/categoria-form-dialog.component';
import { ConfirmDialogComponent } from '../../../../Shared/components/confirm-dialog/confirm-dialog.component';

@Component({
	selector: 'app-categorias.page',
	standalone: true,
	imports: [
		MatTableModule,
		PageIntroComponent,
		PagePaginatorComponent,
		CrudActionsComponent,
	],
	templateUrl: './categorias.page.component.html',
	styleUrl: './categorias.page.component.scss',
	changeDetection: ChangeDetectionStrategy.OnPush,
	providers: [CategoriaService],
	schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class CategoriasPageComponent
	extends BaseListResource<INamedEntity>
	implements AfterViewInit
{
	override title: string = 'Categorias';
	override description: string = 'Listado de categorias';
	override displayedColumns: string[] = ['id', 'nombre', 'acciones'];

	constructor(
		protected override _dialog: MatDialog,
		private _categoriaService: CategoriaService
	) {
		super(_dialog);
	}

	ngAfterViewInit(): void {
		this.onLoadData();
	}

	override onEdit(event: any): void {
		this._dialog
			.open(CategoriaFormDialogComponent, {
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
			.subscribe((result: boolean) => {
				if (result) {
					this._categoriaService
						.delete(event.id)
						.subscribe(() => this.onLoadData());
				}
			});
	}

	override onCreate(event: any): void {
		this._dialog
			.open(CategoriaFormDialogComponent, {
				...this.dialogConfig,
			})
			.afterClosed()
			.subscribe(() => this.onLoadData());
	}

	override onLoadData(): void {
		this._categoriaService
			.get<INamedEntity>(this.filters$())
			.subscribe((response: IPagedData<INamedEntity>) => {
				this.records$.set(response.rows);
				this.totalCount$.set(response.totalCount);
			});
	}
}
