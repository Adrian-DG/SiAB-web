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
	@Input('is-multiple') isMultiple: boolean = false;
	@Output('on-file-upluoded') fileEvent = new EventEmitter<string[]>();
	files: File[] | null = null;

	get filesCount(): number {
		return this.files ? this.files.length : 0;
	}

	onFileSelected(event: Event): void {
		const input = event.target as HTMLInputElement;
		if (input.files && input.files.length > 0) {
			this.files = Array.from(input.files);
			const fileReaders = this.files.map((file) => {
				return new Promise<string>((resolve) => {
					const reader = new FileReader();
					reader.onload = () => {
						resolve(reader.result as string);
					};
					reader.readAsDataURL(file);
				});
			});

			Promise.all(fileReaders).then((files) => {
				this.fileEvent.emit(files);
			});
		}
	}

	removeFile(): void {
		this.files = null;
		this.fileEvent.emit([]);
	}
}
