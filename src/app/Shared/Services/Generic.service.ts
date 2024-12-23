import { Injectable, isDevMode } from '@angular/core';
import { environment as production } from '../../../environment/environment.production';
import { environment as development } from '../../../environment/environment.development';
import { HttpClient, HttpParams } from '@angular/common/http';
import { IPaginationFilter } from '../dtos/ipagination-filter.dto';
import { IPagedData } from '../Models/ipaged-data.model';
import { INamedEntity } from '../Models/inamed-entity.model';

@Injectable({
	providedIn: 'root',
})
export abstract class GenericService {
	protected readonly API_URL: string;
	protected endPoint = '';
	protected abstract GetResource(): string;

	constructor(protected $http: HttpClient) {
		this.API_URL = isDevMode() ? development.api_url : production.api_url;
		this.endPoint = `${this.API_URL}/${this.GetResource()}`;
	}

	protected getPaginationParams(filters: IPaginationFilter): HttpParams {
		return new HttpParams()
			.set('page', filters.page)
			.set('size', filters.size)
			.set('searchTerm', filters.searchTerm ?? '');
	}

	get<T>(filters: IPaginationFilter) {
		return this.$http.get<IPagedData<T>>(this.endPoint, {
			params: this.getPaginationParams(filters),
		});
	}

	delete(id: number) {
		return this.$http.delete(`${this.endPoint}/${id}`);
	}
}
