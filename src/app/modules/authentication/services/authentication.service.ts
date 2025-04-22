import { computed, Injectable, signal, WritableSignal } from '@angular/core';
import { GenericService } from '../../../Shared/Services/Generic.service';
import { HttpClient } from '@angular/common/http';
import { IAuthenticatedResponse } from '../models/iauthenticated-response.model';
import { map } from 'rxjs/operators';
import { IUsuarioLoginDto } from '../dto/iusuario-login.dto';
import { Router } from '@angular/router';
import { IJwtCustomSquema } from '../models/ijwt-custom-squema.model';
import { IApiResponse } from '../../../Shared/Models/iapi-response.model';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
	providedIn: 'root',
})
export class AuthenticationService extends GenericService {
	protected override GetResource(): string {
		return 'authentication';
	}

	isAuthenticated$ = computed<boolean>(() => {
		const token = localStorage.getItem('token');
		return token ? !this.jwtHelper.isTokenExpired(token) : false;
	});

	userData$ = computed<IJwtCustomSquema | null>(() => {
		const token = localStorage.getItem('token');
		return token
			? this.jwtHelper.decodeToken<IJwtCustomSquema>(token)
			: null;
	});

	constructor(
		protected override $http: HttpClient,
		private $router: Router,
		private jwtHelper: JwtHelperService
	) {
		super($http);
	}

	// register

	register(registerDto: IUsuarioLoginDto) {
		this.$http.post<IApiResponse<boolean>>(
			`${this.endPoint}/register-user`,
			registerDto
		);
	}

	// Login
	login(loginDto: IUsuarioLoginDto) {
		this.$http
			.post<IApiResponse<IAuthenticatedResponse>>(
				`${this.endPoint}/login-user`,
				loginDto
			)
			.pipe(
				map(
					(response: IApiResponse<IAuthenticatedResponse>) =>
						response.data
				)
			)
			.subscribe((response: IAuthenticatedResponse) => {
				localStorage.setItem('token', response.token);
				this.checkRoles('MODULO EMPRESAS')
					? this.$router.navigateByUrl('/empresas')
					: this.$router.navigateByUrl('/transacciones');
			});
	}

	triggerSingleReload() {
		if (!localStorage.getItem('reloaded')) {
			localStorage.setItem('reloaded', 'true');
			window.location.reload();
		} else {
			// Optional: Clear the flag after the single reload if needed
			localStorage.removeItem('reloaded');
			console.log('Page reloaded once.');
		}
	}

	logout() {
		localStorage.removeItem('token');
		this.$router.navigateByUrl('/authentication');
		this.triggerSingleReload();
	}

	private checkRoles(requiredRole: string): boolean {
		const token = this.userData$();
		if (token) {
			const roles = token.Roles;
			if (Array.isArray(roles)) {
				return roles.includes(requiredRole);
			} else {
				return roles.split(',').includes(requiredRole);
			}
		}
		return false;
	}
}
