import { ICreateTitularDto } from './icreate-titular.dto';

export interface ICreateEmpresaDto {
	nombre: string;
	rnc: string;
	titulares: ICreateTitularDto[];
	telefonos: string[];
}
