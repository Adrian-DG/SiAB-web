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

@Component({
	selector: 'app-propiedades.page',
	standalone: true,
	imports: [MatTableModule, PageIntroComponent, PagePaginatorComponent],
	templateUrl: './propiedades.page.component.html',
	styleUrl: './propiedades.page.component.scss',
	changeDetection: ChangeDetectionStrategy.OnPush,
	schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class PropiedadesPageComponent
	extends BaseListResource<INamedEntity>
	implements AfterViewInit
{
	override title: string = 'Propiedades';
	override description: string = 'Listado de propiedades';
	override displayedColumns: string[] = ['id', 'nombre', 'acciones'];

	constructor(
		protected override _dialog: MatDialog,
		private _service: PropiedadesService
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
		throw new Error('Method not implemented.');
	}

	override onLoadData(): void {
		this._service.get<INamedEntity>(this.filters$()).subscribe((data) => {
			this.records$.set(data.rows);
		});
	}
}
