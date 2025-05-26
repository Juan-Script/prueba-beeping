import CustomTable from "@/shared/components/CustomTable";
import { useData } from "@/shared/hooks/useData";
import { EndpointTypes } from "@/shared/utils/Types/EndpointTypes";
import PublicacionesColumns from "./Columns/PublicacionesColumns";
import { useState } from "react";
import CustomFilters from "@/shared/components/CustomFilters";

export default function PublicacionesTable() {
    const [page, setPage] = useState(1);
    const [search, setSearch] = useState("");
    const [sort, setSort] = useState("cited_by_count:desc");

    const { data, loading, hasMore } = useData({
        endpoint: EndpointTypes.WORKS,
        page,
        limit: 20,
        sort,
        search
    });

    const handleLoadMore = () => {
        if (!loading && hasMore) {
            setPage(prev => prev + 1);
        }
    };

    const handleSearch = (value: string) => {
        setSearch(value);
        setPage(1);
    };

    const handleSort = (value: string) => {
        setSort(value);
        setPage(1);
    };

    const filters = [
        {
            value: "cited_by_count:desc",
            label: "Más citados",
        },
        {
            value: "cited_by_count:asc",
            label: "Menos citados",
        },
        {
            value: "publication_date:desc",
            label: "Más recientes",
        },
        {
            value: "publication_date:asc",
            label: "Más antiguos",
        },
    ]

    return (
        <div className="space-y-4 my-4 mx-4">
            <CustomFilters 
                search={search}
                sort={sort}
                handleSearch={handleSearch}
                handleSort={handleSort}
                filters={filters}
            />
            <CustomTable
                data={data?.results || []}
                columns={PublicacionesColumns()}
                onLoadMore={handleLoadMore}
                hasMore={hasMore}
            />
        </div>
    )
}
