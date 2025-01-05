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

@Component({
	selector: 'app-modelo-form-dialog',
	standalone: true,
	imports: [
		MatDialogModule,
		MatFormFieldModule,
		MatInputModule,
		MatButtonModule,
		MatAutocompleteModule,
		ReactiveFormsModule,
	],
	templateUrl: './modelo-form-dialog.component.html',
	styleUrls: ['./modelo-form-dialog.component.scss'],
	providers: [ModelosService, MarcaService],
})
export class ModeloFormDialogComponent implements OnInit {
	fotoModelo!: string | null;
	fotoModeloBase64!: string | null;
	modeloForm: FormGroup = new FormGroup({
		nombre: new FormControl('', Validators.required),
		marca: new FormControl(''),
	});

	marcas$ = signal<INamedEntity[]>([]);

	constructor(
		private dialogRef: MatDialogRef<ModeloFormDialogComponent>,
		private modeloService: ModelosService,
		private marcasService: MarcaService
	) {}

	ngOnInit(): void {
		this.modeloForm.controls['marca'].valueChanges.subscribe(
			(value: string | null) => {
				if (value && value !== '' && value.length > 2) {
					setTimeout(() => {
						this.marcasService
							.getFilter<INamedEntity>(value)
							.subscribe((marcas: INamedEntity[]) => {
								this.marcas$.set(marcas);
							});
					}, 2000);
				}
			}
		);
	}

	displayMarca(marca: INamedEntity): string {
		return marca?.nombre || '';
	}

	onFileSelected(event: Event): void {
		const input = event.target as HTMLInputElement;
		if (input.files && input.files.length > 0) {
			const file = input.files[0];
			const reader = new FileReader();
			reader.onload = () => {
				this.fotoModelo = reader.result as string;
				console.log(this.fotoModelo); // Base64 string
			};
			reader.readAsDataURL(file);
		}
	}

	create(): void {
		const { nombre, marca } = this.modeloForm.value;

		const modeloObj: ICreateModeloDto = {
			nombre: nombre,
			marcaId: marca.id,
			foto: this.fotoModelo ?? null,
		};

		console.log(modeloObj);

		this.modeloService.create(modeloObj).subscribe(() => {
			this.dialogRef.close();
		});
	}
}
