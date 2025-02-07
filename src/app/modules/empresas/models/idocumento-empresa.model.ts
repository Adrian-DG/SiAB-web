export interface IDocumentoEmpresaModel {
	numeracion: string;
	tipoDocumentoId: number;
	fechaEmision: Date;
	fechaVigencia: Date;
	fechaVencimiento: Date;
	archivo: string | null;
}
