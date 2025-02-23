import { CommonModule } from '@angular/common';
import {
	ChangeDetectionStrategy,
	Component,
	CUSTOM_ELEMENTS_SCHEMA,
	signal,
} from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatTabsModule } from '@angular/material/tabs';
import { ExcelUploaderComponent } from '../../../../Shared/components/excel-uploader/excel-uploader.component';
import { MatIconModule } from '@angular/material/icon';
import { DynamicDataTableComponent } from '../../components/dynamic-data-table/dynamic-data-table.component';
import { ResourceExcelSelectorComponent } from '../../components/resource-excel-selector/resource-excel-selector.component';
import { ExcelTemplateService } from '../../services/ExcelTemplate.service';
import { TransaccionService } from '../../services/transaccion.service';

export interface IExcelData {
	sheet: string;
	header: any[];
	rows: any[];
}

@Component({
	selector: 'app-index.page',
	standalone: true,
	imports: [
		CommonModule,
		MatCardModule,
		MatButtonModule,
		MatIconModule,
		MatTabsModule,
		ExcelUploaderComponent,
		DynamicDataTableComponent,
		ResourceExcelSelectorComponent,
	],
	templateUrl: './index.page.component.html',
	styleUrl: './index.page.component.scss',
	changeDetection: ChangeDetectionStrategy.OnPush,
	schemas: [CUSTOM_ELEMENTS_SCHEMA],
	providers: [ExcelTemplateService, TransaccionService],
})
export class IndexPageComponent {
	tableData$ = signal<IExcelData[]>([]);
	file: File | null = null;

	constructor(
		private _excelService: ExcelTemplateService,
		private _transaccionService: TransaccionService
	) {}

	onFileSelected(event: { data: IExcelData[]; file: File }) {
		console.log(event);
		this.tableData$.set(event.data);
		this.file = event.file;
	}

	onTemplateDownload(event: string) {
		this._excelService.getPlantillaRelacionArmas(event);
	}

	onInfoUpload(event: { origen: number; destino: number }) {
		const formData = new FormData();
		formData.append('file', this.file as Blob);
		this._transaccionService.uploadRelacionArticulos(formData, {
			origen: event.origen,
			destino: event.destino,
		});
	}
}
