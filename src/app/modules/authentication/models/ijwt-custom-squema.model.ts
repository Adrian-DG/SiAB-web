import { JwtPayload } from 'jwt-decode';

export interface IJwtCustomSquema extends JwtPayload {
	CodUsuario: number;
	Username: string;
	Roles: string[] | string;
	CodInstitucion: string;
}
