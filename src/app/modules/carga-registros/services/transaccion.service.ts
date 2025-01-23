import { HttpClient } from '@angular/common/http';
import { Injectable, isDevMode } from '@angular/core';
import { environment as Dev } from '../../../../environment/environment.development';
import { environment as Prod } from '../../../../environment/environment.production';

@Injectable({
	providedIn: 'root',
})
export class TransaccionService {
	private readonly _url = '';

	constructor(private $httpClient: HttpClient) {
		this._url += `${
			isDevMode() ? Dev.api_url : Prod.api_url
		}/transacciones`;
	}

	uploadRelacionArticulos(file: FormData) {
		return this.$httpClient
			.post(`${this._url}/upload-relacion-articulos`, file, {
				reportProgress: true,
				observe: 'events',
				responseType: 'json',
			})
			.subscribe(() => console.log('File uploaded'));
	}
}
