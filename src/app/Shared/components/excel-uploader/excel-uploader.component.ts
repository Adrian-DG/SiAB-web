import {
	ChangeDetectionStrategy,
	Component,
	EventEmitter,
	Input,
	Output,
} from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import * as XLSX from 'xlsx';
type AOA = any[][];
@Component({
	selector: 'app-excel-uploader',
	standalone: true,
	imports: [MatButtonModule, MatIconModule],
	templateUrl: './excel-uploader.component.html',
	styleUrl: './excel-uploader.component.scss',
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ExcelUploaderComponent {
	// fileName: string = 'SheetJS.xlsx';
	@Input() title!: string;
	fileType: string =
		'.csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel';
	@Output('on-file-upluoded') fileEvent = new EventEmitter<any>();
	file: File | null = null;

	header: any[] = [];
	rows: any[] = [];

	// Define constants for magic numbers
	private readonly EXPECTED_FILE_COUNT = 1;
	private readonly HEADER_ROW_INDEX = 0;
	private readonly START_ROW_INDEX = 1;

	onFileSelected(evt: any) {
		/* wire up file reader */
		const target: DataTransfer = <DataTransfer>evt.target;

		if (
			target.files &&
			target.files.length > 0 &&
			target.files.length === this.EXPECTED_FILE_COUNT
		) {
			this.file = target.files[0];

			const reader: FileReader = new FileReader();

			reader.onload = (e: any) => {
				/* read workbook */
				const bstr: string = e.target.result;
				const wb: XLSX.WorkBook = XLSX.read(bstr, { type: 'binary' });

				// console.log('Workbook: ', wb.SheetNames[0]);

				/* grab first sheet */
				const wsname: string = wb.SheetNames[0];
				const ws: XLSX.WorkSheet = wb.Sheets[wsname];

				/* save data */
				this.rows = <any[][]>XLSX.utils.sheet_to_json(ws, {
					header: 1,
					raw: false,
					range: this.START_ROW_INDEX,
				});

				// console.log('Header:', this.rows.slice(1, 2)); // Log the header
				this.header = this.rows.slice(1, 2);

				// console.log('Row Data:', this.rows.slice(2)); // Log the row data
				this.rows = this.rows.slice(2);

				this.fileEvent.emit({
					sheet: wsname as string,
					header: this.header as string[],
					rows: this.rows as string[],
				});

				// const ws2: XLSX.WorkSheet = wb.Sheets[wb.SheetNames[1]];
				// this.readDataSheet(ws2, this.START_ROW_INDEX);
			};

			reader.readAsBinaryString(target.files[0]);
		}
	}

	// private readDataSheet(ws: XLSX.WorkSheet, startRow: number) {
	// 	/* save data */
	// 	let datas = <AOA>XLSX.utils.sheet_to_json(ws, {
	// 		header: 1,
	// 		raw: false,
	// 		range: startRow,
	// 	});
	// 	let headDatas = datas[0];
	// 	datas = datas.slice(1); // remove first header record

	// 	for (let i = 0; i < this.data.length; i++) {
	// 		this.data[i][this.headData.length] = datas.filter(
	// 			(x) => x[12] == this.data[i][0]
	// 		);
	// 	}
	// }

	removeFile(): void {
		this.file = null;
		this.fileEvent.emit('');
	}

	// export(): void {
	// 	/* generate worksheet */
	// 	const ws: XLSX.WorkSheet = XLSX.utils.aoa_to_sheet(this.data);

	// 	/* generate workbook and add the worksheet */
	// 	const wb: XLSX.WorkBook = XLSX.utils.book_new();
	// 	XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');

	// 	/* save to file */
	// 	XLSX.writeFile(wb, this.fileName);
	// }
}
