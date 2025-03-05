import { Injectable } from '@angular/core';
import { GenericService } from '../../../Shared/Services/Generic.service';
import { HttpClient, HttpParams } from '@angular/common/http';
import { map } from 'rxjs';

@Injectable({
	providedIn: 'root',
})
export class SubtipoService extends GenericService {
	protected override GetResource(): string {
		return 'subtipos';
	}

	constructor(protected override $http: HttpClient) {
		super($http);
	}

	getSubTiposByTipoId(tipo: string) {
		const params = new HttpParams().set('tipo', tipo);
		return this.$http
			.get(`${this.endPoint}/filtrar-por-tipo`, {
				params: params,
			})
			.pipe(map((response: any) => response.data));
	}
}
