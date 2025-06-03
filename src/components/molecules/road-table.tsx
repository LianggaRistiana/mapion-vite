import {
    type ColumnDef,
    flexRender,
    getCoreRowModel,
    useReactTable,
    getPaginationRowModel,
} from "@tanstack/react-table"

import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"

interface DataTableProps<TData, TValue> {
    columns: ColumnDef<TData, TValue>[]
    data: TData[]
    onRowClick: (row: TData) => void
    selectedRow?: TData | null
}
import { Button } from "@/components/ui/button"
import { useEffect, useState } from "react"
import { MoveLeft, MoveRight } from "lucide-react"

export function RoadTable<TData, TValue>({
    columns,
    data,
    onRowClick,
    selectedRow
}: DataTableProps<TData, TValue>) {

    const [pageSize, setPageSize] = useState(9);


    const table = useReactTable({
        data,
        columns,
        getCoreRowModel: getCoreRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        initialState: {
            pagination: {
                pageSize, // Set default page size
            },
        },
    });

    useEffect(() => {
        if (selectedRow && data.length > 0) {
            const rowIndex = data.findIndex((item) => item === selectedRow);
            if (rowIndex !== -1) {
                const pageIndex = Math.floor(rowIndex / pageSize);
                table.setPageIndex(pageIndex);
            }
        }
    }, [selectedRow, data, pageSize, table]);

    const currentPage = table.getState().pagination.pageIndex + 1;
    const totalPages = table.getPageCount();


    return (
        <div>

            <div className="rounded-md border h-[550px] overflow-y-auto">
                <Table>
                    <TableHeader>
                        {table.getHeaderGroups().map((headerGroup) => (
                            <TableRow key={headerGroup.id}>
                                {headerGroup.headers.map((header) => {
                                    return (
                                        <TableHead key={header.id} className="font-bold">
                                            {header.isPlaceholder
                                                ? null
                                                : flexRender(
                                                    header.column.columnDef.header,
                                                    header.getContext()
                                                )}
                                        </TableHead>
                                    )
                                })}
                            </TableRow>
                        ))}
                    </TableHeader>
                    <TableBody>
                        {table.getRowModel().rows?.length ? (
                            table.getRowModel().rows.map((row) => (
                                <TableRow
                                    key={row.id}
                                    data-state={row.getIsSelected() && "selected"}
                                    onClick={() => onRowClick(row.original)}
                                // className={selectedRow === row.original ? "bg-muted rounded-sm border-lg border-primary" : ""}
                                >
                                    {row.getVisibleCells().map((cell) => (
                                        <TableCell key={cell.id}
                                            className={selectedRow === row.original ? "bg-primary text-accent" : ""}
                                        >
                                            {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                        </TableCell>
                                    ))}
                                </TableRow>
                            ))
                        ) : (
                            <TableRow>
                                <TableCell colSpan={columns.length} className="h-24 text-center">
                                    Tidak ada jalan
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </div>
            <div className="flex items-center justify-between py-4">
                <div className="text-sm text-primary">
                    Halaman {currentPage} dari {totalPages}
                </div>
                <div className="flex items-center justify-end space-x-2 py-4">
                    <Button
                        size="icon"
                        onClick={() => table.previousPage()}
                        disabled={!table.getCanPreviousPage()}
                    >
                        <MoveLeft />
                    </Button>
                    <Button
                        size="icon"
                        onClick={() => table.nextPage()}
                        disabled={!table.getCanNextPage()}
                    >
                        <MoveRight />
                    </Button>
                </div>
            </div>
        </div>

    )
}