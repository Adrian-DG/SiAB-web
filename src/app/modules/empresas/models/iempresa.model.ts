import { INamedEntity } from '../../../Shared/Models/inamed-entity.model';

export interface IEmpresaModel extends INamedEntity {
	titular: string;
	telefono: string;
	rnc: string;
}
