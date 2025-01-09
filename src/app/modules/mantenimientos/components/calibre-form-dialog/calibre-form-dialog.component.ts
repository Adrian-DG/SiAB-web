import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import {
	MAT_DIALOG_DATA,
	MatDialog,
	MatDialogModule,
	MatDialogRef,
} from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { CalibreService } from '../../services/calibre.service';
import { FormsModule } from '@angular/forms';
import { FormularyMetadata } from '../../../../Shared/helpers/formulary-metadata';
import { IUpdateEntityDto } from '../../dtos/iupdate-entity.dto';
import { INamedEntity } from '../../../../Shared/Models/inamed-entity.model';
import { ConfirmDialogComponent } from '../../../../Shared/components/confirm-dialog/confirm-dialog.component';
import { UpdateCreateDialogActionsComponent } from '../../../../Shared/components/update-create-dialog-actions/update-create-dialog-actions.component';

@Component({
	selector: 'app-calibre-form',
	standalone: true,
	imports: [
		MatDialogModule,
		MatFormFieldModule,
		MatInputModule,
		MatButtonModule,
		FormsModule,
		UpdateCreateDialogActionsComponent,
	],
	templateUrl: './calibre-form-dialog.component.html',
	styleUrl: './calibre-form-dialog.component.scss',
	changeDetection: ChangeDetectionStrategy.OnPush,
	providers: [CalibreService],
})
export class CalibreFormDialogComponent extends FormularyMetadata<
	CalibreFormDialogComponent,
	INamedEntity
> {
	calibre: string = '';

	constructor(
		protected override _dialoRef: MatDialogRef<CalibreFormDialogComponent>,
		private _calibreService: CalibreService
	) {
		super(_dialoRef);
	}

	override onSave(event: any): void {
		this._calibreService.create(this.calibre).subscribe(() => {
			this.calibre = '';
			this._dialoRef.close();
		});
	}

	override onUpdate(event: any): void {
		this._calibreService.update(this.data).subscribe(() => {
			this._dialoRef.close();
		});
	}
}
