import {
	ChangeDetectionStrategy,
	Component,
	OnInit,
	signal,
} from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { Router, RouterModule } from '@angular/router';
import { TransaccionService } from '../../../carga-registros/services/transaccion.service';
import { CommonModule } from '@angular/common';

@Component({
	selector: 'app-details',
	standalone: true,
	imports: [CommonModule, MatCardModule, RouterModule],
	templateUrl: './details.page.component.html',
	styleUrl: './details.page.component.scss',
	changeDetection: ChangeDetectionStrategy.OnPush,
	providers: [TransaccionService],
})
export class DetailsComponent implements OnInit {
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
		});
	}
}
