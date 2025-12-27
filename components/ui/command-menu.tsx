"use client";

import * as React from "react";
import {
    Calculator,
    Calendar,
    CreditCard,
    Settings,
    Smile,
    User,
    Wrench,
    Search,
    LayoutDashboard,
    Users,
    ChartPie,
} from "lucide-react";
import { useRouter } from "next/navigation";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { cn } from "@/lib/utils";

export function CommandMenu() {
    const [open, setOpen] = React.useState(false);
    const router = useRouter();

    React.useEffect(() => {
        const down = (e: KeyboardEvent) => {
            if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
                e.preventDefault();
                setOpen((open) => !open);
            }
        };

        document.addEventListener("keydown", down);
        return () => document.removeEventListener("keydown", down);
    }, []);

    const runCommand = React.useCallback((command: () => unknown) => {
        setOpen(false);
        command();
    }, []);

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogContent className="overflow-hidden p-0 shadow-2xl">
                <div className="flex items-center border-b px-3" cmdk-input-wrapper="">
                    <Search className="mr-2 h-4 w-4 shrink-0 opacity-50" />
                    <input
                        className="flex h-11 w-full rounded-md bg-transparent py-3 text-sm outline-none placeholder:text-muted-foreground disabled:cursor-not-allowed disabled:opacity-50"
                        placeholder="Type a command or search..."
                        onChange={(e) => { }}
                    />
                </div>
                <div className="max-h-[300px] overflow-y-auto overflow-x-hidden">
                    <div className="py-2">
                        <div className="px-2 py-1.5 text-xs font-medium text-muted-foreground">Main</div>
                        <button onClick={() => runCommand(() => router.push("/dashboard"))} className="w-full flex items-center gap-2 px-2 py-1.5 text-sm hover:bg-accent hover:text-accent-foreground rounded-sm cursor-default">
                            <LayoutDashboard className="h-4 w-4" />
                            <span>Dashboard</span>
                        </button>
                        <button onClick={() => runCommand(() => router.push("/dashboard/analysis"))} className="w-full flex items-center gap-2 px-2 py-1.5 text-sm hover:bg-accent hover:text-accent-foreground rounded-sm cursor-default">
                            <ChartPie className="h-4 w-4" />
                            <span>Analysis</span>
                        </button>
                        <button onClick={() => runCommand(() => router.push("/dashboard/calendar"))} className="w-full flex items-center gap-2 px-2 py-1.5 text-sm hover:bg-accent hover:text-accent-foreground rounded-sm cursor-default">
                            <Calendar className="h-4 w-4" />
                            <span>Calendar</span>
                        </button>
                        <button onClick={() => runCommand(() => router.push("/dashboard/equipment"))} className="w-full flex items-center gap-2 px-2 py-1.5 text-sm hover:bg-accent hover:text-accent-foreground rounded-sm cursor-default">
                            <Wrench className="h-4 w-4" />
                            <span>Equipment</span>
                        </button>
                        <button onClick={() => runCommand(() => router.push("/dashboard/teams"))} className="w-full flex items-center gap-2 px-2 py-1.5 text-sm hover:bg-accent hover:text-accent-foreground rounded-sm cursor-default">
                            <Users className="h-4 w-4" />
                            <span>Teams</span>
                        </button>
                    </div>

                    <div className="border-t py-2">
                        <div className="px-2 py-1.5 text-xs font-medium text-muted-foreground">Settings</div>
                        <button onClick={() => runCommand(() => router.push("/dashboard/settings"))} className="w-full flex items-center gap-2 px-2 py-1.5 text-sm hover:bg-accent hover:text-accent-foreground rounded-sm cursor-default">
                            <Settings className="h-4 w-4" />
                            <span>Settings</span>
                        </button>
                        <button onClick={() => runCommand(() => router.push("/dashboard/profile"))} className="w-full flex items-center gap-2 px-2 py-1.5 text-sm hover:bg-accent hover:text-accent-foreground rounded-sm cursor-default">
                            <User className="h-4 w-4" />
                            <span>Profile</span>
                        </button>
                    </div>
                </div>
                <div className="border-t p-2 text-xs text-muted-foreground text-center">
                    Press <kbd className="pointer-events-none inline-flex h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium text-muted-foreground opacity-100">ESC</kbd> to close
                </div>
            </DialogContent>
        </Dialog>
    );
}
