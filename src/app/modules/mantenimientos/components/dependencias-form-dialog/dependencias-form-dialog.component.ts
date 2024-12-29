import { ChangeDetectionStrategy, Component } from '@angular/core';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { FormsModule } from '@angular/forms';
import { DependenciasService } from '../../services/dependencias.service';
import { ICreateDependenciaDto } from '../../dtos/icreate-dependencia.dto';
import { MatButtonModule } from '@angular/material/button';
import { FormularyMetadata } from '../../../../Shared/helpers/formulary-metadata';

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
	],
	templateUrl: './dependencias-form-dialog.component.html',
	styleUrl: './dependencias-form-dialog.component.scss',
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DependenciasFormDialogComponent extends FormularyMetadata {
	dependenciaObj = {
		nombre: '',
		esExterna: false,
	};

	constructor(private _dependenciasService: DependenciasService) {
		super();
	}

	override onSave() {
		const dependencia: ICreateDependenciaDto = {
			nombre: this.dependenciaObj.nombre.toUpperCase(),
			esExterna: this.dependenciaObj.esExterna,
		};
		this._dependenciasService.create(dependencia).subscribe(() => {});
	}
}
