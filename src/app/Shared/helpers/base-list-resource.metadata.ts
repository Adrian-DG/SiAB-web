import { OnInit, signal } from '@angular/core';
import { IPaginationFilter } from '../dtos/ipagination-filter.dto';
import {
	MatDialog,
	MatDialogConfig,
	MatDialogRef,
} from '@angular/material/dialog';
import { PageEvent } from '@angular/material/paginator';
import { ConfirmDialogComponent } from '../components/confirm-dialog/confirm-dialog.component';

export abstract class BaseListResource<T> {
	abstract title: string;
	abstract description: string;
	abstract displayedColumns: string[];
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

	protected confirmDialogRef!: MatDialogRef<ConfirmDialogComponent>;

	constructor(protected _confirmDialog: MatDialog) {}

	protected showConfirmDialog(info: string): void {
		this.confirmDialogRef = this._confirmDialog.open(
			ConfirmDialogComponent,
			{
				...this.dialogConfig,
				data: { action: info },
			}
		);
	}

	onSearch(event: string): void {
		this.filters$.set({
			page: 1,
			size: 10,
			searchTerm: event,
		});

		this.onLoadData();
	}

	onPaginate(event: PageEvent): void {
		this.filters$.set({
			page: event.pageIndex + 1,
			size: event.pageSize,
			searchTerm: this.filters$().searchTerm,
		});
	}

	abstract onEdit(event: any): void;

	abstract onDelete(event: any): void;

	abstract onCreate(event: any): void;

	abstract onLoadData(): void;
}
