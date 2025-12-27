"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import { Badge } from "./badge";
import { ChevronRight, FileText, MoreHorizontal } from "lucide-react";
import { Button } from "./button";

export interface DataGridColumn<T> {
    header: string;
    accessorKey: keyof T;
    cell?: (item: T) => React.ReactNode;
    width?: string;
}

interface DataGridProps<T> {
    data: T[];
    columns: DataGridColumn<T>[];
    onRowClick?: (item: T) => void;
    className?: string;
    loading?: boolean;
}

export function DataGrid<T extends { id?: string | number }>({
    data,
    columns,
    onRowClick,
    className,
    loading,
}: DataGridProps<T>) {
    if (loading) {
        return (
            <div className="w-full space-y-2">
                {[1, 2, 3, 4, 5].map((i) => (
                    <div key={i} className="h-12 w-full animate-pulse rounded-md bg-muted/50" />
                ))}
            </div>
        )
    }

    return (
        <div className={cn("w-full overflow-hidden rounded-lg border bg-card shadow-sm", className)}>
            <div className="overflow-x-auto">
                <table className="w-full text-sm text-left">
                    <thead className="bg-muted/40 uppercase tracking-wider text-xs font-medium text-muted-foreground">
                        <tr>
                            {columns.map((col, i) => (
                                <th
                                    key={i}
                                    className="px-4 py-3 first:pl-6 last:pr-6 whitespace-nowrap"
                                    style={{ width: col.width }}
                                >
                                    {col.header}
                                </th>
                            ))}
                            <th className="w-[50px]"></th>
                        </tr>
                    </thead>
                    <tbody className="divide-y">
                        {data.length === 0 ? (
                            <tr>
                                <td colSpan={columns.length + 1} className="p-8 text-center text-muted-foreground">
                                    <FileText className="mx-auto h-8 w-8 opacity-20 mb-2" />
                                    No data found.
                                </td>
                            </tr>
                        ) : (
                            data.map((item, i) => (
                                <tr
                                    key={item.id || i}
                                    onClick={() => onRowClick?.(item)}
                                    className={cn(
                                        "group transition-colors hover:bg-muted/30 cursor-pointer",
                                        onRowClick ? "cursor-pointer" : "cursor-default"
                                    )}
                                >
                                    {columns.map((col, j) => (
                                        <td key={j} className="px-4 py-3 first:pl-6 last:pr-6 font-medium text-foreground">
                                            {col.cell ? col.cell(item) : String(item[col.accessorKey])}
                                        </td>
                                    ))}
                                    <td className="px-4 py-3 text-right">
                                        <ChevronRight className="h-4 w-4 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity" />
                                    </td>
                                </tr>
                            ))
                        )}

                    </tbody>
                </table>
            </div>
        </div>
    );
}

export function StatusBadge({
    status,
    className,
}: {
    status: "success" | "warning" | "error" | "neutral" | string;
    className?: string;
}) {
    const styles: Record<string, "default" | "secondary" | "destructive" | "outline" | "success" | "warning"> = {
        active: "success",
        completed: "success",
        paid: "success",
        pending: "warning",
        review: "warning",
        inactive: "secondary",
        draft: "secondary",
        cancelled: "destructive",
        failed: "destructive",
        critical: "destructive",
    };

    const variant = styles[status.toLowerCase()] || "outline";

    return (
        <Badge variant={variant} className={cn("capitalize font-semibold", className)}>
            {status}
        </Badge>
    );
}
