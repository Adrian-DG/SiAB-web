import { Injectable, signal } from '@angular/core';

@Injectable({
	providedIn: 'root',
})
export class LoadingService {
	public isLoading$ = signal<boolean>(false);

	show(): void {
		this.isLoading$.set(true);
	}

	hide(): void {
		this.isLoading$.set(false);
	}
}
