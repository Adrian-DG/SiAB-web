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
import { JCEService } from '../../../../Shared/Services/JCE.service';
import { IJCEModel } from '../../../../Shared/Models/ijce-model';
import { MiembroListItemComponent } from '../../../../Shared/components/miembro-list-item/miembro-list-item.component';

export enum TipoBusqueda {
	MIEMBRO = 1,
	FUNCION = 2,
	CIVIL = 3,
}

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
		MiembroListItemComponent,
	],
	templateUrl: './index.page.component.html',
	styleUrl: './index.page.component.scss',
	changeDetection: ChangeDetectionStrategy.OnPush,
	providers: [MiembroService, JCEService],
})
export class IndexComponent implements OnInit {
	tipoFiltro: number = 1;
	filtro = new FormControl('', [Validators.minLength(5)]);
	miembrosList = signal<IMiembroListDetail[]>([]);
	miembro = signal<IMiembroView | null>(null);

	constructor(
		private _miembroService: MiembroService,
		private _jceService: JCEService
	) {}

	ngOnInit(): void {
		this.filtro.valueChanges.subscribe((value: string | null) => {
			if (this.tipoFiltro === this.tipoBusqueda.CIVIL) {
				if (value && value !== '' && value.length >= 13)
					this.geCivilByCedula(value);
			} else {
				if (value && value !== '' && value.length >= 5) {
					this.tipoFiltro === 1
						? this.getMiembrosByCedulaNombre(value)
						: this.getMiembrosByCargo(value);
				}
			}
		});
	}

	get searchHelpText() {
		return this.tipoFiltro === this.tipoBusqueda.MIEMBRO
			? 'Buscar por cédula o nombre'
			: this.tipoFiltro === this.tipoBusqueda.FUNCION
			? 'Buscar por cargo o función'
			: 'Buscar por cédula civil, favor incluir guiones (-)';
	}

	get tipoBusqueda() {
		return TipoBusqueda;
	}

	get tipoFiltroPlaceholder(): string {
		return this.tipoFiltro === this.tipoBusqueda.MIEMBRO
			? 'cédula o nombre'
			: this.tipoFiltro === this.tipoBusqueda.FUNCION
			? 'cargo o función'
			: 'cédula civil';
	}

	getMiembrosByCedulaNombre(param: string) {
		this._miembroService
			.getMiembrosByCedulaNombre(param)
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

	geCivilByCedula(event: any) {
		this._jceService
			.getCivilByCedula(this.filtro.value as string)
			.subscribe((civil: IJCEModel) => {
				console.log(civil);
				const obj = {
					foto: civil.foto,
					cedula: civil.cedula,
					nombreApellidoCompleto: civil.nombreCompleto,
					rango: 'Civil',
					profesion: 'N/A',
					institucion: 'N/A',
					departamento: 'N/A',
					cargo: 'N/A',
				};

				this.miembro.set({ ...obj } as IMiembroView);
			});
	}
}
