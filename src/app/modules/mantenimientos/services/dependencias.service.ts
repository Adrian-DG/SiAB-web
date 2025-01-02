import { Injectable } from '@angular/core';
import { GenericService } from '../../../Shared/Services/Generic.service';
import { HttpClient } from '@angular/common/http';
import { ICreateDependenciaDto } from '../dtos/icreate-dependencia.dto';
import { IApiResponse } from '../../../Shared/Models/iapi-response.model';

@Injectable({
	providedIn: 'root',
})
export class DependenciasService extends GenericService {
	protected override GetResource(): string {
		return 'dependencias';
	}

	constructor(protected override $http: HttpClient) {
		super($http);
	}

	create(dependencia: ICreateDependenciaDto) {
		return this.$http.post<IApiResponse<any>>(this.endPoint, dependencia);
	}
}
