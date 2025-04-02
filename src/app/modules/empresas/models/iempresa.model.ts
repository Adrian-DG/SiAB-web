import { INamedEntity } from '../../../Shared/Models/inamed-entity.model';
import { ITitularModel } from './ITitular.model';

export interface IEmpresaModel extends INamedEntity {
	rnc: string;
	titulares: ITitularModel[];
	telefonos: string[];
}
