import type { AuthorInt } from "./AuthorInt";

export interface TableRowInt {
    titulo: string;
    display_name: string;
    publication_year: number;
    cited_by_count: number;
    authorships?: AuthorInt[];
    [key: string]: any;
}

export interface ColumnInt {
    key: keyof TableRowInt;
    field: string;
    header: string;
    sortable?: boolean;
    width?: string;
    minWidth?: string;
}

export type ColumnsInt = ColumnInt[]

export interface Filter {
    value: string;
    label: string;
}

export type FiltersInt = Filter[];

export interface PaginatedResponseInt {
    results: TableRowInt[];
    count: number;
    next: string | null;
    previous: string | null;
}

export interface ApiErrorInt {
    response?: {
        status: number;
        data: unknown;
    };
    message?: string;
}

export interface UseDataReturnInt {
    data: PaginatedResponseInt | null;
    loading: boolean;
    error: ApiErrorInt | null;
    refresh: () => Promise<void>;
    status: number | undefined;
    hasMore: boolean;
}