"use client";

import { KanbanBoard } from "@/components/kanban/kanban-board";
import { AddMaintenanceDialog } from "@/components/kanban/add-maintenance-dialog";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Activity, CheckCircle2, Clock, Wrench } from "lucide-react";
import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer
} from 'recharts';

const chartData = [
    { name: 'Mon', completed: 4, pending: 2 },
    { name: 'Tue', completed: 3, pending: 5 },
    { name: 'Wed', completed: 7, pending: 1 },
    { name: 'Thu', completed: 2, pending: 3 },
    { name: 'Fri', completed: 5, pending: 4 },
    { name: 'Sat', completed: 6, pending: 2 },
    { name: 'Sun', completed: 3, pending: 1 },
];

export default function DashboardPage() {
    return (
        <div className="space-y-6">
            {/* Page Header */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div>
                    <h1 className="text-2xl font-bold tracking-tight">Overview</h1>
                    <p className="text-sm text-muted-foreground mt-1">
                        Maintenance system status and key performance indicators.
                    </p>
                </div>
                <div className="flex items-center gap-2">
                    <AddMaintenanceDialog />
                </div>
            </div>

            {/* KPI Ribbon */}
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                <Card className="shadow-soft hover:shadow-medium transition-shadow">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Total Requests</CardTitle>
                        <Activity className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">128</div>
                        <p className="text-xs text-muted-foreground">+10% from last month</p>
                    </CardContent>
                </Card>
                <Card className="shadow-soft hover:shadow-medium transition-shadow">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">In Progress</CardTitle>
                        <Clock className="h-4 w-4 text-warning" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">12</div>
                        <p className="text-xs text-muted-foreground">3 high priority</p>
                    </CardContent>
                </Card>
                <Card className="shadow-soft hover:shadow-medium transition-shadow">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Repaired</CardTitle>
                        <CheckCircle2 className="h-4 w-4 text-success" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">84</div>
                        <p className="text-xs text-muted-foreground">94% success rate</p>
                    </CardContent>
                </Card>
                <Card className="shadow-soft hover:shadow-medium transition-shadow">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Active Teams</CardTitle>
                        <Wrench className="h-4 w-4 text-primary" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">4</div>
                        <p className="text-xs text-muted-foreground">All teams operational</p>
                    </CardContent>
                </Card>
            </div>

            {/* Charts & Board Layout */}
            <div className="grid gap-4 md:grid-cols-7 lg:grid-cols-8">
                {/* Main Content Area (Kanban) - Takes more width */}
                <div className="col-span-4 md:col-span-7 lg:col-span-8">
                    <div className="flex items-center justify-between mb-4">
                        <h2 className="text-lg font-semibold tracking-tight">Active Work Board</h2>
                    </div>
                    {/* We wrap the existing Kanban in a container that fits the new style */}
                    <div className="rounded-xl border bg-card text-card-foreground shadow-soft p-1">
                        <KanbanBoard />
                    </div>
                </div>

                {/* Chart Section - Optionally sidebar-like or below. 
                     Responsive grid makes it flow. Let's put a chart below the KPI in normal flow or side-by-side if we had more real estate.
                     For now, let's put it in a separate row if data density is high. 
                     But user requested "Summary Ribbon" then "Home dashboard".
                     Let's add a Chart row above the Kanban.
                 */}
            </div>

            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                <Card className="col-span-2 shadow-soft">
                    <CardHeader>
                        <CardTitle>Weekly Maintenance Activity</CardTitle>
                    </CardHeader>
                    <CardContent className="pl-2">
                        <div className="h-[200px] w-full">
                            <ResponsiveContainer width="100%" height="100%">
                                <BarChart data={chartData}>
                                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="hsl(var(--border))" />
                                    <XAxis
                                        dataKey="name"
                                        stroke="#888888"
                                        fontSize={12}
                                        tickLine={false}
                                        axisLine={false}
                                    />
                                    <YAxis
                                        stroke="#888888"
                                        fontSize={12}
                                        tickLine={false}
                                        axisLine={false}
                                        tickFormatter={(value) => `${value}`}
                                    />
                                    <Tooltip
                                        cursor={{ fill: 'transparent' }}
                                        contentStyle={{ backgroundColor: 'hsl(var(--card))', borderRadius: '8px', border: '1px solid hsl(var(--border))' }}
                                    />
                                    <Bar dataKey="completed" fill="hsl(var(--chart-1))" radius={[4, 4, 0, 0]} />
                                    <Bar dataKey="pending" fill="hsl(var(--muted-foreground))" radius={[4, 4, 0, 0]} opacity={0.3} />
                                </BarChart>
                            </ResponsiveContainer>
                        </div>
                    </CardContent>
                </Card>

                <Card className="col-span-1 shadow-soft">
                    <CardHeader>
                        <CardTitle>Recent Activity</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-4">
                            {[1, 2, 3].map((_, i) => (
                                <div key={i} className="flex items-center gap-4">
                                    <div className="h-2 w-2 rounded-full bg-primary" />
                                    <div className="space-y-1">
                                        <p className="text-sm font-medium leading-none">Generator #4 maintenance</p>
                                        <p className="text-xs text-muted-foreground">Completed by Mike 2h ago</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
