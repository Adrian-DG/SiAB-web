import {
	ChangeDetectionStrategy,
	Component,
	CUSTOM_ELEMENTS_SCHEMA,
	EventEmitter,
	Inject,
	Input,
	Output,
} from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import {
	MAT_DIALOG_DATA,
	MatDialogModule,
	MatDialogRef,
} from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

@Component({
	selector: 'app-form-dialog',
	standalone: true,
	imports: [
		MatDialogModule,
		MatFormFieldModule,
		MatInputModule,
		MatButtonModule,
	],
	templateUrl: './form-dialog.component.html',
	styleUrl: './form-dialog.component.scss',
	changeDetection: ChangeDetectionStrategy.OnPush,
	schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class FormDialogComponent {
	@Output() onClickEvent = new EventEmitter<any>();
	safeInnerHtml!: SafeHtml;

	constructor(
		private dialogRef: MatDialogRef<FormDialogComponent>,
		@Inject(MAT_DIALOG_DATA) public data: { innerHtml: string },
		private domSanitizer: DomSanitizer
	) {
		this.safeInnerHtml = this.domSanitizer.bypassSecurityTrustHtml(
			this.data.innerHtml
		);
	}

	onSaveClick() {
		this.onClickEvent.emit();
	}
}
