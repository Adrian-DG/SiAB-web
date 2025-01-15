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
	imports: [CommonModule, MatTableModule, MatSortModule],
	templateUrl: './dynamic-data-table.component.html',
	styleUrl: './dynamic-data-table.component.scss',
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DynamicDataTableComponent implements OnInit {
	@Input() tableData: any[] = [];
	@Input() tableColumns: any[] = [];

	dataSource = new MatTableDataSource<any>();

	ngOnInit(): void {
		console.log((this.tableColumns[0] as string).length);
		this.dataSource.data = this.tableData;
	}

	get columnsCount() {
		return (this.tableColumns[0] as string).length - 1;
	}
}
