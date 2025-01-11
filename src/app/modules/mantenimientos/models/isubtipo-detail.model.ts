import { INamedEntity } from '../../../Shared/Models/inamed-entity.model';

export interface ISubtipoDetail extends INamedEntity {
	tipoId: number;
	tipo: string;
}
