import { CommonModule } from '@angular/common';
import {
	ChangeDetectionStrategy,
	Component,
	Input,
	OnChanges,
	OnInit,
	signal,
	SimpleChanges,
} from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatListModule } from '@angular/material/list';
import { TransaccionService } from '../../../modules/carga-registros/services/transaccion.service';
import { DynamicDataTableComponent } from '../../../modules/carga-registros/components/dynamic-data-table/dynamic-data-table.component';

@Component({
	selector: 'app-historico-transacciones',
	standalone: true,
	imports: [
		CommonModule,
		MatCardModule,
		MatListModule,
		DynamicDataTableComponent,
	],
	template: `
		<mat-card>
			<mat-card-header>
				<mat-card-title>Historico de transacciones</mat-card-title>
			</mat-card-header>
			<mat-card-content>
				@if(data$().length > 0) {
				<app-dynamic-data-table
					[tableColumns]="columns$()"
					[tableData]="data$()"
				></app-dynamic-data-table>
				}
			</mat-card-content>
		</mat-card>
	`,
	styleUrl: './historico-transacciones.component.scss',
	changeDetection: ChangeDetectionStrategy.OnPush,
	providers: [TransaccionService],
})
export class HistoricoTransaccionesComponent implements OnInit, OnChanges {
	@Input() tipoOrigen: number = 0;
	@Input() origen: string = '';

	columns$ = signal<string[]>([]);
	data$ = signal<any[]>([]);

	constructor(private _transaccionService: TransaccionService) {}

	ngOnInit(): void {
		this._transaccionService
			.getArticulosOrigenTransaccion(this.tipoOrigen, this.origen)
			.subscribe((data: any[]) => {
				console.log(data);
			});
	}

	ngOnChanges(changes: SimpleChanges): void {
		// this._transaccionService
		// 	.getArticulosOrigenTransaccion(this.tipoOrigen, this.origen)
		// 	.subscribe((data: any[]) => {
		// 		this.columns$.set(Object.keys(data[0]) as any[]);
		// 		this.data$.set(Object.values(data) as any[]);
		// 	});

		throw new Error('Method not implemented.');
	}
}
