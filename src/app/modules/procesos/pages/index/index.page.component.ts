import {
	ChangeDetectionStrategy,
	Component,
	CUSTOM_ELEMENTS_SCHEMA,
	inject,
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
import { CommonModule, DatePipe } from '@angular/common';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PermissionValidatorService } from '../../../../Shared/Services/permission-validator.service';
import { AppPermissions } from '../../../../app.permissions';
import { ConfirmDialogComponent } from '../../../../Shared/components/confirm-dialog/confirm-dialog.component';
import { AdjuntarDocumentoDialogComponent } from '../../components/adjuntar-documento-dialog/adjuntar-documento-dialog.component';
import { BaseDialogDimensions } from '../../../../Shared/helpers/base-dialog-dimmensions.metadata';
import { IAdjuntarFormularioDto } from '../../../carga-registros/dto/iadjuntar-formulario.dto';

@Component({
	selector: 'app-index.page',
	standalone: true,
	imports: [
		CommonModule,
		MatTableModule,
		MatCardModule,
		MatCheckboxModule,
		MatInputModule,
		MatFormFieldModule,
		MatDatepickerModule,
		MatButtonModule,
		MatIconModule,
		ReactiveFormsModule,
		PageIntroComponent,
		CrudActionsComponent,
		PagePaginatorComponent,
	],
	templateUrl: './index.page.component.html',
	styleUrl: './index.page.component.scss',
	changeDetection: ChangeDetectionStrategy.OnPush,
	providers: [TransaccionService, DatePipe],
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

	datePipe = inject(DatePipe);

	formulario53Ctrl = new FormControl('');
	origenCtrl = new FormControl('');
	destinoCtrl = new FormControl('');
	adjunto53Ctrl = new FormControl(false);
	fechaDesdeCtrl = new FormControl('');
	fechaHastaCtrl = new FormControl('');

	transactionFilter$: WritableSignal<ITransaccionPaginationFilterDto> =
		signal<ITransaccionPaginationFilterDto>({
			...this.filters$(),
			origen: '',
			destino: '',
			adjunto53: false,
			fechaDesde: '',
			fechaHasta: '',
			formulario53: '',
		});

	constructor(
		protected override _dialog: MatDialog,
		private _transaccionService: TransaccionService,
		private $router: Router,
		private _permissionValidator: PermissionValidatorService
	) {
		super(_dialog);
	}

	ngOnInit(): void {
		this.onLoadData();
		// this._permissionValidator.setPermissions([
		// 	AppPermissions.TRANSACCIONES_CREAR_CARGO_DESCARGO,
		// ]);
	}

	canCreate(): boolean {
		return true;
	}

	get isInitialDateValid(): boolean {
		return this.fechaDesdeCtrl.value !== '';
	}

	onInitialDateChange(event: any): void {
		if (this.isInitialDateValid) {
			this.fechaHastaCtrl.setValue(this.fechaDesdeCtrl.value);
		}
	}

	override onEdit(event: IUpdateEntityDto<any>): void {
		throw new Error('Method not implemented.');
	}

	override onDelete(event: number): void {
		this._dialog
			.open(ConfirmDialogComponent)
			.afterClosed()
			.subscribe((result: boolean) => {
				if (result) {
					this._transaccionService
						.delete(event)
						.subscribe(() => this.onLoadData());
				}
			});
	}

	onUploadFile(event: number): void {
		this._dialog
			.open(AdjuntarDocumentoDialogComponent, {
				data: {
					id: event,
				},
				...BaseDialogDimensions,
			})
			.afterClosed()
			.subscribe((result: IAdjuntarFormularioDto) => {
				this._transaccionService
					.adjuntarDocumento(result)
					.subscribe(() => console.log('Formulario 53 adjuntado'));
			});
	}

	override onCreate(event: any): void {
		this.$router.navigateByUrl('/transacciones/cargo-descargo');
	}

	override onLoadData(): void {
		if (
			this.transactionFilter$().fechaDesde !== '' &&
			this.transactionFilter$().fechaHasta !== ''
		) {
			const formattedInitialDate = this.datePipe.transform(
				this.transactionFilter$().fechaDesde ?? new Date(),
				'yyyy-MM-dd'
			);

			const formattedFinalDate = this.datePipe.transform(
				this.transactionFilter$().fechaHasta ?? new Date(),
				'yyyy-MM-dd'
			);

			this._transaccionService
				.getTransacciones({
					...this.transactionFilter$(),
					fechaDesde: formattedInitialDate ?? '',
					fechaHasta: formattedFinalDate ?? '',
				})
				.subscribe((response) => {
					this.data$.set(response);
				});
		} else {
			this._transaccionService
				.getTransacciones(this.transactionFilter$())
				.subscribe((response) => {
					this.data$.set(response);
				});
		}
	}

	onDetails(event: number): void {
		this.$router.navigate(['transacciones', event, 'detalles-transaccion']);
	}

	advancedSearch(): void {
		this.transactionFilter$.update(() => ({
			...this.filters$(),
			origen: this.origenCtrl.value ?? '',
			destino: this.destinoCtrl.value ?? '',
			adjunto53: this.adjunto53Ctrl.value ?? false,
			fechaDesde: this.fechaDesdeCtrl.value ?? '',
			fechaHasta: this.fechaHastaCtrl.value ?? '',
			formulario53: this.formulario53Ctrl.value ?? '',
		}));
		this.onLoadData();
	}

	clearFilters(): void {
		this.transactionFilter$.update(() => ({
			...this.filters$(),
			origen: '',
			destino: '',
			adjunto53: false,
			fechaDesde: '',
			fechaHasta: '',
			formulario53: '',
		}));

		this.fechaDesdeCtrl.setValue('');
		this.fechaHastaCtrl.setValue('');
		this.origenCtrl.setValue('');
		this.destinoCtrl.setValue('');
		this.adjunto53Ctrl.setValue(false);
		this.formulario53Ctrl.setValue('');
		this.onLoadData();
	}
}
