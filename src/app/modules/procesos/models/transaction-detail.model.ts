export interface TransactionDetailModel {
	transaccion: { origen: string; destino: string; fechaEfectividad: Date };
	articulos: {
		id: number;
		serie: string;
		marca: string;
		modelo: string;
		subTipo: string;
		calibre: string;
		tipo: string;
		cantidad: number;
	}[];
	documentos: {
		id: number;
		numeracion: string;
		tipoDocumentoId: number;
		tipoDocumento: string;
	}[];
}
