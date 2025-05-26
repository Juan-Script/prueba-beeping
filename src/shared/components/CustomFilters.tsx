import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface Props {
    search: any;
    sort: any;
    handleSearch: any;
    handleSort: any;
}

export default function CustomFilters({ search, sort, handleSearch, handleSort }: Props) {
    return (
        <div className="flex gap-4">
            <Input
                placeholder="Buscar por título..."
                value={search}
                onChange={(e) => handleSearch(e.target.value)}
                className="max-w-sm"
            />
            <Select value={sort} onValueChange={handleSort}>
                <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Ordenar por" />
                </SelectTrigger>
                <SelectContent>
                    <SelectItem value="cited_by_count:desc">Más citados</SelectItem>
                    <SelectItem value="cited_by_count:asc">Menos citados</SelectItem>
                    <SelectItem value="publication_date:desc">Más recientes</SelectItem>
                    <SelectItem value="publication_date:asc">Más antiguos</SelectItem>
                </SelectContent>
            </Select>
        </div>
    )
}
