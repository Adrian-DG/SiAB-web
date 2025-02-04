import {
	AfterViewInit,
	ChangeDetectionStrategy,
	Component,
} from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import {
	MatTable,
	MatTableDataSource,
	MatTableModule,
} from '@angular/material/table';
import { ActivatedRoute } from '@angular/router';
import { ProveedorService } from '../../services/proveedor.service';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
	selector: 'app-details.page',
	standalone: true,
	imports: [
		MatCardModule,
		MatTableModule,
		CommonModule,
		MatButtonModule,
		MatIconModule,
	],
	templateUrl: './details.page.component.html',
	styleUrl: './details.page.component.scss',
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DetailsPageComponent implements AfterViewInit {
	private _id: number = 0;
	displayedColumns: string[] = ['data', 'estatus', 'acciones'];
	dataSource: MatTableDataSource<any> = new MatTableDataSource<any>([]);

	constructor(
		private $activeRoute: ActivatedRoute,
		private _proveedorService: ProveedorService,
		private _sanitizer: DomSanitizer
	) {
		this._id = this.$activeRoute.snapshot.params['id'] as number;
	}

	ngAfterViewInit(): void {
		this._proveedorService.getLicencias(this._id).subscribe((data) => {
			this.dataSource.data = data;
		});
	}

	showLicencia(archivo: string) {
		const filePath = (
			this._sanitizer.bypassSecurityTrustResourceUrl(archivo) as any
		).changingThisBreaksApplicationSecurity;
		document.getElementById('pdfViewer')!.setAttribute('src', filePath);
	}
}
