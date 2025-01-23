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
				<mat-label>Tipo Excel</mat-label>
				<mat-select [(ngModel)]="excelType">
					<mat-option [value]="1"
						>Relación de Armas Militares</mat-option
					>
					<mat-option [value]="2"
						>Relación de Armas Civiles</mat-option
					>
					<mat-option [value]="3"
						>Relación de Armas Dependencias</mat-option
					>
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
	@Output('on-template-download') templateDownload =
		new EventEmitter<number>();
	@Output('on-info-upload') infoUpload = new EventEmitter<number>();

	excelType: number = 1;

	downloadTemplate() {
		// Download template
		this.templateDownload.emit(this.excelType);
	}

	uploadInfo() {
		// Upload info
		this.infoUpload.emit(this.excelType);
	}
}
