"use client";

import { DragDropContext, Droppable, Draggable, DropResult } from "@hello-pangea/dnd";
import { useMaintenanceRequests, useUpdateRequestStatus } from "@/hooks/use-maintenance-requests";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Loader2 } from "lucide-react";
import { MaintenanceCard } from "./maintenance-card";
import { Database } from "@/types/database.types";

type RequestStatus = Database["public"]["Tables"]["maintenance_requests"]["Row"]["status"];

const columns: { id: RequestStatus; label: string; color: string }[] = [
    { id: "new", label: "New", color: "bg-blue-500" },
    { id: "in_progress", label: "In Progress", color: "bg-yellow-500" },
    { id: "repaired", label: "Repaired", color: "bg-green-500" },
    { id: "scrap", label: "Scrap", color: "bg-red-500" },
];

export function KanbanBoard() {
    const { data: requests, isLoading } = useMaintenanceRequests();
    const updateStatus = useUpdateRequestStatus();

    const handleDragEnd = (result: DropResult) => {
        const { destination, draggableId } = result;

        if (!destination) return;

        const newStatus = destination.droppableId as RequestStatus;

        updateStatus.mutate({
            id: draggableId,
            status: newStatus,
        });
    };

    if (isLoading) {
        return (
            <div className="flex items-center justify-center h-96">
                <Loader2 className="w-8 h-8 animate-spin text-primary" />
            </div>
        );
    }

    const groupedRequests = columns.reduce((acc, column) => {
        acc[column.id] = requests?.filter((req) => req.status === column.id) || [];
        return acc;
    }, {} as Record<RequestStatus, typeof requests>);

    return (
        <DragDropContext onDragEnd={handleDragEnd}>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {columns.map((column) => (
                    <Droppable key={column.id} droppableId={column.id}>
                        {(provided, snapshot) => (
                            <Card
                                className={`${snapshot.isDraggingOver ? "ring-2 ring-primary" : ""
                                    } transition-all`}
                            >
                                <CardHeader className="pb-3">
                                    <div className="flex items-center justify-between">
                                        <CardTitle className="text-lg font-semibold">
                                            {column.label}
                                        </CardTitle>
                                        <Badge variant="secondary">
                                            {groupedRequests[column.id]?.length || 0}
                                        </Badge>
                                    </div>
                                    <div className={`h-1 rounded-full ${column.color} mt-2`} />
                                </CardHeader>
                                <CardContent>
                                    <div
                                        ref={provided.innerRef}
                                        {...provided.droppableProps}
                                        className="space-y-3 min-h-[400px]"
                                    >
                                        {groupedRequests[column.id]?.map((request, index) => (
                                            <Draggable
                                                key={request.id}
                                                draggableId={request.id}
                                                index={index}
                                            >
                                                {(provided, snapshot) => (
                                                    <div
                                                        ref={provided.innerRef}
                                                        {...provided.draggableProps}
                                                        {...provided.dragHandleProps}
                                                    >
                                                        <MaintenanceCard
                                                            request={request}
                                                            isDragging={snapshot.isDragging}
                                                        />
                                                    </div>
                                                )}
                                            </Draggable>
                                        ))}
                                        {provided.placeholder}
                                    </div>
                                </CardContent>
                            </Card>
                        )}
                    </Droppable>
                ))}
            </div>
        </DragDropContext>
    );
}
