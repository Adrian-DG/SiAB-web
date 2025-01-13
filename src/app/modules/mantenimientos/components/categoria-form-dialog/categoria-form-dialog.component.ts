import {
	ChangeDetectionStrategy,
	Component,
	CUSTOM_ELEMENTS_SCHEMA,
} from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { PageIntroComponent } from '../../../../Shared/components/page-intro/page-intro.component';
import { CategoriaService } from '../../services/categoria.service';
import { FormularyMetadata } from '../../../../Shared/helpers/formulary-metadata';
import { INamedEntity } from '../../../../Shared/Models/inamed-entity.model';
import { UpdateCreateDialogActionsComponent } from '../../../../Shared/components/update-create-dialog-actions/update-create-dialog-actions.component';
import { FormsModule } from '@angular/forms';
import { IUpdateEntityDto } from '../../dtos/iupdate-entity.dto';

@Component({
	selector: 'app-categoria-form-dialog',
	standalone: true,
	imports: [
		MatDialogModule,
		MatFormFieldModule,
		MatInputModule,
		MatButtonModule,
		FormsModule,
		UpdateCreateDialogActionsComponent,
	],
	templateUrl: './categoria-form-dialog.component.html',
	styleUrl: './categoria-form-dialog.component.scss',
	changeDetection: ChangeDetectionStrategy.OnPush,
	providers: [CategoriaService],
	schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class CategoriaFormDialogComponent extends FormularyMetadata<
	CategoriaFormDialogComponent,
	INamedEntity
> {
	nombre = this.isUpdate ? this.data.entity.nombre : '';

	constructor(
		protected override _dialoRef: MatDialogRef<CategoriaFormDialogComponent>,
		private _categoriaService: CategoriaService
	) {
		super(_dialoRef);
	}

	override onSave(event: any): void {
		this._categoriaService
			.create<{ nombre: string }>({
				nombre: this.nombre,
			})
			.subscribe(() => {
				this._dialoRef.close();
			});
	}

	override onUpdate(event: any): void {
		const data: IUpdateEntityDto<INamedEntity> = {
			id: this.data.entity.id,
			entity: {
				id: this.data.entity.id,
				nombre: this.nombre,
			},
		};

		this._categoriaService
			.update<{ nombre: string }>(data)
			.subscribe(() => {
				this._dialoRef.close();
			});
	}
}
