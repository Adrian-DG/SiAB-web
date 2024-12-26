import { JwtPayload } from 'jwt-decode';

export interface IJwtCustomSquema extends JwtPayload {
	usuarioId: string;
	username: string;
	roles: string[];
	codInstitucion: string;
}
