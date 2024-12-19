import { Injectable } from '@angular/core';
import { GenericService } from './Generic.service';
import { IJCEModel } from '../Models/ijce-model';
import { HttpClient } from '@angular/common/http';

@Injectable({
	providedIn: 'root',
})
export class JCEService extends GenericService {
	protected override GetResource(): string {
		return 'junta-central-electoral';
	}

	constructor(protected override $http: HttpClient) {
		super($http);
	}

	getCivilByCedula(cedula: string) {
		return this.$http.get<IJCEModel>(`${this.endPoint}/${cedula}`);
	}
}
