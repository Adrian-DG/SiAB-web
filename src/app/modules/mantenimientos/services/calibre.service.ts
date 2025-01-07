import { Injectable } from '@angular/core';
import { GenericService } from '../../../Shared/Services/Generic.service';
import { HttpClient } from '@angular/common/http';
import { IApiResponse } from '../../../Shared/Models/iapi-response.model';

@Injectable({
	providedIn: 'root',
})
export class CalibreService extends GenericService {
	protected override GetResource(): string {
		return 'calibres';
	}

	constructor(protected override $http: HttpClient) {
		super($http);
	}
}
