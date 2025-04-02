import { Injectable } from '@angular/core';
import { GenericService } from '../../../Shared/Services/Generic.service';
import { HttpClient } from '@angular/common/http';
import { IApiResponse } from '../../../Shared/Models/iapi-response.model';
import { map } from 'rxjs';
import { ICreateEmpresaDto } from '../dto/icreate-empresa.dto';

@Injectable({
	providedIn: 'root',
})
export class EmpresaService extends GenericService {
	protected override GetResource(): string {
		return 'empresas';
	}

	constructor(protected override $http: HttpClient) {
		super($http);
	}

	// Create a new empresa
	createEmpresa(empresa: ICreateEmpresaDto) {
		return this.$http.post<IApiResponse<any>>(this.endPoint, empresa);
	}
}
