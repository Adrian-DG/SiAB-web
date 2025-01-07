import { ChangeDetectionStrategy, Component } from '@angular/core';
import {
	FormControl,
	FormGroup,
	ReactiveFormsModule,
	Validators,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';

@Component({
	selector: 'app-create.page',
	standalone: true,
	imports: [
		MatCardModule,
		MatFormFieldModule,
		MatInputModule,
		MatSelectModule,
		MatButtonModule,
		ReactiveFormsModule,
	],
	templateUrl: './create.page.component.html',
	styleUrl: './create.page.component.scss',
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CreatePageComponent {
	usuarioForm: FormGroup = new FormGroup({
		cedula: new FormControl('', [Validators.required]),
		nombre: new FormControl('', [Validators.required]),
		apellido: new FormControl('', [Validators.required]),
		username: new FormControl('', [Validators.required]),
		password: new FormControl('', [Validators.required]),
		rango: new FormControl(''),
	});
}
