import { ChangeDetectionStrategy, Component } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { AuthenticationService } from '../../services/authentication.service';
import {
	FormControl,
	FormGroup,
	FormsModule,
	ReactiveFormsModule,
	Validators,
} from '@angular/forms';
import { IUsuarioLoginDto } from '../../dto/iusuario-login.dto';

@Component({
	selector: 'app-authentication.page',
	standalone: true,
	imports: [
		MatCardModule,
		MatInputModule,
		MatFormFieldModule,
		MatButtonModule,
		ReactiveFormsModule,
	],
	templateUrl: './authentication.page.component.html',
	styleUrl: './authentication.page.component.scss',
	changeDetection: ChangeDetectionStrategy.OnPush,
	providers: [AuthenticationService],
})
export class AuthenticationPageComponent {
	loginForm = new FormGroup({
		username: new FormControl('', [Validators.required]),
		password: new FormControl('', [Validators.required]),
	});

	constructor(private _authService: AuthenticationService) {}

	login(): void {
		this._authService.login(this.loginForm.value as IUsuarioLoginDto);
	}
}
