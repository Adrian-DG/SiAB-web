import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormularyMetadata } from '../../../../Shared/helpers/formulary-metadata';
import { INamedEntity } from '../../../../Shared/Models/inamed-entity.model';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MarcaService } from '../../services/marca.service';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { UpdateCreateDialogActionsComponent } from '../../../../Shared/components/update-create-dialog-actions/update-create-dialog-actions.component';
import { MatInputModule } from '@angular/material/input';

@Component({
	selector: 'app-marcas-form-dialog',
	standalone: true,
	imports: [
		CommonModule,
		MatDialogModule,
		MatButtonModule,
		MatFormFieldModule,
		MatInputModule,
		FormsModule,
		UpdateCreateDialogActionsComponent,
	],
	templateUrl: './marcas-form-dialog.component.html',
	styleUrl: './marcas-form-dialog.component.scss',
	changeDetection: ChangeDetectionStrategy.OnPush,
	providers: [MarcaService],
})
export class MarcasFormDialogComponent extends FormularyMetadata<
	MarcasFormDialogComponent,
	INamedEntity
> {
	marca = '';
	constructor(
		protected dialogRef: MatDialogRef<MarcasFormDialogComponent>,
		private _marcaService: MarcaService
	) {
		super(dialogRef);
	}

	override onSave(event: any): void {
		if (this.marca !== '') {
			this._marcaService
				.create<{ nombre: string }>({ nombre: this.marca })
				.subscribe(() => {
					this.dialogRef.close();
				});
		}
	}

	override onUpdate(event: any): void {
		this._marcaService.update<INamedEntity>(this.data).subscribe(() => {
			this.dialogRef.close();
		});
	}
}
