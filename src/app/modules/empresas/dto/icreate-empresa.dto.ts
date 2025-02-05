export interface ICreateEmpresaDto {
	nombre: string;
	telefono: string;
	rnc: string;
	numeracion: string;
	tipoLicencia: number;
	archivo: string;
	fechaEmision: Date;
	fechaVencimiento: Date;
}
