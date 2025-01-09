import { Inject, inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { IUpdateEntityDto } from '../../modules/mantenimientos/dtos/iupdate-entity.dto';

export abstract class FormularyMetadata<C, T> {
	public data: IUpdateEntityDto<T> = inject(MAT_DIALOG_DATA);
	constructor(protected _dialoRef: MatDialogRef<C>) {}

	abstract onSave(): void;
	abstract onUpdate(): void;

	get isUpdate(): boolean {
		return this.data !== null;
	}

	get customTitle(): string {
		return this.isUpdate
			? `Editar registro ${this.data?.id}`
			: 'Formulario';
	}
}
