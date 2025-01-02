import { computed, Injectable, signal, WritableSignal } from '@angular/core';
import { GenericService } from '../../../Shared/Services/Generic.service';
import { HttpClient } from '@angular/common/http';
import { IAuthenticatedResponse } from '../models/iauthenticated-response.model';
import { map } from 'rxjs/operators';
import { IUsuarioLoginDto } from '../dto/iusuario-login.dto';
import { jwtDecode } from 'jwt-decode';
import { Router } from '@angular/router';
import { IJwtCustomSquema } from '../models/ijwt-custom-squema.model';
import { IApiResponse } from '../../../Shared/Models/iapi-response.model';

@Injectable({
	providedIn: 'root',
})
export class AuthenticationService extends GenericService {
	protected override GetResource(): string {
		return 'authentication';
	}

	isAuthenticated = computed<boolean>(() => {
		const token = localStorage.getItem('token');
		if (token) {
			const decodedToken = jwtDecode(token);
			const expirationDate = decodedToken.exp
				? new Date(decodedToken.exp * 1000)
				: null;
			if (!expirationDate || expirationDate < new Date()) {
				localStorage.removeItem('token');
				console.log('Token expired');
				return false;
			}
			return true;
		}
		console.log('Token not found');
		return false;
	});

	userData = computed<IJwtCustomSquema | null>(() => {
		const token = localStorage.getItem('token');
		if (token) {
			const decodedToken = jwtDecode<IJwtCustomSquema>(token);
			console.log(decodedToken);
			return decodedToken;
		}
		return null;
	});

	constructor(protected override $http: HttpClient, private $router: Router) {
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
				this.$router.navigateByUrl('/existencia');
			});
	}

	logout() {
		localStorage.removeItem('token');
		this.isAuthenticated();
		this.$router.navigateByUrl('/authentication');
	}
}
