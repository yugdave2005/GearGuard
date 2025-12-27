"use client";

import { Calendar as BigCalendar, dateFnsLocalizer, View, Event as CalendarEvent } from "react-big-calendar";
import { format, parse, startOfWeek, getDay } from "date-fns";
import { enUS } from "date-fns/locale";
import "react-big-calendar/lib/css/react-big-calendar.css";
import { useMaintenanceRequests } from "@/hooks/use-maintenance-requests";
import { useState, useMemo } from "react";
import { getStatusColor } from "@/lib/utils";

const locales = {
    "en-US": enUS,
};

const localizer = dateFnsLocalizer({
    format,
    parse,
    startOfWeek,
    getDay,
    locales,
});

export function MaintenanceCalendar() {
    const { data: requests, isLoading } = useMaintenanceRequests();
    const [view, setView] = useState<View>("month");
    const [date, setDate] = useState(new Date());

    const events: CalendarEvent[] = useMemo(() => {
        if (!requests) return [];

        return requests
            .filter((req) => req.scheduled_date && req.request_type === "preventive")
            .map((req) => ({
                id: req.id,
                title: `${req.equipment?.name || "Equipment"} - ${req.subject}`,
                start: new Date(req.scheduled_date!),
                end: new Date(
                    new Date(req.scheduled_date!).getTime() + (req.duration || 60) * 60000
                ),
                resource: req,
            }));
    }, [requests]);

    if (isLoading) {
        return <div className="h-96 flex items-center justify-center">Loading...</div>;
    }

    return (
        <div className="bg-card p-6 rounded-lg border">
            <BigCalendar
                localizer={localizer}
                events={events}
                startAccessor="start"
                endAccessor="end"
                style={{ height: 600 }}
                view={view}
                onView={setView}
                date={date}
                onNavigate={setDate}
                eventPropGetter={(event: any) => ({
                    style: {
                        backgroundColor: event.resource?.status ?
                            getStatusColor(event.resource.status).replace("bg-", "#") : "#3b82f6",
                    },
                })}
            />
        </div>
    );
}
