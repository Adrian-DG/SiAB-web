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
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';
import { EmpresaService } from '../../services/empresa.service';

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
export class DetailsPageComponent {}
