import type { AuthorInt } from "./AuthorInt";

export interface PublicacionesInt {
    title: string;
    publication_year: string;
    cited_by_count: string;
    authorships: AuthorInt[];
}