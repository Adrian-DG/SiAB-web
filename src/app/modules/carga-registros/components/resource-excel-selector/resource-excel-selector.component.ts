import { ChangeDetectionStrategy, Component } from '@angular/core';
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
	],
	template: `
		<div class="row">
			<mat-form-field>
				<mat-label>Tipo Excel</mat-label>
				<mat-select>
					<mat-option [value]="1">Relación de armas</mat-option>
					<mat-option [value]="2">Excel 2</mat-option>
				</mat-select>
			</mat-form-field>
			<!-- <label
				class="excel-logo-container"
				style="display: flex; flex-direction: row; justify-content: center; align-items: center;"
			>
				<img
					src="/excel_logo.png"
					alt="excel_logo"
					class="excel-logo"
				/>
			</label> -->
			<button mat-raised-button>
				<mat-icon>cloud_download</mat-icon>
				Descargar plantilla
			</button>
			<button mat-flat-button>
				<mat-icon>cloud_upload</mat-icon>
				subir informacion
			</button>
		</div>
	`,
	styleUrl: './resource-excel-selector.component.scss',
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ResourceExcelSelectorComponent {}
