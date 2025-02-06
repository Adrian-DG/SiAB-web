export interface ICreateEmpresaDto {
	nombre: string;
	telefono: string;
	rnc: string;
	titular: string;
	numeracion: string;
	archivos: string[];
	fechaEmision: Date;
	fechaVigencia: Date;
	fechaVencimiento: Date;
}
