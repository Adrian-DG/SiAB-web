import {
	ChangeDetectionStrategy,
	Component,
	CUSTOM_ELEMENTS_SCHEMA,
} from '@angular/core';
import { PageIntroComponent } from '../../../../Shared/components/page-intro/page-intro.component';

@Component({
	selector: 'app-marcas',
	standalone: true,
	imports: [PageIntroComponent],
	templateUrl: './marcas.page.component.html',
	styleUrl: './marcas.page.component.scss',
	changeDetection: ChangeDetectionStrategy.OnPush,
	schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class MarcasPageComponent {
	title = 'Marcas';
	description = 'mantenimiento de marcas.';

	search(event: string): void {
		console.log(event);
	}
}
