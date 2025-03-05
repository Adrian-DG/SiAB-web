import { Injectable } from '@angular/core';
import { GenericService } from '../../../Shared/Services/Generic.service';
import { HttpClient, HttpParams } from '@angular/common/http';
import { INamedEntity } from '../../../Shared/Models/inamed-entity.model';
import { IApiResponse } from '../../../Shared/Models/iapi-response.model';
import { map } from 'rxjs';

@Injectable({
	providedIn: 'root',
})
export class TipoService extends GenericService {
	protected override GetResource(): string {
		return 'tipos';
	}

	constructor(protected override $http: HttpClient) {
		super($http);
	}

	getTiposByCategoriaId(categoria: number) {
		const params = new HttpParams().set('categoria', categoria);
		return this.$http
			.get<IApiResponse<INamedEntity[]>>(
				`${this.endPoint}/filtrar-por-categoria`,
				{
					params: params,
				}
			)
			.pipe(
				map((response: IApiResponse<INamedEntity[]>) => response.data)
			);
	}
}
