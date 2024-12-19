import { JwtPayload } from 'jwt-decode';

export interface IJwtCustomSquema extends JwtPayload {
	nameId: string;
	name: string;
}
