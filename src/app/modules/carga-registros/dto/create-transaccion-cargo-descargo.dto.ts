import { CreateArticuloTransaccionItemDto } from './create-articulo-transaccion-item.dto';

export interface CreateTransaccionCargoDescargoDto {
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
	encargadaDepositos: string;
	entrega: string;
	recibe: string;
	firma: string;
}
