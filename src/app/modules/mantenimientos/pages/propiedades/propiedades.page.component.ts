import {
	AfterViewInit,
	ChangeDetectionStrategy,
	Component,
	CUSTOM_ELEMENTS_SCHEMA,
} from '@angular/core';
import { BaseListResource } from '../../../../Shared/helpers/base-list-resource.metadata';
import { INamedEntity } from '../../../../Shared/Models/inamed-entity.model';
import { MatDialog } from '@angular/material/dialog';
import { MatTableModule } from '@angular/material/table';
import { PageIntroComponent } from '../../../../Shared/components/page-intro/page-intro.component';
import { PagePaginatorComponent } from '../../../../Shared/components/page-paginator/page-paginator.component';
import { PropiedadesService } from '../../services/propiedades.service';
import { ArticuloService } from '../../services/articulo.service';
import { IPagedData } from '../../../../Shared/Models/ipaged-data.model';
import { CrudActionsComponent } from '../../../../Shared/components/crud-actions/crud-actions.component';
import { PropiedadesFormDialogComponent } from '../../components/propiedades-form-dialog/propiedades-form-dialog.component';
import { CommonModule } from '@angular/common';

@Component({
	selector: 'app-propiedades.page',
	standalone: true,
	imports: [
		MatTableModule,
		PageIntroComponent,
		PagePaginatorComponent,
		CrudActionsComponent,
	],
	templateUrl: './propiedades.page.component.html',
	styleUrl: './propiedades.page.component.scss',
	changeDetection: ChangeDetectionStrategy.OnPush,
	providers: [PropiedadesService],
	schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class PropiedadesPageComponent
	extends BaseListResource<any>
	implements AfterViewInit
{
	override title: string = 'Propiedades';
	override description: string = 'Listado de propiedades';
	override displayedColumns: string[] = [
		'id',
		'serie',
		'tipado',
		'info',
		'acciones',
	];

	constructor(
		protected override _dialog: MatDialog,
		private _articuloService: ArticuloService
	) {
		super(_dialog);
	}

	ngAfterViewInit(): void {
		this.onLoadData();
	}

	override onEdit(event: any): void {
		console.log(event);
		this._dialog
			.open(PropiedadesFormDialogComponent, {
				data: event,
				...this.dialogConfig,
			})
			.afterClosed()
			.subscribe(() => this.onLoadData());
	}

	override onDelete(event: any): void {
		throw new Error('Method not implemented.');
	}

	override onCreate(event: any): void {
		throw new Error('Method not implemented.');
	}

	override onLoadData(): void {
		this._articuloService
			.get<any>(this.filters$())
			.subscribe((data: IPagedData<any>) => {
				this.data$.set(data);
			});
	}
}
