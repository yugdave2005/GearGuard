"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import {
    LayoutDashboard,
    Calendar,
    Wrench,
    Users,
    Settings,
    Gauge,
    ChevronLeft,
    ChevronRight,
    ChartPie,
} from "lucide-react";

const navItems = [
    { href: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
    { href: "/dashboard/analysis", label: "Analysis", icon: ChartPie },
    { href: "/dashboard/calendar", label: "Calendar", icon: Calendar },
    { href: "/dashboard/equipment", label: "Equipment", icon: Wrench },
    { href: "/dashboard/teams", label: "Teams", icon: Users },
];

interface SidebarProps {
    className?: string;
    onClose?: () => void;
}

export function Sidebar({ className, onClose }: SidebarProps) {
    const pathname = usePathname();
    const [collapsed, setCollapsed] = React.useState(false);

    return (
        <div
            className={cn(
                "border-r bg-card h-screen flex flex-col transition-all duration-300 relative group",
                collapsed ? "w-16" : "w-64",
                className
            )}
        >
            {/* Collapse Toggle */}
            <button
                onClick={() => setCollapsed(!collapsed)}
                className="absolute -right-3 top-6 z-20 h-6 w-6 rounded-full border bg-background flex items-center justify-center shadow-md hover:bg-accent text-muted-foreground"
            >
                {collapsed ? <ChevronRight className="h-4 w-4" /> : <ChevronLeft className="h-4 w-4" />}
            </button>

            {/* Logo */}
            <div className={cn(
                "h-16 flex items-center border-b px-4",
                collapsed ? "justify-center" : "gap-2"
            )}>
                <Gauge className="w-8 h-8 text-primary shrink-0" />
                {!collapsed && (
                    <div className="overflow-hidden whitespace-nowrap">
                        <h1 className="text-xl font-bold tracking-tight">GearGuard</h1>
                    </div>
                )}
            </div>

            {/* Navigation */}
            <nav className="flex-1 p-2 space-y-1 overflow-y-auto overflow-x-hidden">
                {navItems.map((item) => {
                    const isActive =
                        pathname === item.href ||
                        (item.href !== "/dashboard" && pathname.startsWith(item.href));

                    return (
                        <Link
                            key={item.href}
                            href={item.href}
                            onClick={onClose}
                            title={collapsed ? item.label : undefined}
                            className={cn(
                                "flex items-center gap-3 px-3 py-2 rounded-md text-sm font-medium transition-all group",
                                "hover:bg-accent hover:text-accent-foreground",
                                isActive
                                    ? "bg-primary text-primary-foreground shadow-sm"
                                    : "text-muted-foreground",
                                collapsed ? "justify-center" : ""
                            )}
                        >
                            <item.icon className="h-4 w-4 shrink-0" />
                            {!collapsed && <span>{item.label}</span>}
                        </Link>
                    );
                })}
            </nav>

            {/* Footer */}
            <div className="p-2 border-t">
                <Link
                    href="/dashboard/settings"
                    title={collapsed ? "Settings" : undefined}
                    className={cn(
                        "flex items-center gap-3 px-3 py-2 rounded-md hover:bg-accent hover:text-accent-foreground transition-colors text-muted-foreground",
                        collapsed ? "justify-center" : ""
                    )}
                >
                    <Settings className="w-4 h-4 shrink-0" />
                    {!collapsed && <span className="font-medium text-sm">Settings</span>}
                </Link>
            </div>
        </div>
    );
}
