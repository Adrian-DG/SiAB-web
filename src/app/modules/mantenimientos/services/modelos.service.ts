import { Injectable } from '@angular/core';
import { GenericService } from '../../../Shared/Services/Generic.service';
import { HttpClient } from '@angular/common/http';
import { ICreateModeloDto } from '../dtos/icreate-modelo.dto';

@Injectable({
	providedIn: 'root',
})
export class ModelosService extends GenericService {
	constructor(protected override $http: HttpClient) {
		super($http);
	}

	protected override GetResource(): string {
		return 'modelos';
	}

	create(modelo: ICreateModeloDto) {
		return this.$http.post(this.endPoint, modelo);
	}
}
