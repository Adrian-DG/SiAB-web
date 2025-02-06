import { IDocumentoEmpresaModel } from '../models/idocumento-empresa.model';

export interface ICreateEmpresaDto {
	nombre: string;
	telefono: string;
	rnc: string;
	titular: string;
	dataArchivos: IDocumentoEmpresaModel[];
}
