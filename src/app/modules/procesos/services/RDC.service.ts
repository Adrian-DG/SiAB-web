import { Injectable } from '@angular/core';
import { GenericService } from '../../../Shared/Services/Generic.service';
import { HttpClient, HttpParams } from '@angular/common/http';
import { IRegistroDebitoArticulo } from '../models/iregistro-debito-articulo.model';

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
		return this.$http.get<IRegistroDebitoArticulo[]>(
			`${this.endPoint}/debito`,
			{
				params: params,
			}
		);
	}
}
