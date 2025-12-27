"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { AlertCircle, Calendar, Wrench } from "lucide-react";
import { Database } from "@/types/database.types";
import { isOverdue, formatDate, getStatusLabel } from "@/lib/utils";

type MaintenanceRequest = Database["public"]["Tables"]["maintenance_requests"]["Row"] & {
    equipment?: Database["public"]["Tables"]["equipment"]["Row"];
    assigned_technician?: Database["public"]["Tables"]["profiles"]["Row"];
};

interface MaintenanceCardProps {
    request: MaintenanceRequest;
    isDragging?: boolean;
}

export function MaintenanceCard({ request, isDragging }: MaintenanceCardProps) {
    const overdue = isOverdue(request.scheduled_date, request.status);
    const initials = request.assigned_technician?.full_name
        ?.split(" ")
        .map((n) => n[0])
        .join("")
        .toUpperCase() || "?";

    return (
        <Card
            className={`cursor-move hover:shadow-md transition-shadow ${isDragging ? "opacity-50 rotate-2" : ""
                }`}
        >
            <CardContent className="p-4">
                {/* Header with overdue badge */}
                <div className="flex items-start justify-between mb-2">
                    <div className="flex-1">
                        <h4 className="font-semibold text-sm line-clamp-1">
                            {request.subject}
                        </h4>
                        <p className="text-xs text-muted-foreground line-clamp-1 mt-1">
                            {request.equipment?.name || "Unknown Equipment"}
                        </p>
                    </div>
                    {overdue && (
                        <Badge variant="destructive" className="ml-2 flex items-center gap-1">
                            <AlertCircle className="w-3 h-3" />
                            OVERDUE
                        </Badge>
                    )}
                </div>

                {/* Request type badge */}
                <div className="flex items-center gap-2 mb-3">
                    <Badge variant="outline" className="text-xs">
                        <Wrench className="w-3 h-3 mr-1" />
                        {getStatusLabel(request.request_type)}
                    </Badge>
                    {request.scheduled_date && (
                        <div className="flex items-center text-xs text-muted-foreground">
                            <Calendar className="w-3 h-3 mr-1" />
                            {formatDate(request.scheduled_date)}
                        </div>
                    )}
                </div>

                {/* Technician avatar */}
                <div className="flex items-center gap-2 pt-2 border-t">
                    {request.assigned_technician ? (
                        <>
                            <Avatar className="h-6 w-6">
                                <AvatarFallback className="text-xs">
                                    {initials}
                                </AvatarFallback>
                            </Avatar>
                            <span className="text-xs text-muted-foreground">
                                {request.assigned_technician.full_name}
                            </span>
                        </>
                    ) : (
                        <span className="text-xs text-muted-foreground italic">
                            No technician assigned
                        </span>
                    )}
                </div>
            </CardContent>
        </Card>
    );
}
