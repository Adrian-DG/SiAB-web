import { IPaginationFilter } from '../../../Shared/dtos/ipagination-filter.dto';

export interface ITransaccionPaginationFilterDto extends IPaginationFilter {
	fechaDesde: string;
	fechaHasta: string;
	formulario53: string;
	adjunto53: boolean;
	origen: string;
	destino: string;
}
