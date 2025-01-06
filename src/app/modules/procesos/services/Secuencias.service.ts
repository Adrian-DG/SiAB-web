import { Injectable } from '@angular/core';
import { GenericService } from '../../../Shared/Services/Generic.service';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs';

@Injectable({
	providedIn: 'root',
})
export class SecuenciasService extends GenericService {
	protected override GetResource(): string {
		return 'secuencias';
	}

	constructor(protected override $http: HttpClient) {
		super($http);
	}

	GetSecuenciaInstitucion() {
		return this.$http
			.get<string>(`${this.endPoint}/generar`)
			.pipe(map((res: any) => res.data));
	}
}
