"use client";

import { useEquipment } from "@/hooks/use-equipment";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Loader2, Plus, Search, Wrench } from "lucide-react";
import { useState } from "react";
import Link from "next/link";
import { AddEquipmentDialog } from "@/components/equipment/add-equipment-dialog";

export default function EquipmentPage() {
    const { data: equipment, isLoading } = useEquipment();
    const [searchTerm, setSearchTerm] = useState("");

    const filteredEquipment = equipment?.filter((item) =>
        item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.serial_number.toLowerCase().includes(searchTerm.toLowerCase())
    );

    if (isLoading) {
        return (
            <div className="flex items-center justify-center h-96">
                <Loader2 className="w-8 h-8 animate-spin text-primary" />
            </div>
        );
    }

    return (
        <div>
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-6 gap-4">
                <div>
                    <h1 className="text-3xl font-bold">Equipment Management</h1>
                    <p className="text-muted-foreground mt-2">
                        Track and manage all assets
                    </p>
                </div>
                <AddEquipmentDialog />
            </div>

            {/* Search bar */}
            <div className="mb-6">
                <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                    <input
                        type="text"
                        placeholder="Search by name or serial number..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full pl-10 pr-4 py-2 border rounded-lg bg-background"
                    />
                </div>
            </div>

            {/* Equipment grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {filteredEquipment?.map((item) => (
                    <Card key={item.id} className="hover:shadow-lg transition-shadow">
                        <CardHeader>
                            <div className="flex items-start justify-between">
                                <div className="flex items-center gap-2">
                                    <Wrench className="w-5 h-5 text-primary" />
                                    <CardTitle className="text-lg">{item.name}</CardTitle>
                                </div>
                                <Badge variant={item.status === "active" ? "default" : "destructive"}>
                                    {item.status}
                                </Badge>
                            </div>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-2">
                                <p className="text-sm text-muted-foreground">
                                    Serial: {item.serial_number}
                                </p>
                                {item.location && (
                                    <p className="text-sm">{item.location}</p>
                                )}
                                {item.department && (
                                    <Badge variant="outline" className="text-xs">
                                        {item.department}
                                    </Badge>
                                )}
                                <Link href={`/dashboard/equipment/${item.id}`}>
                                    <Button variant="outline" size="sm" className="w-full mt-4">
                                        View Details
                                    </Button>
                                </Link>
                            </div>
                        </CardContent>
                    </Card>
                ))}
            </div>

            {filteredEquipment?.length === 0 && (
                <div className="text-center py-12">
                    <p className="text-muted-foreground">No equipment found</p>
                </div>
            )}
        </div>
    );
}
