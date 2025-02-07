import {
	ChangeDetectionStrategy,
	Component,
	EventEmitter,
	Input,
	Output,
} from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

@Component({
	selector: 'app-file-input',
	standalone: true,
	imports: [MatIconModule, MatButtonModule],
	templateUrl: './file-input.component.html',
	styleUrl: './file-input.component.scss',
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FileInputComponent {
	@Input() title!: string;
	@Input() fileType!: string;
	@Output('on-file-upluoded') fileEvent = new EventEmitter<string>();
	file: File | null = null;

	onFileSelected(event: Event): void {
		const input = event.target as HTMLInputElement;
		if (input.files && input.files.length > 0) {
			this.file = input.files[0];
			const reader = new FileReader();
			reader.readAsDataURL(this.file);
			reader.onload = () => {
				this.fileEvent.emit(reader.result as string);
			};
		}
	}

	removeFile(): void {
		this.file = null;
		this.fileEvent.emit('');
	}
}
