import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { useVirtualizer } from '@tanstack/react-virtual';
import type { ColumnsInt, TableRowInt as TableRowType } from "@/interfaces/TableInt";
import React, { useEffect } from "react";

interface Props {
    data: TableRowType[];
    columns: ColumnsInt;
    total?: number;
    onLoadMore?: () => void;
    hasMore?: boolean;
}

export default function CustomTable({ data, columns, onLoadMore, hasMore = true }: Props) {
    const parentRef = React.useRef<HTMLDivElement>(null)

    const rowVirtualizer = useVirtualizer({
        count: data.length,
        getScrollElement: () => parentRef.current,
        estimateSize: () => 35,
        overscan: 5,
    })

    useEffect(() => {
        const [lastItem] = [...rowVirtualizer.getVirtualItems()].reverse()
        if (!lastItem) return

        if (lastItem.index >= data.length - 1 && hasMore && onLoadMore) {
            onLoadMore()
        }
    }, [data.length, hasMore, onLoadMore, rowVirtualizer.getVirtualItems()])

    return (
        <div className="w-full h-full max-w-full overflow-x-auto">
            <div ref={parentRef} className="h-[600px] overflow-auto border-1 rounded-[10px] w-full">
                <Table className="w-full min-w-[700px]">
                    <TableHeader>
                        <TableRow>
                            {columns?.map((col) => (
                                <TableHead
                                    key={col.key}
                                    className={
                                        col.key === "titulo"
                                            ? "max-w-[400px] min-w-[200px] truncate"
                                            : col.key === "cited_by_count" 
                                            ? "max-w-[100px] min-w-[90px] truncate"
                                            : "max-w-[150px] min-w-[80px] truncate"
                                    }
                                >
                                    {col.header}
                                </TableHead>
                            ))}
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {rowVirtualizer.getVirtualItems().length > 0 && (
                            <tr style={{ height: `${rowVirtualizer.getVirtualItems()[0].start}px` }} />
                        )}
                        {rowVirtualizer.getVirtualItems().map((virtualRow) => {
                            const row = data[virtualRow.index];
                            return (
                                <TableRow
                                    key={virtualRow.index}
                                    className="hover:bg-gray-100 transition"
                                >
                                    {columns.map((col) => (
                                        <TableCell
                                            key={col.key}
                                            className={
                                                col.key === "titulo"
                                                    ? "max-w-[400px] min-w-[200px] truncate"
                                                    : col.key === "publication_year" 
                                                    ? "w-[50px] min-w-[80px] truncate"
                                                    : col.key === "cited_by_count" 
                                                    ? "w-[50px] min-w-[80px] truncate"
                                                    : "max-w-[150px] min-w-[80px] truncate"
                                            }
                                            title={col.key === "display_name"
                                                ? row?.authorships?.map((a) => a?.author?.display_name).join(", ")
                                                : String(row[col.key] ?? "")}
                                        >
                                            {col.key === "display_name"
                                                ? row?.authorships?.map((a) => a?.author?.display_name).join(", ")
                                                : String(row[col.key] ?? "")}
                                        </TableCell>
                                    ))}
                                </TableRow>
                            );
                        })}
                        {rowVirtualizer.getVirtualItems().length > 0 && (
                            <tr
                                style={{
                                    height: `${rowVirtualizer.getTotalSize() - rowVirtualizer.getVirtualItems().at(-1)!.end}px`,
                                }}
                            />
                        )}
                    </TableBody>
                </Table>
            </div>
        </div>
    )
}