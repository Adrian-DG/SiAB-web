import { Injectable, signal } from '@angular/core';
import { GenericService } from '../../../Shared/Services/Generic.service';
import { HttpClient } from '@angular/common/http';
import { IAuthenticatedResponse } from '../models/iauthenticated-response.model';
import { IUsuarioLoginDto } from '../dto/iusuario-login.dto';

@Injectable({
	providedIn: 'root',
})
export class AuthenticationService extends GenericService {
	protected override GetResource(): string {
		return 'authentication';
	}
	isAuthenticated = signal<boolean>(false);

	constructor(protected override $http: HttpClient) {
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
				this.isAuthenticated.set(true);
			});
	}
}
