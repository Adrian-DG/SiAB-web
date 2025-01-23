import { CommonModule } from '@angular/common';
import {
	ChangeDetectionStrategy,
	Component,
	Input,
	OnInit,
} from '@angular/core';
import { MatSortModule } from '@angular/material/sort';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';

@Component({
	selector: 'app-dynamic-data-table',
	standalone: true,
	imports: [CommonModule],
	templateUrl: './dynamic-data-table.component.html',
	styleUrl: './dynamic-data-table.component.scss',
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DynamicDataTableComponent {
	@Input() tableData: any[] = [];
	@Input() tableColumns: any[] = [];

	get columnsCount() {
		return (this.tableColumns[0] as string).length - 1;
	}
}
