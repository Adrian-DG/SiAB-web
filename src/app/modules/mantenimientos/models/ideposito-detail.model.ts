import { INamedEntity } from '../../../Shared/Models/inamed-entity.model';

export interface IDepositoDetailModel extends INamedEntity {
	esFuncion: boolean;
	dependenciaId: number;
	dependencia: string;
}
