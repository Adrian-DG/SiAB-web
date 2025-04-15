import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../../../authentication/services/authentication.service';
import { AppPermissions } from '../../../../app.permissions';

@Component({
	selector: 'app-index.page',
	standalone: true,
	imports: [],
	template: `
		@if(isUsuarioBelico) {
		<iframe
			title="informe_departamento_explosivos"
			width="100%"
			height="800px"
			src="https://app.powerbi.com/reportEmbed?reportId=10f8edf3-5fba-4e81-bdad-aa26bf189e41&autoAuth=true&ctid=65a7594c-e794-4edc-8984-5d84e0daf524"
			frameborder="0"
			allowFullScreen="true"
		>
		</iframe>

		} @else {
		<iframe
			title="informe_belico_bi"
			width="100%"
			height="800px"
			src="https://app.powerbi.com/reportEmbed?reportId=7ca76e00-d7e2-4bf6-9b27-70e8b1e3b07b&autoAuth=true&ctid=65a7594c-e794-4edc-8984-5d84e0daf524"
			frameborder="0"
			allowFullScreen="true"
		></iframe>
		}
	`,
	styleUrl: './index.page.scss',
	changeDetection: ChangeDetectionStrategy.OnPush,
	providers: [AuthenticationService],
})
export class IndexPageComponent {
	constructor(private _authService: AuthenticationService) {
		// Constructor logic can be added here if needed
	}

	get isUsuarioBelico() {
		return this._authService
			.userData()
			?.Roles.includes(AppPermissions.MODULO_EMPRESAS);
	}
}
