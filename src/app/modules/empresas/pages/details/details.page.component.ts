import {
	AfterViewInit,
	ChangeDetectionStrategy,
	Component,
	signal,
} from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatTableModule } from '@angular/material/table';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';
import { OrdenesEmpresaService } from '../../services/ordenes-empresa.service';

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
	providers: [OrdenesEmpresaService],
})
export class DetailsPageComponent implements AfterViewInit {
	detalleOrden$ = signal<any>(null);
	displayedDocumentsColumns: string[] = ['info', 'fecha', 'acciones'];
	displayedArticlesColumns: string[] = ['info', 'datos', 'acciones'];

	constructor(
		private route: ActivatedRoute,
		private _ordenesEmpresaService: OrdenesEmpresaService,
		private sanitizer: DomSanitizer
	) {}

	ngAfterViewInit(): void {
		this.route.params.subscribe((params) => {
			const id = params['id'] as number;
			this._ordenesEmpresaService
				.getDetalleOrdenEmpresa(id)
				.subscribe((data) => this.detalleOrden$.update(() => data));
		});
	}

	// Method to sanitize the URL for the iframe
	onDocumentView(url: string) {
		const filePath = (
			this.sanitizer.bypassSecurityTrustResourceUrl(url) as any
		).changingThisBreaksApplicationSecurity;
		document.getElementById('iframe')?.setAttribute('src', filePath);
	}
}
