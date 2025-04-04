import {
	ChangeDetectionStrategy,
	Component,
	CUSTOM_ELEMENTS_SCHEMA,
	OnInit,
	signal,
} from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { Router, RouterModule } from '@angular/router';
import { TransaccionService } from '../../../carga-registros/services/transaccion.service';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { PageIntroComponent } from '../../../../Shared/components/page-intro/page-intro.component';
import { MatTableModule } from '@angular/material/table';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';

@Component({
	selector: 'app-details',
	standalone: true,
	imports: [
		CommonModule,
		MatCardModule,
		MatButtonModule,
		RouterModule,
		MatTableModule,
		MatDividerModule,
		PageIntroComponent,
		MatIconModule,
	],
	templateUrl: './details.page.component.html',
	styleUrl: './details.page.component.scss',
	changeDetection: ChangeDetectionStrategy.OnPush,
	providers: [TransaccionService],
	schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class DetailsComponent implements OnInit {
	title = 'Detalles de la transacción ';
	description = 'Detalles de la transacción seleccionada.';

	transaccion$: any = signal(null);

	constructor(
		private $router: Router,
		private transaccionService: TransaccionService
	) {}

	ngOnInit(): void {
		const id = this.$router.url.split('/').slice(-2, -1)[0];
		if (id) {
			this.getTransaccionById(+id);
		}
	}

	getTransaccionById(id: number) {
		this.transaccionService.getTransaccionById(id).subscribe((data) => {
			this.transaccion$.set(data);
			if (data) {
				this.title += data?.documentos.filter(
					(t) => t.tipoDocumentoId == 2
				)[0].numeracion;
			}
		});
	}

	goBack() {
		this.$router.navigate(['transacciones']);
	}
}
