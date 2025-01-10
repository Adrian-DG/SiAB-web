import {
	AfterViewInit,
	ChangeDetectionStrategy,
	Component,
	CUSTOM_ELEMENTS_SCHEMA,
	OnInit,
	ViewChild,
} from '@angular/core';
import { MatTableModule } from '@angular/material/table';
import { PageIntroComponent } from '../../../../Shared/components/page-intro/page-intro.component';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { PagePaginatorComponent } from '../../../../Shared/components/page-paginator/page-paginator.component';
import { BaseListResource } from '../../../../Shared/helpers/base-list-resource.metadata';
import { INamedEntity } from '../../../../Shared/Models/inamed-entity.model';
import { MarcaService } from '../../services/marca.service';
import { IPagedData } from '../../../../Shared/Models/ipaged-data.model';
import { MatDialog } from '@angular/material/dialog';
import { CrudActionsComponent } from '../../../../Shared/components/crud-actions/crud-actions.component';
import { ConfirmDialogComponent } from '../../../../Shared/components/confirm-dialog/confirm-dialog.component';
import { MarcasFormDialogComponent } from '../../components/marcas-form-dialog/marcas-form-dialog.component';

@Component({
	selector: 'app-marcas',
	standalone: true,
	imports: [
		PageIntroComponent,
		MatTableModule,
		PagePaginatorComponent,
		CrudActionsComponent,
	],
	templateUrl: './marcas.page.component.html',
	styleUrl: './marcas.page.component.scss',
	changeDetection: ChangeDetectionStrategy.OnPush,
	schemas: [CUSTOM_ELEMENTS_SCHEMA],
	providers: [MarcaService],
})
export class MarcasPageComponent
	extends BaseListResource<INamedEntity>
	implements AfterViewInit
{
	override title: string = 'Marcas';
	override description: string = 'Listado de marcas';
	override displayedColumns: string[] = ['id', 'nombre', 'acciones'];

	@ViewChild(MatPaginator) paginator!: MatPaginator;

	constructor(
		protected override _dialog: MatDialog,
		private _marcasService: MarcaService
	) {
		super(_dialog);
	}

	ngAfterViewInit(): void {
		this.onLoadData();
	}

	override onDelete(event: any): void {
		this._dialog.open(ConfirmDialogComponent, {
			...this.dialogConfig,
			data: { action: 'Eliminar' },
		});
	}

	override onEdit(event: any): void {
		this._dialog.open(MarcasFormDialogComponent, {
			...this.dialogConfig,
			data: event,
		});
	}

	override onCreate(event: any): void {
		this._dialog.open(MarcasFormDialogComponent, {
			...this.dialogConfig,
		});
	}

	override onLoadData(): void {
		this._marcasService
			.get<INamedEntity>(this.filters$())
			.subscribe((response: IPagedData<INamedEntity>) => {
				this.records$.set(response.rows);
				this.totalCount$.set(response.totalCount);
			});
	}
}
