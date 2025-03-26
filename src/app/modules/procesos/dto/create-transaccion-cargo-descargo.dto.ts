import { CreateArticuloTransaccionItemDto } from '../../carga-registros/dto/create-articulo-transaccion-item.dto';

export interface CreateTransaccionCargoDescargoDto {
	secuencia: string;
	tipoCargoDebito: number;
	debito: string;
	tipoCargoCredito: number;
	credito: string;

	noDocumento: string;
	documento: string;

	fecha: string;
	intendente: string;
	observaciones: string;

	articulos: CreateArticuloTransaccionItemDto[];

	encargadoArmas: string;
	encargadoDepositos: string;
}
