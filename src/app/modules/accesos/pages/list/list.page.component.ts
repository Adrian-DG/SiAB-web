import {
	AfterViewInit,
	ChangeDetectionStrategy,
	Component,
	CUSTOM_ELEMENTS_SCHEMA,
} from '@angular/core';
import { MatTableModule } from '@angular/material/table';
import { PageIntroComponent } from '../../../../Shared/components/page-intro/page-intro.component';
import { PagePaginatorComponent } from '../../../../Shared/components/page-paginator/page-paginator.component';
import { BaseListResource } from '../../../../Shared/helpers/base-list-resource.metadata';
import { MatDialog } from '@angular/material/dialog';
import { MatCardModule } from '@angular/material/card';
import { UsuariosService } from '../../services/usuarios.service';
import { INamedEntity } from '../../../../Shared/Models/inamed-entity.model';
import { IPagedData } from '../../../../Shared/Models/ipaged-data.model';
import { IUsuarioDetailModel } from '../../models/iusuario-detail.model';

@Component({
	selector: 'app-list.page',
	standalone: true,
	imports: [
		MatTableModule,
		MatCardModule,
		PageIntroComponent,
		PagePaginatorComponent,
	],
	templateUrl: './list.page.component.html',
	styleUrl: './list.page.component.scss',
	changeDetection: ChangeDetectionStrategy.OnPush,
	schemas: [CUSTOM_ELEMENTS_SCHEMA],
	providers: [UsuariosService],
})
export class ListPageComponent
	extends BaseListResource<IUsuarioDetailModel>
	implements AfterViewInit
{
	override title: string = 'Usuarios';
	override description: string = 'Listado de usuarios con acceso al sistema';
	override displayedColumns: string[] = [
		'id',
		'personal',
		'info',
		'acciones',
	];

	constructor(
		protected override _dialog: MatDialog,
		private _usuariosService: UsuariosService
	) {
		super(_dialog);
	}

	ngAfterViewInit(): void {
		this.onLoadData();
	}

	nombreCompleto(usuario: IUsuarioDetailModel): string {
		return `${usuario.nombre} ${usuario.apellido}`;
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
		this._usuariosService
			.get<IUsuarioDetailModel>(this.filters$())
			.subscribe((data: IPagedData<IUsuarioDetailModel>) => {
				this.records$.set(data.rows);
			});
	}
}
