import { InstitucionEnum } from '../../../Shared/enums/institucion.enum';

export interface IUsuarioRegisterDto {
	cedula: string;
	nombre: string;
	apellido: string;
	rangoId: number;
	username: string;
	password: string;
	roles: number[];
}
