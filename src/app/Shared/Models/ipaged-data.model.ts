export interface IPagedData<T> {
	page: number;
	size: number;
	totalCount: number;
	rows: T[];
}
