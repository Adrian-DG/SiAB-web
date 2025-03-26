import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable, isDevMode } from '@angular/core';
import { environment as Dev } from '../../../../environment/environment.development';
import { environment as Prod } from '../../../../environment/environment.production';
import { IInputOrigenDestinoDto } from '../dto/iinput-origen-destino.dto';
import { CreateTransaccionCargoDescargoDto } from '../../procesos/dto/create-transaccion-cargo-descargo.dto';
import { InputReporte53Dto } from '../../procesos/dto/InputReporte53.dto';
import { IAdjuntarFormularioDto } from '../dto/iadjuntar-formulario.dto';

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

	generarReporte53(model: InputReporte53Dto) {
		return this.$httpClient.post(
			`${this._url}/generar-formulario-53`,
			model,
			{
				responseType: 'blob',
			}
		);
	}

	adjuntarFormulario53(adjunto: IAdjuntarFormularioDto) {
		return this.$httpClient.post(
			`${this._url}/adjuntar-formulario-53`,
			adjunto
		);
	}

	getDocumentosTransaccion(idTransaccion: number) {
		return this.$httpClient.get<any[]>(
			`${this._url}/${idTransaccion}/documentos-transaccion`
		);
	}
}
