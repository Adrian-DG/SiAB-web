import { ChangeDetectionStrategy, Component } from '@angular/core';
import { MatCardModule } from '@angular/material/card';

@Component({
	selector: 'app-module-index.page',
	standalone: true,
	imports: [MatCardModule],
	template: './module-index.page.component.html',
	styleUrl: './module-index.page.component.scss',
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ModuleIndexPageComponent {}
