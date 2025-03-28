import {
	ChangeDetectionStrategy,
	Component,
	CUSTOM_ELEMENTS_SCHEMA,
} from '@angular/core';
import { BaseListResource } from '../../../../Shared/helpers/base-list-resource.metadata';
import { IUpdateEntityDto } from '../../../mantenimientos/dtos/iupdate-entity.dto';
import { MatDialog } from '@angular/material/dialog';
import { MatTableModule } from '@angular/material/table';
import { CrudActionsComponent } from '../../../../Shared/components/crud-actions/crud-actions.component';
import { MatCardModule } from '@angular/material/card';
import { ModuleIndexPageComponent } from '../../../../Shared/pages/module-index/module-index.page.component';
import { PagePaginatorComponent } from '../../../../Shared/components/page-paginator/page-paginator.component';
import { PageIntroComponent } from '../../../../Shared/components/page-intro/page-intro.component';
import { Router } from '@angular/router';

@Component({
	selector: 'app-index.page',
	standalone: true,
	imports: [
		MatTableModule,
		MatCardModule,
		PageIntroComponent,
		CrudActionsComponent,
		PagePaginatorComponent,
	],
	templateUrl: './index.page.component.html',
	styleUrl: './index.page.component.scss',
	changeDetection: ChangeDetectionStrategy.OnPush,
	schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class IndexPageComponent extends BaseListResource<any> {
	override title: string = 'Transacciones';
	override description: string =
		'Listado de transacciones de cargo y descargo';
	override displayedColumns: string[] = ['transaccion', 'articulo'];

	constructor(
		protected override _dialog: MatDialog,
		private $router: Router
	) {
		super(_dialog);
	}

	override onEdit(event: IUpdateEntityDto<any>): void {
		throw new Error('Method not implemented.');
	}

	override onDelete(event: number): void {
		throw new Error('Method not implemented.');
	}

	override onCreate(event: any): void {
		this.$router.navigateByUrl('/transacciones/cargo-descargo');
	}

	override onLoadData(): void {
		throw new Error('Method not implemented.');
	}
}
