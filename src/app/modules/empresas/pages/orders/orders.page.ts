import {
	ChangeDetectionStrategy,
	Component,
	CUSTOM_ELEMENTS_SCHEMA,
	OnInit,
} from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import { ActivatedRoute, Route, Router, RouterModule } from '@angular/router';
import { BaseListResource } from '../../../../Shared/helpers/base-list-resource.metadata';
import { IUpdateEntityDto } from '../../../mantenimientos/dtos/iupdate-entity.dto';
import { MatDialog } from '@angular/material/dialog';
import { MatCardModule } from '@angular/material/card';
import { CommonModule } from '@angular/common';
import { PageIntroComponent } from '../../../../Shared/components/page-intro/page-intro.component';
import { ModuleIndexPageComponent } from '../../../../Shared/pages/module-index/module-index.page.component';
import { OrdenesEmpresaService } from '../../services/ordenes-empresa.service';
import { PagePaginatorComponent } from '../../../../Shared/components/page-paginator/page-paginator.component';
import { OrdenEmpresaFormComponent } from '../../components/orden-empresa-form/orden-empresa-form.component';
import { CrudActionsComponent } from '../../../../Shared/components/crud-actions/crud-actions.component';

@Component({
	selector: 'app-orders',
	standalone: true,
	imports: [
		RouterModule,
		MatTableModule,
		MatCardModule,
		MatButtonModule,
		MatIconModule,
		CommonModule,
		PageIntroComponent,
		PagePaginatorComponent,
		CrudActionsComponent,
	],
	templateUrl: './orders.page.html',
	styleUrl: './orders.page.scss',
	changeDetection: ChangeDetectionStrategy.OnPush,
	providers: [OrdenesEmpresaService],
	schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class OrdersComponent extends BaseListResource<any> implements OnInit {
	override title: string = 'Ordenes';
	override description: string = 'Listado de ordenes';
	override displayedColumns: string[] = ['id', 'fecha', 'acciones'];

	private empresaId: number = 0;

	constructor(
		protected override _dialog: MatDialog,
		private $activeRoute: ActivatedRoute,
		private _ordenesEmpresaService: OrdenesEmpresaService,
		private $router: Router
	) {
		super(_dialog);
	}

	ngOnInit(): void {
		this.empresaId = this.$activeRoute.snapshot.params['id'] as number;
		this.onLoadData();
	}

	override onEdit(event: IUpdateEntityDto<any>): void {
		throw new Error('Method not implemented.');
	}

	override onDelete(event: number): void {
		throw new Error('Method not implemented.');
	}

	override onCreate(event: any): void {
		this._dialog
			.open(OrdenEmpresaFormComponent, {
				data: { id: this.empresaId },
				width: '1000px',
				...this.dialogConfig,
			})
			.afterClosed()
			.subscribe(() => this.onLoadData());
	}

	override onLoadData(): void {
		this._ordenesEmpresaService
			.getOrdenesEmpresa(this.empresaId, this.filters$())
			.subscribe((data) => {
				this.data$.set(data);
			});
	}

	onDetails(ordenId: number): void {
		this.$router.navigate([
			'/empresas',
			this.empresaId,
			'ordenes',
			ordenId,
			'detalles',
		]);
	}
}
