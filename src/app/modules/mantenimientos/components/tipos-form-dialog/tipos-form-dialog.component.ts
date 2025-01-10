import { ChangeDetectionStrategy, Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { UpdateCreateDialogActionsComponent } from '../../../../Shared/components/update-create-dialog-actions/update-create-dialog-actions.component';
import { TipoService } from '../../services/tipo.service';
import { FormularyMetadata } from '../../../../Shared/helpers/formulary-metadata';
import { INamedEntity } from '../../../../Shared/Models/inamed-entity.model';
import { FormsModule } from '@angular/forms';

@Component({
	selector: 'app-tipos-form-dialog',
	standalone: true,
	imports: [
		MatDialogModule,
		MatButtonModule,
		MatFormFieldModule,
		MatInputModule,
		FormsModule,
		UpdateCreateDialogActionsComponent,
	],
	templateUrl: './tipos-form-dialog.component.html',
	styleUrl: './tipos-form-dialog.component.scss',
	changeDetection: ChangeDetectionStrategy.OnPush,
	providers: [TipoService],
})
export class TiposFormDialogComponent extends FormularyMetadata<
	TiposFormDialogComponent,
	INamedEntity
> {
	tipo = '';
	constructor(
		protected dialogRef: MatDialogRef<TiposFormDialogComponent>,
		private _tipoService: TipoService
	) {
		super(dialogRef);
	}

	override onSave(event: any): void {
		this._tipoService
			.create<{ nombre: string }>({ nombre: this.tipo })
			.subscribe((res) => {
				this.dialogRef.close(res);
			});
	}
	override onUpdate(event: any): void {
		this._tipoService.update<INamedEntity>(this.data).subscribe((res) => {
			this.dialogRef.close(res);
		});
	}
}
