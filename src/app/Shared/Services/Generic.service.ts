import { Injectable, isDevMode } from '@angular/core';
import { environment as production } from '../../../environment/environment.production';
import { environment as development } from '../../../environment/environment.development';
import { HttpClient } from '@angular/common/http';

@Injectable({
	providedIn: 'root',
})
export abstract class GenericService {
	protected readonly API_URL: string;
	constructor(protected $http: HttpClient) {
		this.API_URL = isDevMode() ? development.api_url : production.api_url;
	}
}
