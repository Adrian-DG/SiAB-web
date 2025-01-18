import type { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { LoadingService } from '../Shared/Services/loading.service';
import { finalize } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { LoadingSpinnerComponent } from '../Shared/components/loading-spinner/loading-spinner.component';

export const loadingInterceptor: HttpInterceptorFn = (req, next) => {
	const _dialog = inject(MatDialog);
	const loadingService = inject(LoadingService);

	const dialog = _dialog.open(LoadingSpinnerComponent, {
		width: '400px',
		height: '250px',
		role: 'dialog',
		hasBackdrop: true,
		disableClose: true,
	});

	loadingService.show();
	return next(req).pipe(
		finalize(() => {
			setTimeout(() => {
				loadingService.hide();
				dialog.close();
			}, 2000);
		})
	);
};
