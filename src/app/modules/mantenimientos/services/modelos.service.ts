import { Injectable } from '@angular/core';
import { GenericService } from '../../../Shared/Services/Generic.service';
import { HttpClient, HttpParams } from '@angular/common/http';
import { ICreateModeloDto } from '../dtos/icreate-modelo.dto';
import { map } from 'rxjs';

@Injectable({
	providedIn: 'root',
})
export class ModelosService extends GenericService {
	constructor(protected override $http: HttpClient) {
		super($http);
	}

	protected override GetResource(): string {
		return 'modelos';
	}

	getModelosByMarcaId(marca: string) {
		const params = new HttpParams().set('marca', marca);
		return this.$http
			.get(`${this.endPoint}/filtrar-por-marca`, {
				params: params,
			})
			.pipe(map((response: any) => response.data));
	}
}
