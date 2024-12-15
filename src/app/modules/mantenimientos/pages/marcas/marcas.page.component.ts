import {
	ChangeDetectionStrategy,
	Component,
	CUSTOM_ELEMENTS_SCHEMA,
	ViewChild,
} from '@angular/core';
import { MatTableModule } from '@angular/material/table';
import { PageIntroComponent } from '../../../../Shared/components/page-intro/page-intro.component';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { PagePaginatorComponent } from '../../../../Shared/components/page-paginator/page-paginator.component';

@Component({
	selector: 'app-marcas',
	standalone: true,
	imports: [PageIntroComponent, MatTableModule, PagePaginatorComponent],
	templateUrl: './marcas.page.component.html',
	styleUrl: './marcas.page.component.scss',
	changeDetection: ChangeDetectionStrategy.OnPush,
	schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class MarcasPageComponent {
	title = 'Marcas';
	description = 'mantenimiento de marcas.';

	displayedColumns: string[] = ['id', 'marca', 'acciones'];

	@ViewChild(MatPaginator) paginator!: MatPaginator;

	search(event: string): void {
		console.log(event);
	}

	dataSource: any[] = [];

	loadData(event: PageEvent): void {
		console.log(event);
	}
}
