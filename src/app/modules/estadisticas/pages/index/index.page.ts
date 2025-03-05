import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
	selector: 'app-index.page',
	standalone: true,
	imports: [],
	template: `
		<iframe
			title="informe_belico_bi"
			width="100%"
			height="800px"
			src="https://app.powerbi.com/reportEmbed?reportId=7ca76e00-d7e2-4bf6-9b27-70e8b1e3b07b&autoAuth=true&ctid=65a7594c-e794-4edc-8984-5d84e0daf524"
			frameborder="0"
			allowFullScreen="true"
		></iframe>
	`,
	styleUrl: './index.page.scss',
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class IndexPageComponent {}
