"use client"

import * as React from "react"
import { CaretSortIcon, DotsHorizontalIcon, } from "@radix-ui/react-icons"
import { ColumnDef, ColumnFiltersState, SortingState, VisibilityState, flexRender, getCoreRowModel, getFilteredRowModel, getPaginationRowModel, getSortedRowModel, useReactTable, } from "@tanstack/react-table"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger, } from "@/components/ui/dropdown-menu"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow, } from "@/components/ui/table"
import { Badge } from "../ui/badge"
import { LinkButton } from "../ui/link-button"
import { timeSince } from "@/lib/utils"
import Link from "next/link"
import { toast } from "sonner"
import { ProjectsResponse } from "@/types/projects-response"
import { isEmpty } from "lodash"

export const columns: ColumnDef<ProjectsResponse>[] = [
    // {
    //     accessorKey: "status",
    //     header: "Status",
    //     cell: ({ row }: any) => (
    //         <Badge variant={row.getValue("status") == "deployed" ? 'success' : row.getValue("status") == "failed" ? 'destructive' : 'default'}>{row.getValue("status")}</Badge>
    //     ),
    // },
    {
        accessorKey: "name",
        header: ({ column }: any) => {
            return (
                <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === "asc")} >
                    Project
                    <CaretSortIcon className="ml-2 h-4 w-4" />
                </Button>
            )
        },
        cell: ({ row }: any) => <LinkButton variant={'ghost'}>{row.getValue("name")}</LinkButton>,
    },
    {
        accessorKey: "technology_used",
        header: ({ column }: any) => {
            return (
                <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === "asc")} >
                    Stack
                    <CaretSortIcon className="ml-2 h-4 w-4" />
                </Button>
            )
        },
        cell: ({ row }: any) => <LinkButton variant={'ghost'}>{row.getValue("technology_used")}</LinkButton>,
    },
    {
        accessorKey: "last_deployed",
        header: ({ column }: any) => {
            return (
                <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === "asc")} >
                    Last deployed
                    <CaretSortIcon className="ml-2 h-4 w-4" />
                </Button>
            )
        },
        cell: ({ row }: any) => <div className="h-10 px-4 py-2">{row.getValue("last_deployed") ? timeSince(row.getValue("last_deployed")): "Never"}</div>,
    },
    {
        id: "actions",
        enableHiding: false,
        cell: ({ row }: any) => {
            const project = row.original
            return (
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="h-8 w-8 p-0">
                            <span className="sr-only">Open menu</span>
                            <DotsHorizontalIcon className="h-4 w-4" />
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                        <DropdownMenuLabel>Actions</DropdownMenuLabel>
                        <DropdownMenuItem>
                            <Link href={`/dashboard/projects/update/${project.id}`}>
                                Settings
                            </Link>
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                            <Link href={`/dashboard/deployments/${project.id}`}>
                                Deployments
                            </Link>

                        </DropdownMenuItem>
                        <DropdownMenuItem>
                            <Link href={`/dashboard/analytics/${project.id}`}>
                                Analytics
                            </Link>
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            )
        },
    },
]

export function ProjectsTable({ projects = [] }: { projects: ProjectsResponse[] }) {
    const [sorting, setSorting] = React.useState<SortingState>([])
    const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>([])
    const [columnVisibility, setColumnVisibility] = React.useState<VisibilityState>({})
    const [rowSelection, setRowSelection] = React.useState({})

    const table = useReactTable({
        data: projects, columns, onSortingChange: setSorting, onColumnFiltersChange: setColumnFilters, getCoreRowModel: getCoreRowModel(), getPaginationRowModel: getPaginationRowModel(), getSortedRowModel: getSortedRowModel(), getFilteredRowModel: getFilteredRowModel(), onColumnVisibilityChange: setColumnVisibility, onRowSelectionChange: setRowSelection,
        state: { sorting, columnFilters, columnVisibility, rowSelection, },
    })

    return (
        <div className="grid gap-6 max-w-6xl w-full mx-auto">
            <div className="flex flex-col md:flex-row md:items-center gap-2 md:gap-4">
                <Input placeholder="Search Project..."
                    value={(table.getColumn("name")?.getFilterValue() as string) ?? ""}
                    onChange={(event) =>
                        table.getColumn("name")?.setFilterValue(event.target.value)
                    } />
            </div>
            <div className="rounded-md border overflow-x-auto">
                <Table>
                    <TableHeader>
                        {table.getHeaderGroups().map((headerGroup: any) => (
                            <TableRow key={headerGroup.id}>
                                {headerGroup.headers.map((header: any) => {
                                    return (
                                        <TableHead key={header.id}>
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
                            table.getRowModel().rows.map((row: any) => (
                                <TableRow key={row.id} data-state={row.getIsSelected() && "selected"} >
                                    {row.getVisibleCells().map((cell: any) => (
                                        <TableCell key={cell.id}>
                                            {flexRender(
                                                cell.column.columnDef.cell,
                                                cell.getContext()
                                            )}
                                        </TableCell>
                                    ))}
                                </TableRow>
                            ))
                        ) : (
                            <TableRow>
                                <TableCell colSpan={columns.length} className="h-24 text-center" >
                                    No results.
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </div>
            <div className="flex items-center justify-end space-x-2 py-4">
                <div className="space-x-2">
                    <Button variant="outline" size="sm" onClick={() => table.previousPage()} disabled={!table.getCanPreviousPage()} >
                        Previous
                    </Button>
                    <Button variant="outline" size="sm" onClick={() => table.nextPage()} disabled={!table.getCanNextPage()} >
                        Next
                    </Button>
                </div>
            </div>
        </div>
    )
}
