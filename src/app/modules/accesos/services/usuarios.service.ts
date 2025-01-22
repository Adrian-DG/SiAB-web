import { Injectable } from '@angular/core';
import { GenericService } from '../../../Shared/Services/Generic.service';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs';
import { IApiResponse } from '../../../Shared/Models/iapi-response.model';
import { IUsuarioUpdateModel } from '../models/usuario-update.model';

@Injectable({
	providedIn: 'root',
})
export class UsuariosService extends GenericService {
	protected override GetResource(): string {
		return 'usuarios';
	}

	constructor(protected override $http: HttpClient) {
		super($http);
	}

	getUsuarioById(id: number) {
		return this.$http
			.get<IApiResponse<IUsuarioUpdateModel>>(`${this.endPoint}/${id}`)
			.pipe(
				map(
					(response: IApiResponse<IUsuarioUpdateModel>) =>
						response.data
				)
			);
	}

	updateUsuario(id: number, data: IUsuarioUpdateModel) {
		return this.$http.put<IApiResponse<any>>(
			`${this.endPoint}/${id}`,
			data
		);
	}
}
