import {
	ChangeDetectionStrategy,
	Component,
	EventEmitter,
	Input,
	Output,
} from '@angular/core';
import { AbstractControl, ValidationErrors } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

@Component({
	selector: 'app-file-input',
	standalone: true,
	imports: [MatIconModule],
	templateUrl: './file-input.component.html',
	styleUrl: './file-input.component.scss',
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FileInputComponent {
	@Input() title!: string;
	@Input() fileType: string = 'application/pdf';
	@Output('on-file-upluoded') fileEvent = new EventEmitter<string>();
	file: File | null = null;

	onFileSelected(event: Event): void {
		const input = event.target as HTMLInputElement;
		if (input.files && input.files.length > 0) {
			const file = input.files[0];
			const reader = new FileReader();
			reader.onload = () => {
				this.fileEvent.emit(reader.result as string);
			};
			reader.readAsDataURL(file);
		}
	}
}
