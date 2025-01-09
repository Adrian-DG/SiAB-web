import { OnInit, signal } from '@angular/core';
import { IPaginationFilter } from '../dtos/ipagination-filter.dto';
import {
	MatDialog,
	MatDialogConfig,
	MatDialogRef,
} from '@angular/material/dialog';
import { PageEvent } from '@angular/material/paginator';
import { ConfirmDialogComponent } from '../components/confirm-dialog/confirm-dialog.component';
import { IUpdateEntityDto } from '../../modules/mantenimientos/dtos/iupdate-entity.dto';

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
		minWidth: 500,
		maxWidth: 800,
		role: 'alertdialog',
	};

	protected confirmDialogRef!: MatDialogRef<ConfirmDialogComponent>;

	constructor(protected _dialog: MatDialog) {}

	protected showConfirmDialog(info: string): void {
		this.confirmDialogRef = this._dialog.open(ConfirmDialogComponent, {
			...this.dialogConfig,
			data: { action: info },
		});
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

	abstract onEdit(event: IUpdateEntityDto<any>): void;

	abstract onDelete(event: number): void;

	abstract onCreate(event: any): void;

	abstract onLoadData(): void;
}
