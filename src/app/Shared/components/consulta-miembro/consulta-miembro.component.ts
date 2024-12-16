import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { IMiembroView } from '../../../modules/existencia/models/imiembro-view.model';
import { CommonModule } from '@angular/common';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
	selector: 'app-consulta-miembro',
	standalone: true,
	imports: [MatCardModule, MatFormFieldModule, MatInputModule, CommonModule],
	templateUrl: './consulta-miembro.component.html',
	styleUrl: './consulta-miembro.component.scss',
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ConsultaMiembroComponent {
	@Input() miembro!: IMiembroView | null;

	constructor(private sanitizer: DomSanitizer) {}

	get rangoProfoseion(): string {
		return `${this.miembro?.rango}, ${this.miembro?.profesion}`;
	}

	get fotoMiembro() {
		return this.miembro?.foto
			? this.sanitizer.bypassSecurityTrustUrl(
					'data:image/jpg;base64,' + this.miembro?.foto
			  )
			: '../../../../../public/empty-miembro.png';
	}
}
