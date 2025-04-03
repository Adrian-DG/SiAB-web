import { ICreateArticuloDto } from './icreate-articulo.dto';
import { ICreateDocumentoDto } from './icreate-documento.dto';

export interface ICreateOrdenEmpresaDto {
	fechaEfectividad: string;
	comentario: string;
	articulos: ICreateArticuloDto[];
	documentos: ICreateDocumentoDto[];
}
