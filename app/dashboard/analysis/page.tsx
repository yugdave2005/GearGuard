"use client";

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { cn } from "@/lib/utils";
import { CalendarIcon, Download, Filter } from "lucide-react";
import { format } from "date-fns";
import * as React from "react";
import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
    PieChart,
    Pie,
    Cell,
    Legend,
    LineChart,
    Line
} from 'recharts';

// Mock Data
const weeklyActivityData = [
    { name: 'Mon', completed: 4, pending: 2, urgent: 1 },
    { name: 'Tue', completed: 3, pending: 5, urgent: 0 },
    { name: 'Wed', completed: 7, pending: 1, urgent: 2 },
    { name: 'Thu', completed: 2, pending: 3, urgent: 1 },
    { name: 'Fri', completed: 5, pending: 4, urgent: 0 },
    { name: 'Sat', completed: 6, pending: 2, urgent: 1 },
    { name: 'Sun', completed: 3, pending: 1, urgent: 0 },
];

const statusDistributionData = [
    { name: 'In Progress', value: 12, color: 'hsl(var(--warning))' },
    { name: 'Completed', value: 84, color: 'hsl(var(--success))' },
    { name: 'Pending', value: 8, color: 'hsl(var(--muted-foreground))' },
    { name: 'Critical', value: 3, color: 'hsl(var(--destructive))' },
];

const teamPerformanceData = [
    { name: 'Electrical', resolved: 45, avgTime: 2.5 },
    { name: 'Mechanical', resolved: 32, avgTime: 3.8 },
    { name: 'HVAC', resolved: 18, avgTime: 1.2 },
    { name: 'Plumbing', resolved: 12, avgTime: 1.5 },
];

export default function AnalysisPage() {
    const [date, setDate] = React.useState<Date | undefined>(new Date());

    return (
        <div className="space-y-6">
            {/* Header with Filters */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div>
                    <h1 className="text-2xl font-bold tracking-tight">Analysis & Reports</h1>
                    <p className="text-sm text-muted-foreground mt-1">
                        Deep dive into maintenance metrics and team performance.
                    </p>
                </div>
                <div className="flex flex-wrap items-center gap-2">
                    <div className="relative">
                        <input
                            type="date"
                            className="h-10 rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                        />
                    </div>

                    <Select defaultValue="all">
                        <SelectTrigger className="w-[180px]">
                            <SelectValue placeholder="Select Team" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="all">All Teams</SelectItem>
                            <SelectItem value="electrical">Electrical</SelectItem>
                            <SelectItem value="mechanical">Mechanical</SelectItem>
                            <SelectItem value="hvac">HVAC</SelectItem>
                        </SelectContent>
                    </Select>

                    <Button variant="outline" size="icon">
                        <Filter className="h-4 w-4" />
                    </Button>
                    <Button variant="outline" size="icon">
                        <Download className="h-4 w-4" />
                    </Button>
                </div>
            </div>

            {/* Charts Grid */}
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">

                {/* Weekly Activity (Main Chart) */}
                <Card className="col-span-2 lg:col-span-4 shadow-soft">
                    <CardHeader>
                        <CardTitle>Weekly Maintenance Activity</CardTitle>
                        <CardDescription>
                            Requests completed vs pending over the last 7 days.
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="pl-2">
                        <div className="h-[300px] w-full">
                            <ResponsiveContainer width="100%" height="100%">
                                <BarChart data={weeklyActivityData}>
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
                                    />
                                    <Tooltip
                                        cursor={{ fill: 'transparent' }}
                                        contentStyle={{ backgroundColor: 'hsl(var(--card))', borderRadius: '8px', border: '1px solid hsl(var(--border))' }}
                                    />
                                    <Legend />
                                    <Bar name="Completed" dataKey="completed" fill="hsl(var(--chart-1))" radius={[4, 4, 0, 0]} />
                                    <Bar name="Pending" dataKey="pending" fill="hsl(var(--muted-foreground))" radius={[4, 4, 0, 0]} opacity={0.3} />
                                </BarChart>
                            </ResponsiveContainer>
                        </div>
                    </CardContent>
                </Card>

                {/* Status Distribution (Pie Chart) */}
                <Card className="col-span-2 lg:col-span-3 shadow-soft">
                    <CardHeader>
                        <CardTitle>Request Status Distribution</CardTitle>
                        <CardDescription>Current breakdown of all active tickets.</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="h-[300px] w-full">
                            <ResponsiveContainer width="100%" height="100%">
                                <PieChart>
                                    <Pie
                                        data={statusDistributionData}
                                        cx="50%"
                                        cy="50%"
                                        innerRadius={60}
                                        outerRadius={80}
                                        paddingAngle={5}
                                        dataKey="value"
                                    >
                                        {statusDistributionData.map((entry, index) => (
                                            <Cell key={`cell-${index}`} fill={entry.color} />
                                        ))}
                                    </Pie>
                                    <Tooltip
                                        contentStyle={{ backgroundColor: 'hsl(var(--card))', borderRadius: '8px', border: '1px solid hsl(var(--border))' }}
                                        itemStyle={{ color: 'hsl(var(--foreground))' }}
                                    />
                                    <Legend
                                        verticalAlign="bottom"
                                        height={36}
                                        formatter={(value, entry: any) => <span style={{ color: 'hsl(var(--muted-foreground))' }}>{value}</span>}
                                    />
                                </PieChart>
                            </ResponsiveContainer>
                        </div>
                    </CardContent>
                </Card>

                {/* Team Performance (Bar Chart) */}
                <Card className="col-span-2 lg:col-span-7 shadow-soft">
                    <CardHeader>
                        <CardTitle>Team Performance Overview</CardTitle>
                        <CardDescription>
                            Comparing Total Resolved Tickets vs Average Resolution Time (hours).
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="h-[300px] w-full">
                            <ResponsiveContainer width="100%" height="100%">
                                <BarChart data={teamPerformanceData} layout="vertical" barGap={0} barSize={20}>
                                    <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="hsl(var(--border))" />
                                    <XAxis type="number" stroke="#888888" fontSize={12} tickLine={false} axisLine={false} />
                                    <YAxis
                                        dataKey="name"
                                        type="category"
                                        stroke="#888888"
                                        fontSize={12}
                                        tickLine={false}
                                        axisLine={false}
                                        width={100}
                                    />
                                    <Tooltip
                                        cursor={{ fill: 'transparent' }}
                                        contentStyle={{ backgroundColor: 'hsl(var(--card))', borderRadius: '8px', border: '1px solid hsl(var(--border))' }}
                                    />
                                    <Legend />
                                    <Bar name="Resolved Tickets" dataKey="resolved" fill="hsl(var(--chart-2))" radius={[0, 4, 4, 0]} />
                                    <Bar name="Avg Time (hrs)" dataKey="avgTime" fill="hsl(var(--chart-5))" radius={[0, 4, 4, 0]} />
                                </BarChart>
                            </ResponsiveContainer>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
