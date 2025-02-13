import {
	ChangeDetectionStrategy,
	Component,
	Input,
	OnChanges,
	signal,
	SimpleChanges,
} from '@angular/core';
import { IUrlOption } from '../../Models/iurl-option.model';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { RouterModule } from '@angular/router';
import { routes as AppRoutes } from '../../../app.routes';

@Component({
	selector: 'app-nav-menu',
	standalone: true,
	imports: [RouterModule, MatSidenavModule, MatListModule],
	template: `
		<mat-sidenav
			#sidenav
			mode="side"
			[opened]="isVisible$()"
			class="sidenav"
			[autoFocus]="true"
			[position]="'start'"
		>
			<mat-list>
				@for (item of modules; track $index) {
				@if(hasPermission(item.url)) {
				<mat-list-item class="link-item">
					<a
						[routerLink]="item.url"
						class="link"
						routerLinkActive
						[routerLinkActiveOptions]="{ exact: true }"
					>
						<span>{{ item.name }}</span>
					</a>
				</mat-list-item>
				} }
			</mat-list>
		</mat-sidenav>
	`,
	styleUrl: './nav-menu.component.scss',
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NavMenuComponent implements OnChanges {
	@Input() modules: IUrlOption[] = [];
	@Input() userRoles: string | string[] = [];
	isVisible$ = signal<boolean>(false);

	ngOnChanges(changes: SimpleChanges): void {
		this.isVisible$.set(true);
	}

	hasPermission(url: string): boolean {
		const routeData = AppRoutes.find((route) => route.path === url)
			?.data as { expectedRoles: string[] };
		const permissions = routeData?.expectedRoles ?? [];

		if (permissions.length === 0) return true;

		const hasPermission = Array.isArray(this.userRoles)
			? this.userRoles.some((role) => permissions.includes(role))
			: this.userRoles
					.split(',')
					.some((role) => permissions.includes(role));

		return hasPermission;
	}
}
