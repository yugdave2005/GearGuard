import { KanbanBoard } from "@/components/kanban/kanban-board";
import { AddMaintenanceDialog } from "@/components/kanban/add-maintenance-dialog";

export default function DashboardPage() {
    return (
        <div>
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-6 gap-4">
                <div>
                    <h1 className="text-3xl font-bold">Maintenance Dashboard</h1>
                    <p className="text-muted-foreground mt-2">
                        Track and manage all maintenance requests
                    </p>
                </div>
                <AddMaintenanceDialog />
            </div>

            <KanbanBoard />
        </div>
    );
}
