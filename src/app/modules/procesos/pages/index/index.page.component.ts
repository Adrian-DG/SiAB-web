import {
	ChangeDetectionStrategy,
	Component,
	CUSTOM_ELEMENTS_SCHEMA,
	OnInit,
	signal,
	WritableSignal,
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
import { TransaccionService } from '../../../carga-registros/services/transaccion.service';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { IPaginationFilter } from '../../../../Shared/dtos/ipagination-filter.dto';
import { ITransaccionPaginationFilterDto } from '../../../carga-registros/dto/itransaccion-pagination-filter.dto';
import { CommonModule } from '@angular/common';

@Component({
	selector: 'app-index.page',
	standalone: true,
	imports: [
		CommonModule,
		MatTableModule,
		MatCardModule,
		MatInputModule,
		MatFormFieldModule,
		MatDatepickerModule,
		MatButtonModule,
		MatIconModule,
		PageIntroComponent,
		CrudActionsComponent,
		PagePaginatorComponent,
	],
	templateUrl: './index.page.component.html',
	styleUrl: './index.page.component.scss',
	changeDetection: ChangeDetectionStrategy.OnPush,
	providers: [TransaccionService],
	schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class IndexPageComponent
	extends BaseListResource<any>
	implements OnInit
{
	override title: string = 'Transacciones';
	override description: string =
		'Listado de transacciones de cargo y descargo';
	override displayedColumns: string[] = [
		'id',
		'transaccion',
		'documento',
		'acciones',
	];

	transactionFilter$: WritableSignal<ITransaccionPaginationFilterDto> =
		signal({
			...this.filters$(),
			fechaDesde: '',
			fechaHasta: '',
			formulario53: '',
			origen: '',
			destino: '',
		});

	constructor(
		protected override _dialog: MatDialog,
		private _transaccionService: TransaccionService,
		private $router: Router
	) {
		super(_dialog);
	}

	ngOnInit(): void {
		this.onLoadData();
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
		this.transactionFilter$.update(() => ({
			...this.filters$(),
			fechaDesde: this.transactionFilter$().fechaDesde,
			fechaHasta: this.transactionFilter$().fechaHasta,
			formulario53: this.transactionFilter$().formulario53,
			origen: this.transactionFilter$().origen,
			destino: this.transactionFilter$().destino,
		}));

		this._transaccionService
			.getTransacciones(this.transactionFilter$())
			.subscribe((response) => {
				this.data$.set(response);
			});
	}
}
