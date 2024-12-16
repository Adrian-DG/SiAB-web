import { Injectable } from '@angular/core';
import { GenericService } from '../../../Shared/Services/Generic.service';
import { HttpClient } from '@angular/common/http';

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
}
