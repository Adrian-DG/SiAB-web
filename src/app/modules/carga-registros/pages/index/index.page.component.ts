import { CommonModule } from '@angular/common';
import {
	ChangeDetectionStrategy,
	Component,
	CUSTOM_ELEMENTS_SCHEMA,
	signal,
} from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatTableModule } from '@angular/material/table';
import { ExcelUploaderComponent } from '../../../../Shared/components/excel-uploader/excel-uploader.component';
import { MatIconModule } from '@angular/material/icon';
import { DynamicDataTableComponent } from '../../components/dynamic-data-table/dynamic-data-table.component';

@Component({
	selector: 'app-index.page',
	standalone: true,
	imports: [
		CommonModule,
		MatCardModule,
		MatButtonModule,
		MatIconModule,
		ExcelUploaderComponent,
		DynamicDataTableComponent,
	],
	templateUrl: './index.page.component.html',
	styleUrl: './index.page.component.scss',
	changeDetection: ChangeDetectionStrategy.OnPush,
	schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class IndexPageComponent {
	tableData$ = signal<{
		sheet: string;
		header: any[];
		rows: any[];
	} | null>(null);

	onFileSelected(event: { sheet: string; header: any[]; rows: any[] }) {
		this.tableData$.set({
			sheet: event.sheet,
			header: event.header,
			rows: event.rows,
		});
	}
}
