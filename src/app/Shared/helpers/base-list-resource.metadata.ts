import { computed, OnInit, signal } from '@angular/core';
import { IPaginationFilter } from '../dtos/ipagination-filter.dto';
import {
	MatDialog,
	MatDialogConfig,
	MatDialogRef,
} from '@angular/material/dialog';
import { PageEvent } from '@angular/material/paginator';
import { ConfirmDialogComponent } from '../components/confirm-dialog/confirm-dialog.component';
import { IUpdateEntityDto } from '../../modules/mantenimientos/dtos/iupdate-entity.dto';
import { IPagedData } from '../Models/ipaged-data.model';
import { BaseDialogDimensions } from './base-dialog-dimmensions.metadata';

export abstract class BaseListResource<T> {
	abstract title: string;
	abstract description: string;
	abstract displayedColumns: string[];
	protected filters$ = signal<IPaginationFilter>({
		page: 1,
		size: 5,
		searchTerm: '',
	});

	protected data$ = signal<IPagedData<T>>({
		page: this.filters$().page,
		size: this.filters$().size,
		totalCount: 0,
		rows: [],
	});

	protected dialogConfig: MatDialogConfig = { ...BaseDialogDimensions };

	protected confirmDialogRef!: MatDialogRef<ConfirmDialogComponent>;

	constructor(protected _dialog: MatDialog) {}

	protected showConfirmDialog(info: string): void {
		this.confirmDialogRef = this._dialog.open(ConfirmDialogComponent, {
			...BaseDialogDimensions,
			data: { action: info },
		});
	}

	onSearch(event: any): void {
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
		this.onLoadData();
	}

	abstract onEdit(event: IUpdateEntityDto<any>): void;

	abstract onDelete(event: number): void;

	abstract onCreate(event: any): void;

	abstract onLoadData(): void;
}
