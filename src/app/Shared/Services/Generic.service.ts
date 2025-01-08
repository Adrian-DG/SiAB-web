import { Injectable, isDevMode } from '@angular/core';
import { environment as production } from '../../../environment/environment.production';
import { environment as development } from '../../../environment/environment.development';
import {
	HttpClient,
	HttpErrorResponse,
	HttpParams,
} from '@angular/common/http';
import { IPaginationFilter } from '../dtos/ipagination-filter.dto';
import { IPagedData } from '../Models/ipaged-data.model';
import { INamedEntity } from '../Models/inamed-entity.model';
import { IApiResponse } from '../Models/iapi-response.model';
import { catchError, map, throwError } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { ErrorInterceptor } from '../../interceptors/error.interceptor';

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

	getRangos() {
		return this.$http
			.get<IApiResponse<INamedEntity[]>>(`${this.API_URL}/rangos`)
			.pipe(
				map((response: IApiResponse<INamedEntity[]>) => response.data)
			);
	}

	get<T>(filters: IPaginationFilter) {
		return this.$http
			.get<IApiResponse<IPagedData<T>>>(this.endPoint, {
				params: this.getPaginationParams(filters),
			})
			.pipe(
				map((response: IApiResponse<IPagedData<T>>) => response.data)
			);
	}

	delete(id: number) {
		return this.$http.delete<IApiResponse<any>>(`${this.endPoint}/${id}`);
	}

	getFilter<T>(filter: string) {
		return this.$http
			.get<IApiResponse<T[]>>(`${this.endPoint}/filtrar`, {
				params: new HttpParams().set('nombre', filter),
			})
			.pipe(map((response: IApiResponse<T[]>) => response.data));
	}

	create<T>(model: T) {
		return this.$http.post<IApiResponse<T>>(this.endPoint, model).pipe(
			map((response: IApiResponse<T>) => {
				return response.data;
			})
		);
	}
}
