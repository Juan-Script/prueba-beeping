export default function PublicacionesColumns() {
    return [
        {
            key: "title",
            field: "title",
            header: "Título",
        },
        {
            key: "publication_year",
            field: "publication_year",
            header: "Año",
        },
        {
            key: "cited_by_count",
            field: "cited_by_count",
            header: "Citaciones",
        },
        {
            key: "display_name",
            field: "display_name",
            header: "Autores",
        },
    ]
}
