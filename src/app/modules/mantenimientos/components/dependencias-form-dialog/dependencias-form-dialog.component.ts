import { ChangeDetectionStrategy, Component } from '@angular/core';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { FormsModule } from '@angular/forms';
import { DependenciasService } from '../../services/dependencias.service';
import { ICreateDependenciaDto } from '../../dtos/icreate-dependencia.dto';
import { MatButtonModule } from '@angular/material/button';
import { FormularyMetadata } from '../../../../Shared/helpers/formulary-metadata';
import { IUpdateEntityDto } from '../../dtos/iupdate-entity.dto';
import { INamedEntity } from '../../../../Shared/Models/inamed-entity.model';
import { UpdateCreateDialogActionsComponent } from '../../../../Shared/components/update-create-dialog-actions/update-create-dialog-actions.component';

@Component({
	selector: 'app-dependencias-form-dialog',
	standalone: true,
	imports: [
		MatDialogModule,
		MatFormFieldModule,
		MatInputModule,
		MatCheckboxModule,
		MatButtonModule,
		FormsModule,
		UpdateCreateDialogActionsComponent,
	],
	templateUrl: './dependencias-form-dialog.component.html',
	styleUrl: './dependencias-form-dialog.component.scss',
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DependenciasFormDialogComponent extends FormularyMetadata<
	DependenciasFormDialogComponent,
	INamedEntity
> {
	dependenciaObj = {
		nombre: '',
		esExterna: false,
	};

	constructor(
		protected override _dialoRef: MatDialogRef<DependenciasFormDialogComponent>,
		private _dependenciasService: DependenciasService
	) {
		super(_dialoRef);
	}

	override onSave(event: any): void {
		const dependencia: ICreateDependenciaDto = {
			nombre: this.dependenciaObj.nombre.toUpperCase(),
			esExterna: this.dependenciaObj.esExterna,
		};
		this._dependenciasService.create(dependencia).subscribe(() => {});
	}

	override onUpdate(event: any): void {
		this._dependenciasService.update(this.data).subscribe(() => {
			this._dialoRef.close();
		});
	}
}
