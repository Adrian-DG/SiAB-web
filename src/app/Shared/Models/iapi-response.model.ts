export interface IApiResponse<T> {
	title: string;
	message: string;
	code: number;
	data: T;
	status: boolean;
}
