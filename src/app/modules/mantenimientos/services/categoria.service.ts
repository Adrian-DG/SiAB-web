import { Injectable } from '@angular/core';
import { GenericService } from '../../../Shared/Services/Generic.service';
import { HttpClient } from '@angular/common/http';

@Injectable({
	providedIn: 'root',
})
export class CategoriaService extends GenericService {
	protected override GetResource(): string {
		return 'categorias';
	}

	constructor(protected override $http: HttpClient) {
		super($http);
	}
}
