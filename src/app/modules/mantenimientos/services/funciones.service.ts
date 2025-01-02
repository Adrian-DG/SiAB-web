import { Injectable } from '@angular/core';
import { GenericService } from '../../../Shared/Services/Generic.service';
import { HttpClient, HttpParams } from '@angular/common/http';
import { IFuncionDetail } from '../models/ifuncion-detail.model';
import { IApiResponse } from '../../../Shared/Models/iapi-response.model';
import { map } from 'rxjs';

@Injectable({
	providedIn: 'root',
})
export class FuncionesService extends GenericService {
	protected override GetResource(): string {
		return 'funciones';
	}

	constructor(protected override $http: HttpClient) {
		super($http);
	}

	getFunciones(param: string) {
		const params = new HttpParams().set('param', param);
		return this.$http
			.get<IApiResponse<IFuncionDetail[]>>(`${this.endPoint}/filter`, {
				params: params,
			})
			.pipe(
				map((response: IApiResponse<IFuncionDetail[]>) => response.data)
			);
	}
}
