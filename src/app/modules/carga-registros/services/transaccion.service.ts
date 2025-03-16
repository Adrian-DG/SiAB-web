import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable, isDevMode } from '@angular/core';
import { environment as Dev } from '../../../../environment/environment.development';
import { environment as Prod } from '../../../../environment/environment.production';
import { IInputOrigenDestinoDto } from '../dto/iinput-origen-destino.dto';
import { CreateTransaccionCargoDescargoDto } from '../dto/create-transaccion-cargo-descargo.dto';
import { InputReporte53Dto } from '../dto/InputReporte53.dto';

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

	getArticulosOrigenTransaccion(tipoOrigen: number, origen: string) {
		const params = new HttpParams()
			.set('tipoOrigen', tipoOrigen.toString())
			.set('origen', origen);
		return this.$httpClient.get<any[]>(
			`${this._url}/filter-articulos-origen-transaccion`,
			{
				params: params,
			}
		);
	}

	getTransaccionesBySerie(serie: string) {
		return this.$httpClient.get<any[]>(
			`${this._url}/filter-transacciones-by-serie/`,
			{ params: new HttpParams().set('serie', serie) }
		);
	}

	CreateTransaccionCargoDescargo(model: CreateTransaccionCargoDescargoDto) {
		return this.$httpClient.post<number>(
			`${this._url}/registrar-cargo-descargo`,
			model
		);
	}

	generarReporte53(model: InputReporte53Dto): void {
		this.$httpClient
			.post(`${this._url}/generar-formulario-53`, model, {
				responseType: 'blob',
			})
			.subscribe((response) => {
				const blob = new Blob([response], { type: 'application/pdf' });
				const url = window.URL.createObjectURL(blob);
				window.open(url);
			});
	}
}
