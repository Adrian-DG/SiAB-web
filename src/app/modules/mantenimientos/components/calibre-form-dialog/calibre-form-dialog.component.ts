import { ChangeDetectionStrategy, Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { CalibreService } from '../../services/calibre.service';
import { FormsModule } from '@angular/forms';

@Component({
	selector: 'app-calibre-form',
	standalone: true,
	imports: [
		MatDialogModule,
		MatFormFieldModule,
		MatInputModule,
		MatButtonModule,
		FormsModule,
	],
	templateUrl: './calibre-form-dialog.component.html',
	styleUrl: './calibre-form-dialog.component.scss',
	changeDetection: ChangeDetectionStrategy.OnPush,
	providers: [CalibreService],
})
export class CalibreFormDialogComponent {
	calibre: string = '';
	constructor(private _calibreService: CalibreService) {}
	save(): void {
		this._calibreService.create(this.calibre).subscribe(() => {
			this.calibre = '';
		});
	}
}
