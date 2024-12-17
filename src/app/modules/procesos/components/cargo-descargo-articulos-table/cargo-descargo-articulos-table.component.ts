import {
	ChangeDetectionStrategy,
	Component,
	EventEmitter,
	Input,
	Output,
	signal,
} from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import { IArticuloCargoDescargoInfo } from '../../models/iarticulo-cargo-descargo-info.model';

@Component({
	selector: 'app-cargo-descargo-articulos-table',
	standalone: true,
	imports: [MatTableModule, MatButtonModule, MatIconModule],
	templateUrl: './cargo-descargo-articulos-table.component.html',
	styleUrl: './cargo-descargo-articulos-table.component.scss',
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CargoDescargoArticulosTableComponent {
	@Input() data: IArticuloCargoDescargoInfo[] = [];
	@Output('delete') deleteEvent = new EventEmitter<number>();
	displayedColumns: string[] = [
		'articulo',
		'cantidad',
		'embalaje',
		'acciones',
	];

	getTotalUnidades() {
		return this.data
			.map((i) => i.cantidad)
			.reduce((acc, curr) => acc + curr, 0);
	}

	deleteItem(id: number) {
		this.deleteEvent.emit(id);
	}
}
