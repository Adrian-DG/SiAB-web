import { INamedEntity } from '../../../Shared/Models/inamed-entity.model';

export interface IEmpresaModel extends INamedEntity {
	rnc: string;
	titulares: string;
	telefonos: string;
}
