import { Injectable } from '@angular/core';
import { GenericService } from '../../../Shared/Services/Generic.service';
import { HttpClient, HttpParams } from '@angular/common/http';
import { IRegistroDebitoArticulo } from '../models/iregistro-debito-articulo.model';
import { map } from 'rxjs';
import { IApiResponse } from '../../../Shared/Models/iapi-response.model';

@Injectable({
	providedIn: 'root',
})
export class RDCService extends GenericService {
	protected override GetResource(): string {
		return 'registros';
	}

	constructor(protected override $http: HttpClient) {
		super($http);
	}

	getArticulosDebito(debitadoA: string) {
		const params = new HttpParams().set('debito', debitadoA);
		return this.$http
			.get<IApiResponse<IRegistroDebitoArticulo[]>>(
				`${this.endPoint}/debito`,
				{
					params: params,
				}
			)
			.pipe(
				map(
					(response: IApiResponse<IRegistroDebitoArticulo[]>) =>
						response.data
				)
			);
	}
}
