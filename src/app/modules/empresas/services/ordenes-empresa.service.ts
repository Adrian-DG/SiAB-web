import { Injectable } from '@angular/core';
import { GenericService } from '../../../Shared/Services/Generic.service';
import { HttpClient } from '@angular/common/http';
import { IPaginationFilter } from '../../../Shared/dtos/ipagination-filter.dto';
import { IApiResponse } from '../../../Shared/Models/iapi-response.model';
import { map } from 'rxjs';
import { IPagedData } from '../../../Shared/Models/ipaged-data.model';

@Injectable({
	providedIn: 'root',
})
export class OrdenesEmpresaService extends GenericService {
	protected override GetResource(): string {
		return 'ordenes-empresa';
	}

	constructor(protected override $http: HttpClient) {
		super($http);
	}

	getOrdenesEmpresa(id: number, filters: IPaginationFilter) {
		const params = this.getPaginationParams(filters);
		return this.$http
			.get<IApiResponse<IPagedData<any>>>(`${this.endPoint}/${id}`, {
				params: params,
			})
			.pipe(map((response) => response.data));
	}
}
