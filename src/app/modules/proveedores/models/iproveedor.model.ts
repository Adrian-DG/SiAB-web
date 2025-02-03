import { INamedEntity } from '../../../Shared/Models/inamed-entity.model';

export interface IProveedorModel extends INamedEntity {
	telefono: string;
	rnc: string;
}
