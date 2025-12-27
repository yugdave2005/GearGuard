import { MaintenanceCalendar } from "@/components/calendar/maintenance-calendar";

export default function CalendarPage() {
    return (
        <div>
            <div className="mb-6">
                <h1 className="text-3xl font-bold">Maintenance Calendar</h1>
                <p className="text-muted-foreground mt-2">
                    View and schedule preventive maintenance
                </p>
            </div>

            <MaintenanceCalendar />
        </div>
    );
}
