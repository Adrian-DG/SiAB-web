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
import { ISubtipoDetail } from '../../models/isubtipo-detail.model';
import { MatDialog } from '@angular/material/dialog';

@Component({
	selector: 'app-subtipos.page',
	standalone: true,
	imports: [MatTableModule, PageIntroComponent, PagePaginatorComponent],
	templateUrl: './subtipos.page.component.html',
	styleUrl: './subtipos.page.component.scss',
	changeDetection: ChangeDetectionStrategy.OnPush,
	schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class SubtiposPageComponent
	extends BaseListResource<ISubtipoDetail>
	implements AfterViewInit
{
	override title: string = 'Subtipos';
	override description: string = 'Listado de subtipos';
	override displayedColumns: string[] = ['id', 'nombre', 'tipo', 'acciones'];

	constructor(protected override _confirmDialog: MatDialog) {
		super(_confirmDialog);
	}

	ngAfterViewInit(): void {
		throw new Error('Method not implemented.');
	}

	override onEdit(event: any): void {
		throw new Error('Method not implemented.');
	}
	override onDelete(event: any): void {
		throw new Error('Method not implemented.');
	}
	override onLoadData(): void {
		throw new Error('Method not implemented.');
	}
}
