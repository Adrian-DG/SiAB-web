import { IMiembroListDetail } from '../../existencia/models/imiembro-list-deatil.model';

export interface InputReporte53Dto {
	secuencia: string;
	intendente: IMiembroListDetail;
	fecha: string;
	articulos: any[];

	firmadoPor: IMiembroListDetail;
	recibidoPor: IMiembroListDetail;
	entregadoPor: IMiembroListDetail;

	encargadoArmas: IMiembroListDetail;
	encargadoDepositos: IMiembroListDetail;

	comentario: string;
}
