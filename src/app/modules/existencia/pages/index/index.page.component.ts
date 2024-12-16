import {
	ChangeDetectionStrategy,
	Component,
	OnInit,
	signal,
} from '@angular/core';
import {
	FormControl,
	FormsModule,
	ReactiveFormsModule,
	Validators,
} from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatRadioModule } from '@angular/material/radio';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MiembroService } from '../../services/miembro.service';
import { IMiembroView } from '../../models/imiembro-view.model';
import { IMiembroListDetail } from '../../models/imiembro-list-deatil.model';
import { ConsultaMiembroComponent } from '../../../../Shared/components/consulta-miembro/consulta-miembro.component';

@Component({
	selector: 'app-index',
	standalone: true,
	imports: [
		MatFormFieldModule,
		MatInputModule,
		MatRadioModule,
		MatAutocompleteModule,
		FormsModule,
		ReactiveFormsModule,
		ConsultaMiembroComponent,
	],
	templateUrl: './index.page.component.html',
	styleUrl: './index.page.component.scss',
	changeDetection: ChangeDetectionStrategy.OnPush,
	providers: [MiembroService],
})
export class IndexComponent implements OnInit {
	tipoFiltro: number = 1;
	filtro = new FormControl('', [Validators.minLength(5)]);
	miembrosList = signal<IMiembroListDetail[]>([]);
	miembro = signal<IMiembroView | null>(null);

	constructor(private _miembroService: MiembroService) {}

	ngOnInit(): void {
		this.filtro.valueChanges.subscribe((value: string | null) => {
			if (value && value !== '' && value.length >= 5) {
				this.tipoFiltro === 1
					? this.getMiembrosByCedula(value)
					: this.getMiembrosByCargo(value);
			}
		});
	}

	get tipoFiltroPlaceholder(): string {
		return this.tipoFiltro === 1 ? 'cédula o nombre' : 'cargo o función';
	}

	getMiembrosByCedula(cedula: string) {
		this._miembroService
			.getMiembrosByCedula(cedula)
			.subscribe((miembros: IMiembroListDetail[]) => {
				this.miembrosList.set(miembros);
			});
	}

	getMiembrosByCargo(value: string) {
		throw new Error('Method not implemented.');
	}

	getMiembroByCedula(event: any) {
		this._miembroService
			.getMiembroByCedula(this.filtro.value as string)
			.subscribe((miembro: IMiembroView) => {
				this.miembro.set(miembro);
			});
	}
}
