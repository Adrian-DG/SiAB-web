import {
	AfterViewInit,
	ChangeDetectionStrategy,
	Component,
	CUSTOM_ELEMENTS_SCHEMA,
} from '@angular/core';
import { BaseListResource } from '../../../../Shared/helpers/base-list-resource.metadata';
import { IUpdateEntityDto } from '../../../mantenimientos/dtos/iupdate-entity.dto';
import { MatDialog } from '@angular/material/dialog';
import { MatTableModule } from '@angular/material/table';
import { MatCardModule } from '@angular/material/card';
import { PageIntroComponent } from '../../../../Shared/components/page-intro/page-intro.component';
import { PagePaginatorComponent } from '../../../../Shared/components/page-paginator/page-paginator.component';
import { CrudActionsComponent } from '../../../../Shared/components/crud-actions/crud-actions.component';
import { IEmpresaModel } from '../../models/iempresa.model';
import { IPagedData } from '../../../../Shared/Models/ipaged-data.model';
import { Router } from '@angular/router';
import { EmpresaFormComponent } from '../../components/empresa-form/empresa-form-dialog.component';
import { EmpresaService } from '../../services/empresa.service';
import { ITitularModel } from '../../models/ITitular.model';

@Component({
	selector: 'app-index.page',
	standalone: true,
	imports: [
		MatTableModule,
		MatCardModule,
		PageIntroComponent,
		PagePaginatorComponent,
		CrudActionsComponent,
	],
	templateUrl: './index.page.component.html',
	styleUrl: './index.page.component.scss',
	changeDetection: ChangeDetectionStrategy.OnPush,
	schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class IndexPageComponent
	extends BaseListResource<IEmpresaModel>
	implements AfterViewInit
{
	override title: string = 'Empresas';
	override description: string = 'Listado de empresas';
	override displayedColumns: string[] = [
		'id',
		'nombre',
		'telefono',
		'acciones',
	];

	constructor(
		protected override _dialog: MatDialog,
		private _empresaService: EmpresaService,
		private $router: Router
	) {
		super(_dialog);
	}

	ngAfterViewInit(): void {
		this.onLoadData();
	}

	titularFormat(data: ITitularModel[]): string {
		if (data.length > 1) {
			return `${data[0]?.nombre ?? ''} ${data[0]?.apellido ?? ''}...`;
		}
		return `${data[0]?.nombre ?? ''} ${data[0]?.apellido ?? ''}`;
	}

	telefonoFormat(data: string[]): string {
		if (data.length > 1) {
			return `${data[0]}...`;
		}
		return data[0];
	}

	override onEdit(event: IUpdateEntityDto<any>): void {
		throw new Error('Method not implemented.');
	}

	override onDelete(event: number): void {
		throw new Error('Method not implemented.');
	}

	override onCreate(event: any): void {
		this._dialog
			.open(EmpresaFormComponent, {
				...this.dialogConfig,
			})
			.afterClosed()
			.subscribe(() => this.onLoadData());
	}

	onDetails(event: number): void {
		this.$router.navigate([`empresas/${event}/ordenes`]);
	}

	override onLoadData(): void {
		this._empresaService
			.get<IEmpresaModel>(this.filters$())
			.subscribe((data: IPagedData<IEmpresaModel>) => {
				this.data$.set(data);
			});
	}
}
