import { computed, Injectable, signal, WritableSignal } from '@angular/core';
import { GenericService } from '../../../Shared/Services/Generic.service';
import { HttpClient } from '@angular/common/http';
import { IAuthenticatedResponse } from '../models/iauthenticated-response.model';
import { IUsuarioLoginDto } from '../dto/iusuario-login.dto';
import { jwtDecode } from 'jwt-decode';
import { Router } from '@angular/router';
import { IJwtCustomSquema } from '../models/ijwt-custom-squema.model';

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

	showUsername = computed<string>(() => {
		const token = localStorage.getItem('token');
		if (token) {
			const decodedToken = jwtDecode<IJwtCustomSquema>(token);
			return decodedToken.name;
		}
		return '';
	});

	constructor(protected override $http: HttpClient, private $router: Router) {
		super($http);
	}

	// register

	register(registerDto: IUsuarioLoginDto) {
		this.$http.post<boolean>(`${this.endPoint}/register-user`, registerDto);
	}

	// Login
	login(loginDto: IUsuarioLoginDto) {
		this.$http
			.post<IAuthenticatedResponse>(
				`${this.endPoint}/login-user`,
				loginDto
			)
			.subscribe((response: IAuthenticatedResponse) => {
				localStorage.setItem('token', response.token);
				this.$router.navigateByUrl('/existencia');
			});
	}
}
