import {
	ChangeDetectionStrategy,
	Component,
	OnInit,
	signal,
} from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { UpdateCreateDialogActionsComponent } from '../../../../Shared/components/update-create-dialog-actions/update-create-dialog-actions.component';
import { TipoService } from '../../services/tipo.service';
import { FormularyMetadata } from '../../../../Shared/helpers/formulary-metadata';
import { INamedEntity } from '../../../../Shared/Models/inamed-entity.model';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { ITipoDetail } from '../../models/itipo-detail.model';
import { ICreateTipoDto } from '../../dtos/icreate-tipo.dto';
import { CategoriaService } from '../../services/categoria.service';
import { MatSelectModule } from '@angular/material/select';
import { IUpdateEntityDto } from '../../dtos/iupdate-entity.dto';

@Component({
	selector: 'app-tipos-form-dialog',
	standalone: true,
	imports: [
		MatSelectModule,
		MatDialogModule,
		MatButtonModule,
		MatFormFieldModule,
		MatInputModule,
		FormsModule,
		ReactiveFormsModule,
		UpdateCreateDialogActionsComponent,
	],
	templateUrl: './tipos-form-dialog.component.html',
	styleUrl: './tipos-form-dialog.component.scss',
	changeDetection: ChangeDetectionStrategy.OnPush,
	providers: [TipoService, CategoriaService],
})
export class TiposFormDialogComponent
	extends FormularyMetadata<TiposFormDialogComponent, ITipoDetail>
	implements OnInit
{
	tipo = this.isUpdate ? this.data.entity.nombre : '';
	categoria = this.isUpdate ? this.data.entity.categoriaId : 0;
	categorias$ = signal<INamedEntity[]>([]);
	constructor(
		protected dialogRef: MatDialogRef<TiposFormDialogComponent>,
		private _tipoService: TipoService,
		private _categoriaService: CategoriaService
	) {
		super(dialogRef);
	}

	ngOnInit(): void {
		this._categoriaService
			.getAll<INamedEntity>()
			.subscribe((data: INamedEntity[]) => {
				this.categorias$.set(data);
			});
	}

	displayTipoFn(tipo: INamedEntity): string {
		return tipo && tipo.nombre ? tipo.nombre : '';
	}

	override onSave(event: any): void {
		if (this.tipo !== '' && this.categoria !== 0) {
			this._tipoService
				.create<ICreateTipoDto>({
					nombre: this.tipo,
					categoriaId: this.categoria,
				})
				.subscribe((res) => {
					this.dialogRef.close(res);
				});
		}
	}

	override onUpdate(event: any): void {
		const data: IUpdateEntityDto<ITipoDetail> = {
			id: this.data.id,
			entity: {
				id: this.data.id,
				nombre: this.tipo,
				categoriaId: this.categoria,
				categoria: this.data.entity.categoria,
			},
		};

		this._tipoService
			.update<{ nombre: string; categoriaId: number }>(data)
			.subscribe((res) => {
				this.dialogRef.close(res);
			});
	}
}
