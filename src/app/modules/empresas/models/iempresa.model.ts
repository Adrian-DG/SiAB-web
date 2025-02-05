import { INamedEntity } from '../../../Shared/Models/inamed-entity.model';

export interface IEmpresaModel extends INamedEntity {
	telefono: string;
	rnc: string;
}
