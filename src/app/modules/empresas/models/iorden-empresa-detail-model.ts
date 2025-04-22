import { IDocumentoEmpresaModel } from './idocumento-empresa.model';
import { IOrdenEmpresaArticulo } from './iorden-empresa-articulo.model';

export interface IOrdenEmpresaDetail {
	id: number;
	comentario: string;
	fechaEfectividad: Date;
	articulos: IOrdenEmpresaArticulo[] | null;
	documentos: IDocumentoEmpresaModel[] | null;
}
