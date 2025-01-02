import { Injectable, isDevMode } from '@angular/core';
import { environment as production } from '../../../../environment/environment.production';
import { environment as development } from '../../../../environment/environment.development';
import { HttpClient } from '@angular/common/http';
import { IMiembroView } from '../models/imiembro-view.model';
import { IMiembroListDetail } from '../models/imiembro-list-deatil.model';
import { IApiResponse } from '../../../Shared/Models/iapi-response.model';
import { map } from 'rxjs/operators';

@Injectable({
	providedIn: 'root',
})
export class MiembroService {
	private readonly API_URL: string;
	private endPoint = '';

	constructor(private $http: HttpClient) {
		this.API_URL = isDevMode() ? development.api_url : production.api_url;
		this.endPoint += `${this.API_URL}/miembros`;
	}

	getMiembrosByCedula(cedula: string) {
		return this.$http
			.get<IApiResponse<IMiembroListDetail[]>>(
				`${this.endPoint}/filtro-cedula/${cedula}`
			)
			.pipe(
				map(
					(response: IApiResponse<IMiembroListDetail[]>) =>
						response.data
				)
			);
	}

	getMiembroByCedula(cedula: string) {
		return this.$http
			.get<IApiResponse<IMiembroView>>(
				`${this.endPoint}/filtro-cedula/${cedula}`
			)
			.pipe(map((response: IApiResponse<IMiembroView>) => response.data));
	}
}
