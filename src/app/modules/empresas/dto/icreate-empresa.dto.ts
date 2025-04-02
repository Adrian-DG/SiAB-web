import { ICreateTitularDto } from './icreate-titular.dto';

export interface ICreateEmpresaDto {
	nombre: string;
	rnc: string;
	titulares: ICreateTitularDto[];
	contactos: string[];
}
