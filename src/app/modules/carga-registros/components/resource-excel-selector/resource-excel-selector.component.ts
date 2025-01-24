import {
	ChangeDetectionStrategy,
	Component,
	EventEmitter,
	Output,
	ViewEncapsulation,
} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';

@Component({
	selector: 'app-resource-excel-selector',
	standalone: true,
	imports: [
		MatFormFieldModule,
		MatSelectModule,
		MatButtonModule,
		MatIconModule,
		FormsModule,
	],
	template: `
		<div class="row">
			<mat-form-field>
				<mat-label>Origen</mat-label>
				<mat-select [(ngModel)]="origen">
					<mat-option [value]="1">Militar</mat-option>
					<mat-option [value]="2">Deposito</mat-option>
					<mat-option [value]="3">Funcuion (S4)</mat-option>
					<mat-option [value]="4">Civil</mat-option>
				</mat-select>
			</mat-form-field>

			<mat-form-field>
				<mat-label>Destino</mat-label>
				<mat-select [(ngModel)]="destino">
					<mat-option [value]="1">Militar</mat-option>
					<mat-option [value]="2">Deposito</mat-option>
					<mat-option [value]="3">Funcuion (S4)</mat-option>
					<mat-option [value]="4">Civil</mat-option>
				</mat-select>
			</mat-form-field>

			<button mat-raised-button (click)="downloadTemplate()">
				<mat-icon>cloud_download</mat-icon>
				Descargar plantilla
			</button>
			<button mat-flat-button (click)="uploadInfo()">
				<mat-icon>cloud_upload</mat-icon>
				subir informacion
			</button>
		</div>
	`,
	styleUrl: './resource-excel-selector.component.scss',
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ResourceExcelSelectorComponent {
	@Output('on-template-download') templateDownload = new EventEmitter<void>();
	@Output('on-info-upload') infoUpload = new EventEmitter<{
		origen: number;
		destino: number;
	}>();

	origen: number = 2;
	destino: number = 1;

	downloadTemplate() {
		// Download template
		this.templateDownload.emit();
	}

	uploadInfo() {
		// Upload info
		this.infoUpload.emit({ origen: this.origen, destino: this.destino });
	}
}
