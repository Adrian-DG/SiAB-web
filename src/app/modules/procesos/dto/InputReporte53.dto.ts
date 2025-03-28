import { IMiembroListDetail } from '../../existencia/models/imiembro-list-deatil.model';

export interface InputReporte53Dto {
	secuencia: string;
	intendente: IMiembroListDetail;
	fecha: string;
	articulos: any[];
	recibidoParam1: string;
	recibidoParam2: string;
	encargadoArmas: IMiembroListDetail;
	encargadoDepositos: IMiembroListDetail;
	comentario: string;
}
