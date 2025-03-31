import {
	ChangeDetectionStrategy,
	Component,
	EventEmitter,
	Input,
	OnInit,
	Output,
} from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';

@Component({
	selector: 'app-page-intro',
	standalone: true,
	imports: [
		MatCardModule,
		MatFormFieldModule,
		MatInputModule,
		MatButtonModule,
		MatIconModule,
		ReactiveFormsModule,
	],
	templateUrl: './page-intro.component.html',
	styleUrl: './page-intro.component.scss',
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PageIntroComponent implements OnInit {
	@Input() title!: string;
	@Input() description!: string;
	@Input('show-create-btn') showCreateButton = true;
	@Input('show-search') showSearch = true;
	@Output('onSearch') searchEvent = new EventEmitter<string>();
	searchForm = new FormControl('');

	@Output('onCreate') addEvent = new EventEmitter<void>();

	ngOnInit(): void {
		this.searchForm.valueChanges.subscribe((value) => {
			let search = value as string;
			if (search.length > 2 && search !== '') {
				setTimeout(() => this.searchEvent.emit(value as string), 2000);
			}
		});
	}

	onAddClick() {
		this.addEvent.emit();
	}

	onBackClick() {
		window.history.back();
	}
}
