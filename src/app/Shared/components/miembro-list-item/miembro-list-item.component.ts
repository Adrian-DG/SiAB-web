import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { IMiembroListDetail } from '../../../modules/existencia/models/imiembro-list-deatil.model';
import { DomSanitizer } from '@angular/platform-browser';
import { MatDividerModule } from '@angular/material/divider';
import { CommonModule } from '@angular/common';

@Component({
	selector: 'app-miembro-list-item',
	standalone: true,
	imports: [MatDividerModule, CommonModule],
	template: `
		<div class="miembro-list-item">
			<div class="row">
				<div class="foto">
					<img [src]="fotoMiembro" alt="Foto de perfil" />
				</div>
				<div class="info">
					<span class="rango"><b>Rango:</b> {{ miembro.rango }}</span>
					<br />
					<span class="cedula"
						><b>Cédula:</b> {{ miembro.cedula }}</span
					>
					<br />
					<span class="nombre"
						><b>Nombre:</b>
						{{ miembro.nombreApellidoCompleto }}</span
					>
					<br />
					<span>
						<b>Estado:</b>
						<span class="status" [ngClass]="clasificacionEstado">{{
							miembro.estadoMiembro | uppercase
						}}</span>
					</span>
				</div>
			</div>
			<mat-divider></mat-divider>
		</div>
	`,
	styleUrl: './miembro-list-item.component.scss',
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MiembroListItemComponent {
	@Input() miembro!: IMiembroListDetail;

	constructor(private _sanitizer: DomSanitizer) {}

	get fotoMiembro() {
		return this.miembro?.foto !== null
			? this._sanitizer.bypassSecurityTrustUrl(
					'data:image/jpg;base64,' + this.miembro?.foto
			  )
			: '../../../../../public/empty-miembro.png';
	}

	get clasificacionEstado() {
		return [
			'ACTIVO',
			'LICENCIA',
			'VACACIONES',
			'PERMISO',
			'REALIZANDO ESTUDIO',
		].includes(this.miembro.estadoMiembro.toUpperCase())
			? 'activo'
			: 'pasivo';
	}
}
