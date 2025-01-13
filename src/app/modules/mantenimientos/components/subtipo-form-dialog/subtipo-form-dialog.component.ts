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
import { MatSelectModule } from '@angular/material/select';
import { SubtipoService } from '../../services/subtipo.service';
import { TipoService } from '../../services/tipo.service';
import { UpdateCreateDialogActionsComponent } from '../../../../Shared/components/update-create-dialog-actions/update-create-dialog-actions.component';
import { FormsModule } from '@angular/forms';
import { FormularyMetadata } from '../../../../Shared/helpers/formulary-metadata';
import { ISubtipoDetail } from '../../models/isubtipo-detail.model';
import { INamedEntity } from '../../../../Shared/Models/inamed-entity.model';
import { ICreateSubtipoDto } from '../../dtos/icreate-subtipo.dto';
import { IUpdateEntityDto } from '../../dtos/iupdate-entity.dto';

@Component({
	selector: 'app-subtipo-form-dialog',
	standalone: true,
	imports: [
		MatDialogModule,
		MatButtonModule,
		MatFormFieldModule,
		MatSelectModule,
		MatInputModule,
		FormsModule,
		UpdateCreateDialogActionsComponent,
	],
	templateUrl: './subtipo-form-dialog.component.html',
	styleUrl: './subtipo-form-dialog.component.scss',
	changeDetection: ChangeDetectionStrategy.OnPush,
	providers: [SubtipoService, TipoService],
})
export class SubtipoFormDialogComponent
	extends FormularyMetadata<SubtipoFormDialogComponent, ISubtipoDetail>
	implements OnInit
{
	tipos$ = signal<INamedEntity[]>([]);
	subTipo = this.isUpdate ? this.data.entity.nombre : '';
	tipo = this.isUpdate ? this.data.entity.tipoId : 0;

	constructor(
		protected _dialogRef: MatDialogRef<SubtipoFormDialogComponent>,
		private subtipoService: SubtipoService,
		private tipoService: TipoService
	) {
		super(_dialogRef);
	}

	ngOnInit(): void {
		this.tipoService
			.getAll<INamedEntity>()
			.subscribe((tipos: INamedEntity[]) => {
				this.tipos$.set(tipos);
			});
	}

	override onSave(event: any): void {
		if (this.subTipo !== '' && this.tipo !== 0) {
			this.subtipoService
				.create<ICreateSubtipoDto>({
					nombre: this.subTipo,
					tipoId: this.tipo,
				})
				.subscribe(() => this._dialoRef.close());
		}
	}

	override onUpdate(event: any): void {
		const data: IUpdateEntityDto<ISubtipoDetail> = {
			id: this.data.id,
			entity: {
				id: this.data.id,
				nombre: this.subTipo,
				tipo: this.data.entity.tipo,
				tipoId: this.tipo,
			},
		};

		this.subtipoService
			.update<{ nombre: string; tipoId: number }>(data)
			.subscribe(() => this._dialogRef.close());
	}
}
