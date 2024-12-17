import {
	AfterViewInit,
	ChangeDetectionStrategy,
	Component,
	signal,
} from '@angular/core';
import {
	FormControl,
	FormGroup,
	ReactiveFormsModule,
	Validators,
} from '@angular/forms';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatDividerModule } from '@angular/material/divider';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { INamedEntity } from '../../../../Shared/Models/inamed-entity.model';

@Component({
	selector: 'app-cargo-descargo.page',
	standalone: true,
	imports: [
		MatDividerModule,
		MatFormFieldModule,
		MatInputModule,
		MatSelectModule,
		MatAutocompleteModule,
		ReactiveFormsModule,
	],
	templateUrl: './cargo-descargo.page.component.html',
	styleUrl: './cargo-descargo.page.component.scss',
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CargoDescargoPageComponent implements AfterViewInit {
	debitoControl = new FormControl('', Validators.required);
	creditosControl = new FormControl('', Validators.required);
	articuloControl = new FormControl('');

	cargoDescargoForm = new FormGroup({
		debito: this.debitoControl,
		creditos: this.creditosControl,
	});

	debitosList = signal<INamedEntity[]>([]);
	creditosList = signal<INamedEntity[]>([]);
	articulosList = signal<INamedEntity[]>([]);

	constructor() {}

	ngAfterViewInit(): void {
		// TODO: Implementar busqueda de debitos y creditos

		this.debitoControl.valueChanges.subscribe((value) => {
			console.log(value);
		});

		this.creditosControl.valueChanges.subscribe((value) => {
			console.log(value);
		});

		this.articuloControl.valueChanges.subscribe((value) => {});
	}
}
