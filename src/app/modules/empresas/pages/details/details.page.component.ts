import {
	AfterViewInit,
	ChangeDetectionStrategy,
	Component,
	CUSTOM_ELEMENTS_SCHEMA,
	OnInit,
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
import { MatDividerModule } from '@angular/material/divider';
import { PageIntroComponent } from '../../../../Shared/components/page-intro/page-intro.component';
import { ModuleIndexPageComponent } from '../../../../Shared/pages/module-index/module-index.page.component';
import { IOrdenEmpresaDocumentoDetail } from '../../models/iorden-empresa-documento-detail.model';
import { IOrdenEmpresaDetail } from '../../models/iorden-empresa-detail-model';

@Component({
	selector: 'app-details.page',
	standalone: true,
	imports: [
		MatCardModule,
		MatTableModule,
		CommonModule,
		MatButtonModule,
		MatIconModule,
		MatDividerModule,
		PageIntroComponent,
	],
	templateUrl: './details.page.component.html',
	styleUrl: './details.page.component.scss',
	changeDetection: ChangeDetectionStrategy.OnPush,
	providers: [OrdenesEmpresaService],
	schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class DetailsPageComponent implements OnInit {
	ordenId: number = 0;
	detalleOrden$ = signal<IOrdenEmpresaDetail | null>(null);
	displayedDocumentsColumns: string[] = ['info', 'fecha', 'acciones'];
	displayedArticlesColumns: string[] = ['info', 'datos', 'acciones'];

	constructor(
		private route: ActivatedRoute,
		private _ordenesEmpresaService: OrdenesEmpresaService,
		private sanitizer: DomSanitizer
	) {}

	ngOnInit(): void {
		this.route.params.subscribe((params) => {
			this.ordenId = params['ordenId'] as number;
			this._ordenesEmpresaService
				.getDetalleOrdenEmpresa(this.ordenId)
				.subscribe((data) => {
					this.detalleOrden$.update(() => data);
				});
		});
	}

	// Method to sanitize the URL for the iframe
	onDocumentView(dataUrl: string) {
		const filePath = (
			this.sanitizer.bypassSecurityTrustResourceUrl(dataUrl) as any
		).changingThisBreaksApplicationSecurity;

		console.log('File Path:', filePath);

		document.getElementById('iframe')?.setAttribute('src', filePath);
	}

	increment_articulo_entregado(element: any) {
		element.cantidadEntregada += 1;
	}

	decrease_articulo_entregado(element: any) {
		element.cantidadEntregada -= 1;
	}

	complete_articulo_entregado(element: any) {
		element.cantidadEntregada = element.cantidadRecibida;
	}

	update_articulos_entregado() {
		this._ordenesEmpresaService
			.updateOrdenArticulosEntregados(
				this.ordenId,
				this.detalleOrden$()?.articulos || []
			)
			.subscribe((data) => {
				console.log('Articulos actualizados', data);
			});
	}
}
