import { CommonModule } from '@angular/common';
import {
	ChangeDetectionStrategy,
	Component,
	computed,
	Input,
	OnChanges,
	OnInit,
	signal,
	SimpleChanges,
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
export class DynamicDataTableComponent implements OnChanges {
	@Input() tableData: any[] = [];
	@Input() tableColumns: any[] = [];
	rowCount$ = signal<number>(0);

	ngOnChanges(changes: SimpleChanges): void {
		console.log(changes);
		this.tableData = (changes['tableData'].currentValue as any[]).filter(
			(v) => v.length > 0
		);
		this.updateRowCount();
	}

	get columnsCount() {
		return (this.tableColumns[0] as string).length - 1;
	}

	updateRowCount(): void {
		this.rowCount$.set(this.tableData.length);
	}
}
