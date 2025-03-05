import { Dialog } from '@angular/cdk/dialog';
import {
	AfterViewInit,
	ChangeDetectionStrategy,
	Component,
	inject,
	model,
	OnInit,
	signal,
} from '@angular/core';
import {
	MAT_DIALOG_DATA,
	MatDialogModule,
	MatDialogRef,
} from '@angular/material/dialog';
import { PropiedadesService } from '../../services/propiedades.service';
import { FormularyMetadata } from '../../../../Shared/helpers/formulary-metadata';
import { CommonModule } from '@angular/common';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MarcaService } from '../../services/marca.service';
import { debounceTime, distinctUntilChanged } from 'rxjs';
import { INamedEntity } from '../../../../Shared/Models/inamed-entity.model';
import { CategoriaService } from '../../services/categoria.service';
import { TipoService } from '../../services/tipo.service';
import { SubtipoService } from '../../services/subtipo.service';
import { ModelosService } from '../../services/modelos.service';

@Component({
	selector: 'app-propiedades-form-dialog',
	standalone: true,
	imports: [
		CommonModule,
		MatDialogModule,
		MatAutocompleteModule,
		MatSelectModule,
		MatFormFieldModule,
		MatInputModule,
		MatButtonModule,
		FormsModule,
		ReactiveFormsModule,
	],
	templateUrl: './propiedades-form-dialog.component.html',
	styleUrl: './propiedades-form-dialog.component.scss',
	changeDetection: ChangeDetectionStrategy.OnPush,
	providers: [PropiedadesService],
})
export class PropiedadesFormDialogComponent implements OnInit, AfterViewInit {
	propiedad: string = '';

	data = inject(MAT_DIALOG_DATA);

	marcasControl = new FormControl('');

	categorias$ = signal<INamedEntity[]>([]);
	tipos$ = signal<INamedEntity[]>([]);
	subtipos$ = signal<INamedEntity[]>([]);

	marcas$ = signal<INamedEntity[]>([]);
	modelos$ = signal<INamedEntity[]>([]);

	editModel = {
		categoriaId: 0,
		tipoId: 0,
		subtipoId: 0,
		marcaId: 0,
		modeloId: 0,
		serie: this.data.entity.serie,
	};

	constructor(
		private _dialogRef: MatDialogRef<PropiedadesFormDialogComponent>,
		private _marcasService: MarcaService,
		private _categoriasService: CategoriaService,
		private _tiposService: TipoService,
		private _subTiposService: SubtipoService,
		private _modelosService: ModelosService
	) {}

	ngOnInit(): void {
		this.marcasControl.valueChanges
			.pipe(debounceTime(2000), distinctUntilChanged())
			.subscribe((value: string | null) => {
				this._marcasService
					.getFilter<INamedEntity>(value ?? '')
					.subscribe((data) => {
						this.marcas$.update(() => data);
					});
			});
	}

	ngAfterViewInit(): void {
		this._categoriasService
			.getAll<INamedEntity>()
			.subscribe((data) => this.categorias$.update(() => data));

		this._tiposService
			.getAll<INamedEntity>()
			.subscribe((data) => this.tipos$.update(() => data));

		this._subTiposService
			.getSubTiposByTipoId(this.data.tipo)
			.subscribe((data) => this.subtipos$.update(() => data));
	}

	displayMarca(entity: INamedEntity): string {
		return entity?.nombre ?? '';
	}

	onMarcaSelected(): void {
		this._modelosService
			.getModelosByMarcaId(
				(this.marcasControl.value as unknown as INamedEntity).nombre
			)
			.subscribe((data) => this.modelos$.update(() => data));
	}

	onUpdate(event: any): void {
		throw new Error('Method not implemented.');
	}
}
