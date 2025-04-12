import {
	ChangeDetectionStrategy,
	Component,
	CUSTOM_ELEMENTS_SCHEMA,
	OnInit,
} from '@angular/core';
import { BaseListResource } from '../../../../Shared/helpers/base-list-resource.metadata';
import { IUpdateEntityDto } from '../../dtos/iupdate-entity.dto';
import { MatDialog } from '@angular/material/dialog';
import { TiposDocumentosService } from '../../services/tipos-documentos.service';
import { MatTableModule } from '@angular/material/table';
import { PageIntroComponent } from '../../../../Shared/components/page-intro/page-intro.component';
import { PagePaginatorComponent } from '../../../../Shared/components/page-paginator/page-paginator.component';
import { CrudActionsComponent } from '../../../../Shared/components/crud-actions/crud-actions.component';
import { TiposDocumentosFormDialogComponent } from '../../components/tipos-documentos-form-dialog/tipos-documentos-form-dialog.component';

@Component({
	selector: 'app-tipos-documentos.page',
	standalone: true,
	imports: [
		MatTableModule,
		PageIntroComponent,
		PagePaginatorComponent,
		CrudActionsComponent,
	],
	templateUrl: './tipos-documentos.page.component.html',
	styleUrl: './tipos-documentos.page.component.scss',
	changeDetection: ChangeDetectionStrategy.OnPush,
	providers: [TiposDocumentosService],
	schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class TiposDocumentosPageComponent
	extends BaseListResource<any>
	implements OnInit
{
	override title: string = 'Tipos de Documentos';
	override description: string = 'Lista de tipos de documentos';
	override displayedColumns: string[] = ['id', 'nombre', 'acciones'];

	constructor(
		protected override _dialog: MatDialog,
		private _tiposDocumentosService: TiposDocumentosService
	) {
		super(_dialog);
	}

	ngOnInit(): void {
		this.onLoadData();
	}

	override onEdit(event: IUpdateEntityDto<any>): void {
		this._dialog
			.open(TiposDocumentosFormDialogComponent, {
				...this.dialogConfig,
				data: event,
			})
			.afterClosed()
			.subscribe(() => this.onLoadData());
	}

	override onDelete(event: number): void {
		throw new Error('Method not implemented.');
	}

	override onCreate(event: any): void {
		this._dialog
			.open(TiposDocumentosFormDialogComponent, { ...this.dialogConfig })
			.afterClosed()
			.subscribe(() => this.onLoadData());
	}

	override onLoadData(): void {
		this._tiposDocumentosService.get(this.filters$()).subscribe((data) => {
			this.data$.set(data);
		});
	}
}
