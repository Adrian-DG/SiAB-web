import { ChangeDetectionStrategy, Component } from '@angular/core';
import { BaseListResource } from '../../../../Shared/helpers/base-list-resource.metadata';

@Component({
	selector: 'app-modelos.page',
	standalone: true,
	imports: [],
	templateUrl: './modelos.page.component.html',
	styleUrl: './modelos.page.component.scss',
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ModelosPageComponent
	extends BaseListResource<INamedEntity>
	implements AfterViewInit {}
