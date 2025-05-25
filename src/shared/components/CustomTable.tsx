import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import type { ColumnsInt } from "@/interfaces/ColumnsInt";

interface Props {
    data: any;
    columns: any[];
    total?: number;
}

export default function CustomTable({ data, columns }: Props) {

    return (
        <Table className="p-[20px]">
            <TableCaption className="text-[14px]">
                Listado de publicaciones académicas
            </TableCaption>
            <TableHeader>
                <TableRow>
                    {columns?.map((col) => (
                        <TableHead key={col.key}>{col.header}</TableHead>
                    ))}
                </TableRow>
            </TableHeader>
            <TableBody>
                {data.map((row: any, idx: number) => (
                    <TableRow key={idx}>
                        {columns.map((col) => (
                            <TableCell key={col.key}>
                                {String(row[col.key] ?? "")}
                            </TableCell>
                        ))}
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    )
}
