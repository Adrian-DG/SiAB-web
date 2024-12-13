import { ChangeDetectionStrategy, Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';

@Component({
	selector: 'app-not-found',
	standalone: true,
	imports: [MatCardModule, MatButtonModule],
	templateUrl: './notFound.page.component.html',
	styleUrl: './notFound.page.component.scss',
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NotFoundComponent {}
