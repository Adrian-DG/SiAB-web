import { OnInit, signal } from '@angular/core';
import { IPaginationFilter } from '../dtos/ipagination-filter.dto';
import {
	MatDialog,
	MatDialogConfig,
	MatDialogRef,
} from '@angular/material/dialog';
import { PageEvent } from '@angular/material/paginator';

export abstract class BaseListResource<T> {
	protected filters$ = signal<IPaginationFilter>({
		page: 1,
		size: 10,
		searchTerm: '',
	});
	protected records$ = signal<T[]>([]);
	protected totalCount$ = signal<number>(0);

	protected dialogConfig: MatDialogConfig = {
		hasBackdrop: true,
		minHeight: 200,
		minWidth: 400,
		role: 'alertdialog',
	};

	// protected confirmDialogRef!: MatDialogRef<ConfirmDialogComponent>;

	// constructor(protected _confirmDialog: MatDialog) {}

	// showConfirmDialog(): void {
	// 	this.confirmDialogRef = this._confirmDialog.open(
	// 		ConfirmDialogComponent,
	// 		{
	// 			...this.dialogConfig,
	// 		}
	// 	);
	// }

	abstract onSearch(event: string): void;

	abstract onPaginate(event: PageEvent): void;

	abstract onDelete(event: any): void;

	abstract onLoadData(): void;
}
