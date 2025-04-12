import { ChangeDetectionStrategy, Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import {
	MatDialog,
	MatDialogModule,
	MatDialogRef,
} from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormularyMetadata } from '../../../../Shared/helpers/formulary-metadata';
import { FormsModule } from '@angular/forms';
import { INamedEntity } from '../../../../Shared/Models/inamed-entity.model';
import { TiposDocumentosService } from '../../services/tipos-documentos.service';

@Component({
	selector: 'app-tipos-documentos-form-dialog',
	standalone: true,
	imports: [
		MatDialogModule,
		MatButtonModule,
		MatFormFieldModule,
		MatInputModule,
		FormsModule,
	],
	template: `
		<h2 mat-dialog-title>{{ customTitle }}</h2>
		<mat-dialog-content>
			<mat-form-field appearance="fill" style="width: 100%;">
				<mat-label>Nombre</mat-label>
				<input matInput [(ngModel)]="nombre" />
			</mat-form-field>
		</mat-dialog-content>
		<mat-dialog-actions>
			@if (!isUpdate) {
			<button mat-button (click)="onSave($event)">Guardar</button>
			} @else {
			<button mat-button (click)="onUpdate($event)">Actualizar</button>
			}
			<button mat-button mat-dialog-close="">Cerrar</button>
		</mat-dialog-actions>
	`,
	styleUrl: './tipos-documentos-form-dialog.component.scss',
	changeDetection: ChangeDetectionStrategy.OnPush,
	providers: [TiposDocumentosService],
})
export class TiposDocumentosFormDialogComponent extends FormularyMetadata<
	TiposDocumentosFormDialogComponent,
	INamedEntity
> {
	nombre = this.isUpdate ? this.data.entity.nombre : '';

	constructor(
		protected override _dialoRef: MatDialogRef<TiposDocumentosFormDialogComponent>,
		private _tiposDocumentosService: TiposDocumentosService
	) {
		super(_dialoRef);
	}

	override onSave(event: any): void {
		this._tiposDocumentosService
			.create<INamedEntity>({ id: 0, nombre: this.nombre })
			.subscribe((data) => {
				this._dialoRef.close(data);
			});
	}

	override onUpdate(event: any): void {
		this._tiposDocumentosService
			.update<INamedEntity>(this.data)
			.subscribe((data) => {
				this._dialoRef.close(data);
			});
	}
}
