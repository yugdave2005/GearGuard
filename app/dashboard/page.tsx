import { KanbanBoard } from "@/components/kanban/kanban-board";

export default function DashboardPage() {
    return (
        <div>
            <div className="mb-6">
                <h1 className="text-3xl font-bold">Maintenance Dashboard</h1>
                <p className="text-muted-foreground mt-2">
                    Track and manage all maintenance requests
                </p>
            </div>

            <KanbanBoard />
        </div>
    );
}
