import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import type { Filter, FiltersInt } from "@/interfaces/TableInt";

interface Props {
    search: string;
    sort: string;
    handleSearch: (value: string) => void;
    handleSort: (value: string) => void;
    filters: FiltersInt;
}

export default function CustomFilters({ search, sort, handleSearch, handleSort, filters }: Props) {

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
                    {filters.map((filter: Filter, index: number) => (
                        <SelectItem
                            key={index}
                            value={filter.value}
                        >
                            {filter.label}
                        </SelectItem>
                    ))}
                </SelectContent>
            </Select>
        </div>
    )
}
