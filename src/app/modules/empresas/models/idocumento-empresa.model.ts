export interface IDocumentoEmpresaModel {
	numeracion: string;
	tipo: number;
	fechaEmision: Date;
	fechaVigencia: Date;
	fechaVencimiento: Date;
	archivo: string | null;
}
