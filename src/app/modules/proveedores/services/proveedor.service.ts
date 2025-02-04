import { Injectable } from '@angular/core';
import { GenericService } from '../../../Shared/Services/Generic.service';
import { HttpClient } from '@angular/common/http';
import { IApiResponse } from '../../../Shared/Models/iapi-response.model';
import { map } from 'rxjs';

@Injectable({
	providedIn: 'root',
})
export class ProveedorService extends GenericService {
	protected override GetResource(): string {
		return 'proveedores';
	}

	constructor(protected override $http: HttpClient) {
		super($http);
	}

	getLicencias(id: number) {
		return this.$http
			.get<IApiResponse<any>>(`${this.endPoint}/${id}/licencias`)
			.pipe(map((response: IApiResponse<any>) => response.data));
	}
}
