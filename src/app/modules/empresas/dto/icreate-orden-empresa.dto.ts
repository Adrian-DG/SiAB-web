import { ICreateArticuloDto } from './icreate-articulo.dto';
import { ICreateDocumentoDto } from './icreate-documento.dto';

export interface ICreateOrdenEmpresaDto {
	fechaEfectividad: Date;
	comentario: string;
	articulos: ICreateArticuloDto[];
	documentos: ICreateDocumentoDto[];
}
