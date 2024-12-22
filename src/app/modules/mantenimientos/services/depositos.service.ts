import { Injectable } from '@angular/core';
import { GenericService } from '../../../Shared/Services/Generic.service';
import { HttpClient, HttpParams } from '@angular/common/http';
import { INamedEntity } from '../../../Shared/Models/inamed-entity.model';
import { IPaginationFilter } from '../../../Shared/dtos/ipagination-filter.dto';
import { IDepositoDetailModel } from '../models/ideposito-detail.model';

@Injectable({
	providedIn: 'root',
})
export class DepositosService extends GenericService {
	protected override GetResource(): string {
		return 'depositos';
	}

	constructor(protected override $http: HttpClient) {
		super($http);
	}

	getDepositosPaginated(filter: IPaginationFilter) {
		const params = this.getPaginationParams(filter);
		return this.$http.get<IDepositoDetailModel[]>(this.endPoint, {
			params: params,
		});
	}

	getFilterDepositos(filter: string) {
		const params = new HttpParams().set('nombre', filter);
		return this.$http.get<INamedEntity[]>(`${this.endPoint}/filtrar`, {
			params: params,
		});
	}
}
