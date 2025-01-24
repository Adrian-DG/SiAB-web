import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable, isDevMode } from '@angular/core';
import { environment as Dev } from '../../../../environment/environment.development';
import { environment as Prod } from '../../../../environment/environment.production';
import { IInputOrigenDestinoDto } from '../dto/iinput-origen-destino.dto';

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

	uploadRelacionArticulos(file: FormData, model: IInputOrigenDestinoDto) {
		const params = new HttpParams()
			.set('origen', model.origen)
			.set('destino', model.destino);
		return this.$httpClient
			.post(`${this._url}/upload-excel-relacion-articulos`, file, {
				params: params,
				reportProgress: true,
				observe: 'events',
				responseType: 'json',
			})
			.subscribe(() => console.log('File uploaded'));
	}
}
