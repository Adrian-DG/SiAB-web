import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable, isDevMode } from '@angular/core';
import { IInputOrigenDestinoDto } from '../dto/iinput-origen-destino.dto';
import { CreateTransaccionCargoDescargoDto } from '../../procesos/dto/create-transaccion-cargo-descargo.dto';
import { InputReporte53Dto } from '../../procesos/dto/InputReporte53.dto';
import { IAdjuntarFormularioDto } from '../dto/iadjuntar-formulario.dto';
import { ITransaccionPaginationFilterDto } from '../dto/itransaccion-pagination-filter.dto';
import { IPagedData } from '../../../Shared/Models/ipaged-data.model';
import { map } from 'rxjs';
import { GenericService } from '../../../Shared/Services/Generic.service';

@Injectable({
	providedIn: 'root',
})
export class TransaccionService extends GenericService {
	protected override GetResource(): string {
		return 'transacciones';
	}

	constructor(private $httpClient: HttpClient) {
		super($httpClient);
	}

	uploadRelacionArticulos(file: FormData, model: IInputOrigenDestinoDto) {
		const params = new HttpParams()
			.set('origen', model.origen)
			.set('destino', model.destino);
		return this.$httpClient
			.post(`${this.endPoint}/upload-excel-relacion-articulos`, file, {
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
			`${this.endPoint}/filter-articulos-origen-transaccion`,
			{
				params: params,
			}
		);
	}

	getTransaccionesBySerie(serie: string) {
		return this.$httpClient.get<any[]>(
			`${this.endPoint}/filter-transacciones-by-serie/`,
			{ params: new HttpParams().set('serie', serie) }
		);
	}

	CreateTransaccionCargoDescargo(model: CreateTransaccionCargoDescargoDto) {
		return this.$httpClient.post<number>(
			`${this.endPoint}/registrar-cargo-descargo`,
			model
		);
	}

	generarReporte53(model: InputReporte53Dto) {
		return this.$httpClient.post(
			`${this.endPoint}/generar-formulario-53`,
			model,
			{
				responseType: 'blob',
			}
		);
	}

	adjuntarFormulario53(adjunto: IAdjuntarFormularioDto) {
		return this.$httpClient.post(
			`${this.endPoint}/adjuntar-formulario-53`,
			adjunto
		);
	}

	getDocumentosTransaccion(idTransaccion: number) {
		return this.$httpClient.get<any[]>(
			`${this.endPoint}/${idTransaccion}/documentos-transaccion`
		);
	}

	getTransacciones(filters: ITransaccionPaginationFilterDto) {
		const params = new HttpParams()
			.set('page', filters.page.toString())
			.set('size', filters.size.toString())
			.set('searchTerm', filters.searchTerm ?? '')
			.set('origen', filters.origen)
			.set('destino', filters.destino)
			.set('formulario53', filters.formulario53)
			.set('fechaInicial', filters.fechaDesde)
			.set('fechaFinal', filters.fechaHasta)
			.set('adjunto53', filters.adjunto53);

		return this.$httpClient.get<IPagedData<any>>(`${this.endPoint}`, {
			params: params,
		});
	}

	getTransaccionById(id: number) {
		return this.$httpClient.get<any>(`${this.endPoint}/${id}`);
	}
}
