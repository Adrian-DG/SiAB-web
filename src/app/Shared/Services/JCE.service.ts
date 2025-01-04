import { Injectable } from '@angular/core';
import { GenericService } from './Generic.service';
import { IJCEModel } from '../Models/ijce-model';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs';
import { IApiResponse } from '../Models/iapi-response.model';

@Injectable({
	providedIn: 'root',
})
export class JCEService extends GenericService {
	protected override GetResource(): string {
		return 'junta-central-electoral';
	}

	constructor(protected override $http: HttpClient) {
		super($http);
	}

	getCivilByCedula(cedula: string) {
		return this.$http
			.get<IApiResponse<IJCEModel>>(`${this.endPoint}/${cedula}`)
			.pipe(map((response: IApiResponse<IJCEModel>) => response.data));
	}
}
