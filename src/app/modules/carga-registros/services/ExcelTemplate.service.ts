import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable, isDevMode } from '@angular/core';
import { environment as Dev } from '../../../../environment/environment.development';
import { environment as Prod } from '../../../../environment/environment.production';
import { map } from 'rxjs';
import { IApiResponse } from '../../../Shared/Models/iapi-response.model';

@Injectable({
	providedIn: 'root',
})
export class ExcelTemplateService {
	private readonly _templateUrl = '';

	constructor(private $httpClient: HttpClient) {
		this._templateUrl += `${
			isDevMode() ? Dev.api_url : Prod.api_url
		}/excel-templates`;
	}

	private transformData(data: any) {
		let filename = data.headers
			.get('content-disposition')
			.split(';')[1]
			.split('=')[1];
		let blob: Blob = data.body as Blob;

		let a = document.createElement('a');
		a.download = filename ?? '';
		a.href = window.URL.createObjectURL(blob);
		a.click();
	}

	getPlantillaRelacionArmas() {
		this.$httpClient
			.get(`${this._templateUrl}/plantilla-relacion-armas`, {
				observe: 'response',
				responseType: 'blob',
				reportProgress: true,
			})
			.subscribe((response) => {
				this.transformData(response);
			});
	}
}
