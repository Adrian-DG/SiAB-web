import { ChangeDetectionStrategy, Component } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';

@Component({
	selector: 'app-authentication.page',
	standalone: true,
	imports: [
		MatCardModule,
		MatInputModule,
		MatFormFieldModule,
		MatButtonModule,
	],
	templateUrl: './authentication.page.component.html',
	styleUrl: './authentication.page.component.scss',
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AuthenticationPageComponent {}
