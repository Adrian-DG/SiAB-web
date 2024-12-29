import {
	AfterViewInit,
	ChangeDetectionStrategy,
	Component,
	OnInit,
	signal,
} from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { DepositosService } from '../../services/depositos.service';
import { FormControl, FormsModule } from '@angular/forms';
import { MatSelectModule } from '@angular/material/select';
import { FuncionesService } from '../../services/funciones.service';
import { IFuncionDetail } from '../../models/ifuncion-detail.model';
import { FormularyMetadata } from '../../../../Shared/helpers/formulary-metadata';

@Component({
	selector: 'app-depositos-form-dialog',
	standalone: true,
	imports: [
		MatDialogModule,
		MatFormFieldModule,
		MatInputModule,
		MatButtonModule,
		FormsModule,
		MatSelectModule,
	],
	templateUrl: './depositos-form-dialog.component.html',
	styleUrl: './depositos-form-dialog.component.scss',
	changeDetection: ChangeDetectionStrategy.OnPush,
	providers: [DepositosService, FuncionesService],
})
export class DepositosFormDialogComponent
	extends FormularyMetadata
	implements OnInit
{
	depositoObj = { nombre: '', funcionId: 0 };
	funcionControl = new FormControl('');
	funciones = signal<IFuncionDetail[]>([]);

	constructor(
		private depositosService: DepositosService,
		private _funcionesService: FuncionesService
	) {
		super();
	}

	ngOnInit(): void {
		this.funcionControl.valueChanges.subscribe((value) => {
			if (value && value.length > 3) {
				this._funcionesService
					.getFunciones(value as string)
					.subscribe((data) => {
						this.funciones.set(data);
					});
			}
		});
	}

	override onSave(): void {
		throw new Error('Method not implemented.');
	}
}
