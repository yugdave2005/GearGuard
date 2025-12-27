"use client";

import { useParams } from "next/navigation";
import { useEquipmentById, useEquipmentMaintenanceHistory } from "@/hooks/use-equipment";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Loader2, History, Calendar, MapPin, Building2, Shield } from "lucide-react";
import { formatDate, getStatusLabel } from "@/lib/utils";

export default function EquipmentDetailPage() {
    const params = useParams();
    const id = params.id as string;

    const { data: equipment, isLoading } = useEquipmentById(id);
    const { data: maintenanceHistory } = useEquipmentMaintenanceHistory(id);

    if (isLoading) {
        return (
            <div className="flex items-center justify-center h-96">
                <Loader2 className="w-8 h-8 animate-spin text-primary" />
            </div>
        );
    }

    if (!equipment) {
        return <div className="text-center py-12">Equipment not found</div>;
    }

    return (
        <div>
            {/* Header */}
            <div className="flex items-center justify-between mb-6">
                <div>
                    <h1 className="text-3xl font-bold">{equipment.name}</h1>
                    <p className="text-muted-foreground mt-1">
                        Serial: {equipment.serial_number}
                    </p>
                </div>
                <Badge variant={equipment.status === "active" ? "default" : "destructive"} className="text-lg px-4 py-2">
                    {equipment.status}
                </Badge>
            </div>

            {/* Equipment Details */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
                <Card>
                    <CardHeader>
                        <CardTitle>Equipment Information</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        {equipment.purchase_date && (
                            <div className="flex items-center gap-3">
                                <Calendar className="w-5 h-5 text-muted-foreground" />
                                <div>
                                    <p className="text-sm text-muted-foreground">Purchase Date</p>
                                    <p className="font-medium">{formatDate(equipment.purchase_date)}</p>
                                </div>
                            </div>
                        )}
                        {equipment.warranty_expiry && (
                            <div className="flex items-center gap-3">
                                <Shield className="w-5 h-5 text-muted-foreground" />
                                <div>
                                    <p className="text-sm text-muted-foreground">Warranty Expires</p>
                                    <p className="font-medium">{formatDate(equipment.warranty_expiry)}</p>
                                </div>
                            </div>
                        )}
                        {equipment.location && (
                            <div className="flex items-center gap-3">
                                <MapPin className="w-5 h-5 text-muted-foreground" />
                                <div>
                                    <p className="text-sm text-muted-foreground">Location</p>
                                    <p className="font-medium">{equipment.location}</p>
                                </div>
                            </div>
                        )}
                        {equipment.department && (
                            <div className="flex items-center gap-3">
                                <Building2 className="w-5 h-5 text-muted-foreground" />
                                <div>
                                    <p className="text-sm text-muted-foreground">Department</p>
                                    <p className="font-medium">{equipment.department}</p>
                                </div>
                            </div>
                        )}
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle>Assignment</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        {equipment.assigned_to_profile && (
                            <div>
                                <p className="text-sm text-muted-foreground mb-1">Assigned To</p>
                                <p className="font-medium">{equipment.assigned_to_profile.full_name}</p>
                                <Badge variant="outline" className="mt-1">
                                    {equipment.assigned_to_profile.role}
                                </Badge>
                            </div>
                        )}
                        {equipment.maintenance_team && (
                            <div>
                                <p className="text-sm text-muted-foreground mb-1">Maintenance Team</p>
                                <p className="font-medium">{equipment.maintenance_team.name}</p>
                            </div>
                        )}
                    </CardContent>
                </Card>
            </div>

            {/* Maintenance History Section */}
            <Card>
                <CardHeader>
                    <div className="flex items-center justify-between">
                        <CardTitle className="flex items-center gap-2">
                            <History className="w-5 h-5" />
                            Maintenance History
                        </CardTitle>
                        <Button>
                            Schedule Maintenance
                        </Button>
                    </div>
                </CardHeader>
                <CardContent>
                    {maintenanceHistory && maintenanceHistory.length > 0 ? (
                        <div className="space-y-3">
                            {maintenanceHistory.map((request) => (
                                <div key={request.id} className="border-l-4 border-primary pl-4 py-2">
                                    <div className="flex items-center justify-between">
                                        <div>
                                            <h4 className="font-medium">{request.subject}</h4>
                                            <p className="text-sm text-muted-foreground">
                                                {request.description || "No description"}
                                            </p>
                                        </div>
                                        <div className="text-right">
                                            <Badge>{getStatusLabel(request.status)}</Badge>
                                            <p className="text-xs text-muted-foreground mt-1">
                                                {formatDate(request.created_at)}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <p className="text-center text-muted-foreground py-8">
                            No maintenance history available
                        </p>
                    )}
                </CardContent>
            </Card>
        </div>
    );
}
