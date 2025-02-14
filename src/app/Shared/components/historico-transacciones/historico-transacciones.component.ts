import { CommonModule } from '@angular/common';
import {
	AfterViewInit,
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
import { MatTable, MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

@Component({
	selector: 'app-historico-transacciones',
	standalone: true,
	imports: [
		CommonModule,
		MatCardModule,
		MatTableModule,
		MatButtonModule,
		MatIconModule,
	],
	template: `
		<mat-card>
			<mat-card-header>
				<mat-card-title>Historico de transacciones</mat-card-title>
				<mat-card-subtitle
					>Contiene el historial de todas las armas o equipos
					asignados.</mat-card-subtitle
				>
			</mat-card-header>
			<mat-card-content class="content">
				@if (records$().length > 0) {

				<mat-table [dataSource]="records$()" class="table">
					<ng-container matColumnDef="serie">
						<mat-header-cell *matHeaderCellDef>
							Serie
						</mat-header-cell>
						<mat-cell *matCellDef="let element">
							{{ element.serie }}
						</mat-cell>
					</ng-container>
					<ng-container matColumnDef="marca">
						<mat-header-cell *matHeaderCellDef>
							Marca
						</mat-header-cell>
						<mat-cell *matCellDef="let element">
							{{ element.marca }}
						</mat-cell>
					</ng-container>
					<ng-container matColumnDef="modelo">
						<mat-header-cell *matHeaderCellDef>
							Modelo
						</mat-header-cell>
						<mat-cell *matCellDef="let element">
							{{ element.modelo }}
						</mat-cell>
					</ng-container>
					<ng-container matColumnDef="subtipo">
						<mat-header-cell *matHeaderCellDef>
							Subtipo
						</mat-header-cell>
						<mat-cell *matCellDef="let element">
							{{ element.subTipo }}
						</mat-cell>
					</ng-container>
					<ng-container matColumnDef="cantidad">
						<mat-header-cell *matHeaderCellDef>
							Cantidad
						</mat-header-cell>
						<mat-cell *matCellDef="let element">
							{{ element.cantidad }}
						</mat-cell>
					</ng-container>
					<ng-container matColumnDef="formulario">
						<mat-header-cell *matHeaderCellDef>
							Formulario
						</mat-header-cell>
						<mat-cell *matCellDef="let element">
							{{ element.formulario }}
						</mat-cell>
					</ng-container>
					<ng-container matColumnDef="fechaEfectividad">
						<mat-header-cell *matHeaderCellDef>
							Fecha Efectividad
						</mat-header-cell>
						<mat-cell *matCellDef="let element">
							{{ element.fechaEfectividad | date : 'dd/MM/yyyy' }}
						</mat-cell>
					</ng-container>
					<ng-container matColumnDef="acciones">
						<mat-header-cell *matHeaderCellDef>
							Acciones
						</mat-header-cell>
						<mat-cell *matCellDef="let element">
							<button mat-icon-button color="primary">
								<mat-icon>remove_red_eye</mat-icon>
							</button>
						</mat-cell>
					</ng-container>
					<mat-header-row
						*matHeaderRowDef="displayedColumns"
					></mat-header-row>
					<mat-row
						*matRowDef="let row; columns: displayedColumns"
					></mat-row>
				</mat-table>
				} @else {
				<p>No hay registros</p>
				}
			</mat-card-content>
		</mat-card>
	`,
	styleUrl: './historico-transacciones.component.scss',
	changeDetection: ChangeDetectionStrategy.OnPush,
	providers: [TransaccionService],
})
export class HistoricoTransaccionesComponent implements AfterViewInit {
	@Input() tipoOrigen: number = 0;
	@Input() origen: string = '';
	displayedColumns: string[] = [
		'serie',
		'marca',
		'modelo',
		'subtipo',
		'cantidad',
		'formulario',
		'fechaEfectividad',
		'acciones',
	];

	records$ = signal<any[]>([]);

	constructor(private _transaccionService: TransaccionService) {}
	ngAfterViewInit(): void {
		this._transaccionService
			.getArticulosOrigenTransaccion(this.tipoOrigen, this.origen)
			.subscribe((data: any[]) => {
				this.records$.set(data);
			});
	}
}
