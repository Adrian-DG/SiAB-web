import { INamedEntity } from '../../../Shared/Models/inamed-entity.model';

export interface ITipoDetail extends INamedEntity {
	categoriaId: number;
	categoria: string;
}
