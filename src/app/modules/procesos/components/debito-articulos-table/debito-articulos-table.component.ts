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
import { IRegistroDebitoArticulo } from '../../models/iregistro-debito-articulo.model';

@Component({
	selector: 'app-cargo-descargo-articulos-table',
	standalone: true,
	imports: [MatTableModule, MatButtonModule, MatIconModule],
	templateUrl: './debito-articulos-table.component.html',
	styleUrl: './debito-articulos-table.component.scss',
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DebitoArticulosTableComponent {
	@Input() data: any[] = [];
	@Output('delete') deleteEvent = new EventEmitter<number>();
	displayedColumns: string[] = [
		'articulo',
		'cantidad',
		'embalaje',
		'acciones',
	];

	getArticleInfo(article: any) {
		return `${article.serie} - ${article.marca} - ${article.subTipo}`;
	}

	getTotalUnidades() {
		return this.data
			.map((i) => i.cantidad)
			.reduce((acc, curr) => acc + curr, 0);
	}

	deleteItem(id: number) {
		this.deleteEvent.emit(id);
	}
}
