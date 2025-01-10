import { INamedEntity } from '../../../Shared/Models/inamed-entity.model';

export interface IModeloDetail extends INamedEntity {
	foto: string;
	marcaId: number;
	marca: string;
}
