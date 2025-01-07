import { Injectable } from '@angular/core';
import { GenericService } from '../../../Shared/Services/Generic.service';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs';
import { IApiResponse } from '../../../Shared/Models/iapi-response.model';
import { IPermissionModel } from '../models/ipermission.model';

@Injectable({
	providedIn: 'root',
})
export class PermisosService extends GenericService {
	protected override GetResource(): string {
		return 'permisos';
	}

	constructor(protected override $http: HttpClient) {
		super($http);
	}

	getAll() {
		return this.$http
			.get<IApiResponse<IPermissionModel[]>>(`${this.endPoint}`)
			.pipe(map((res: IApiResponse<IPermissionModel[]>) => res.data));
	}
}
