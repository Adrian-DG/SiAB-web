import { CreateArticuloTransaccionItemDto } from './create-articulo-transaccion-item.dto';

export interface CreateTransaccionCargoDescargoDto {
	secuencia: string;
	tipoCargoDebito: number;
	debito: string;
	tipoCargoCredito: number;
	credito: string;

	documento: string;

	oficio: string;
	noDocumento: string;
	fecha: string;
	intendente: string;
	observaciones: string;

	articulos: CreateArticuloTransaccionItemDto[];

	encargadoArmas: string;
	encargadoDepositos: string;
	entrega: string;
	recibe: string;
	firma: string;
}
