import { Component, OnInit, signal } from '@angular/core';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { ModelosService } from '../../services/modelos.service';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import {
	FormControl,
	FormGroup,
	FormsModule,
	ReactiveFormsModule,
	Validators,
} from '@angular/forms';
import { MatSelectModule } from '@angular/material/select';
import { MarcaService } from '../../services/marca.service';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { INamedEntity } from '../../../../Shared/Models/inamed-entity.model';
import { ICreateModeloDto } from '../../dtos/icreate-modelo.dto';
import { FileInputComponent } from '../../../../Shared/components/file-input/file-input.component';
import { FormularyMetadata } from '../../../../Shared/helpers/formulary-metadata';
import { IModeloDetail } from '../../models/imodelo-detail.model';
import { UpdateCreateDialogActionsComponent } from '../../../../Shared/components/update-create-dialog-actions/update-create-dialog-actions.component';
import { CommonModule } from '@angular/common';
import { IUpdateEntityDto } from '../../dtos/iupdate-entity.dto';

@Component({
	selector: 'app-modelo-form-dialog',
	standalone: true,
	imports: [
		CommonModule,
		MatDialogModule,
		MatFormFieldModule,
		MatInputModule,
		MatButtonModule,
		MatAutocompleteModule,
		FormsModule,
		ReactiveFormsModule,
		FileInputComponent,
		UpdateCreateDialogActionsComponent,
	],
	templateUrl: './modelo-form-dialog.component.html',
	styleUrls: ['./modelo-form-dialog.component.scss'],
	providers: [ModelosService, MarcaService],
})
export class ModeloFormDialogComponent
	extends FormularyMetadata<ModeloFormDialogComponent, IModeloDetail>
	implements OnInit
{
	constructor(
		private dialogRef: MatDialogRef<ModeloFormDialogComponent>,
		private modeloService: ModelosService,
		private marcasService: MarcaService
	) {
		super(dialogRef);
	}

	fotoModelo!: string | null;

	nombreControl = new FormControl('', [Validators.required]);
	marcaControl = new FormControl('');

	marcas$ = signal<INamedEntity[]>([]);

	ngOnInit(): void {
		this.marcaControl.valueChanges.subscribe((value: string | null) => {
			if (value && value !== '' && value.length > 2) {
				setTimeout(() => {
					this.marcasService
						.getFilter<INamedEntity>(value)
						.subscribe((marcas: INamedEntity[]) => {
							this.marcas$.set(marcas);
						});
				}, 2000);
			}
		});

		if (this.isUpdate) {
			this.fotoModelo = this.data.entity?.foto || null;
			this.nombreControl.setValue(this.data.entity?.nombre);
			this.marcaControl.setValue(this.data.entity?.marca);
		}
	}

	displayMarca(marca: INamedEntity): string {
		return marca?.nombre || '';
	}

	onFileUploaded(event: any): void {
		this.fotoModelo = event;
	}

	override onSave(event: any): void {
		if (this.nombreControl.valid && this.marcaControl.valid) {
			const marca = this.marcaControl.value as unknown as INamedEntity;
			const modelo: ICreateModeloDto = {
				nombre: this.nombreControl.value ?? '',
				marcaId: marca.id,
				foto: this.fotoModelo ?? null,
			};

			this.modeloService.create(modelo).subscribe(() => {
				this.dialogRef.close();
			});
		}
	}

	override onUpdate(event: any): void {
		if (this.nombreControl.valid && this.marcaControl.valid) {
			const marca = this.marcaControl.value;

			let marcaId = 0;

			if (typeof marca === 'string') {
				console.log('Marca string: ');
				marcaId = this.data.entity?.marcaId;
			} else {
				console.log('Marca Object: ');
				marcaId = (marca as unknown as INamedEntity).id;
			}

			const modelo: IUpdateEntityDto<{
				nombre: string;
				marcaId: number;
				foto: string;
			}> = {
				id: this.data.entity?.id,
				entity: {
					nombre: this.nombreControl.value ?? '',
					marcaId: marcaId,
					foto: this.fotoModelo || '',
				},
			};

			this.modeloService.update(modelo).subscribe(() => {
				this.dialogRef.close();
			});
		}
	}
}
