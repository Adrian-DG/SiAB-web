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
import { MatCardModule } from '@angular/material/card';

@Component({
	selector: 'app-depositos',
	standalone: true,
	imports: [PageIntroComponent, MatTableModule, PagePaginatorComponent],
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
		protected override _confirmDialog: MatDialog,
		private _depositosService: DepositosService
	) {
		super(_confirmDialog);
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

	override onLoadData(): void {
		this._depositosService
			.getDepositosPaginated(this.filters$())
			.subscribe((response: IDepositoDetailModel[]) => {
				this.records$.set(response);
			});
	}
}
