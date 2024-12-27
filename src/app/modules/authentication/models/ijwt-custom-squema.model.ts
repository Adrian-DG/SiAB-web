import { JwtPayload } from 'jwt-decode';

export interface IJwtCustomSquema extends JwtPayload {
	codUsuario: number;
	username: string;
	roles: string[];
	codInstitucion: string;
}
