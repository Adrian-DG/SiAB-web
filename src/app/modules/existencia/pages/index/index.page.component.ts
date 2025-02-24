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
import { TransaccionService } from '../../../carga-registros/services/transaccion.service';
import { MatButtonModule } from '@angular/material/button';
import { HistoricoTransaccionesComponent } from '../../../../Shared/components/historico-transacciones/historico-transacciones.component';
import { debounceTime, distinct, distinctUntilChanged } from 'rxjs';

export enum TipoBusqueda {
	MIEMBRO = 1,
	FUNCION = 2,
	CIVIL = 3,
	SERIE = 4,
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
		HistoricoTransaccionesComponent,
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
	private readonly MIN_LENGTH = 5;

	constructor(
		private _miembroService: MiembroService,
		private _jceService: JCEService
	) {}

	ngOnInit(): void {
		this.filtro.valueChanges
			.pipe(debounceTime(3000), distinctUntilChanged())
			.subscribe((value: string | null) => {
				const searchActions: {
					[key: number]: (value: string) => void;
				} = {
					[this.tipoBusqueda.MIEMBRO]: (value: string) =>
						this.getMiembrosByCedulaNombre(value),
					[this.tipoBusqueda.FUNCION]: (value: string) =>
						this.getMiembrosByCargo(value),
					[this.tipoBusqueda.CIVIL]: (value: string) =>
						this.geCivilByCedula(value),
				};

				const action = searchActions[this.tipoFiltro];
				if (action && value && value?.length >= this.MIN_LENGTH) {
					action(value);
				}
			});
	}

	get searchHelpText() {
		const searchHelpText: { [key: number]: string } = {
			[this.tipoBusqueda.MIEMBRO]: 'Buscar por cédula o nombre',
			[this.tipoBusqueda.FUNCION]: 'Buscar por cargo o función',
			[this.tipoBusqueda.CIVIL]:
				'Buscar por cédula civil, favor incluir guiones (-)',
			[this.tipoBusqueda.SERIE]: 'Buscar por serie de arma',
		};
		return searchHelpText[this.tipoFiltro] || '';
	}

	get tipoBusqueda() {
		return TipoBusqueda;
	}

	get tipoFiltroPlaceholder(): string {
		const placeholders: { [key: number]: string } = {
			[this.tipoBusqueda.MIEMBRO]: 'Cédula o Nombre',
			[this.tipoBusqueda.FUNCION]: 'Cargo o Función',
			[this.tipoBusqueda.CIVIL]: 'Cédula civil',
			[this.tipoBusqueda.SERIE]: 'Serie de arma',
		};
		return placeholders[this.tipoFiltro] || '';
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
