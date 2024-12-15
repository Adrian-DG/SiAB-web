import {
	ChangeDetectionStrategy,
	Component,
	EventEmitter,
	Input,
	Output,
} from '@angular/core';
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';

@Component({
	selector: 'app-page-paginator',
	standalone: true,
	imports: [MatPaginatorModule],
	templateUrl: './page-paginator.component.html',
	styleUrl: './page-paginator.component.scss',
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PagePaginatorComponent {
	@Input() length!: number;
	@Input() pageSize!: number;

	pageSizeOptions: number[] = [5, 10, 25, 100];

	@Output('page') pageEvent = new EventEmitter<PageEvent>();

	onPageChange(event: PageEvent): void {
		this.pageEvent.emit(event);
	}
}
