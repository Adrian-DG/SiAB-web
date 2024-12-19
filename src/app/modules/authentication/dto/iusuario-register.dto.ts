import { InstitucionEnum } from '../../../Shared/enums/institucion.enum';

export interface IUsuarioRegisterDto {
	Cedula: string;
	Nombre: string;
	Apellido: string;
	RangoId: number;
	InstitucionEnum: InstitucionEnum;
	Username: string;
	Password: string;
	Roles: string[];
}
