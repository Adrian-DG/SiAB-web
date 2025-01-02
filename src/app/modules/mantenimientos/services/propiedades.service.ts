import { Injectable } from '@angular/core';
import { GenericService } from '../../../Shared/Services/Generic.service';
import { HttpClient } from '@angular/common/http';

@Injectable({
	providedIn: 'root',
})
export class PropiedadesService extends GenericService {
	protected override GetResource(): string {
		return 'propiedades';
	}

	constructor(protected override $http: HttpClient) {
		super($http);
	}
}
