"use client";

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
} from "lucide-react";

const navItems = [
    { href: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
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

    return (
        <div className={cn("w-64 border-r bg-card h-screen flex flex-col", className)}>
            {/* Logo */}
            <div className="p-6 border-b">
                <div className="flex items-center gap-2">
                    <Gauge className="w-8 h-8 text-primary" />
                    <div>
                        <h1 className="text-xl font-bold">GearGuard</h1>
                        <p className="text-xs text-muted-foreground">Maintenance Tracker</p>
                    </div>
                </div>
            </div>

            {/* Navigation */}
            <nav className="flex-1 p-4">
                <ul className="space-y-2">
                    {navItems.map((item) => {
                        const isActive =
                            pathname === item.href ||
                            (item.href !== "/dashboard" && pathname.startsWith(item.href));

                        return (
                            <li key={item.href}>
                                <Link
                                    href={item.href}
                                    onClick={onClose}
                                    className={cn(
                                        "flex items-center gap-3 px-4 py-3 rounded-lg transition-colors",
                                        isActive
                                            ? "bg-primary text-primary-foreground"
                                            : "hover:bg-accent hover:text-accent-foreground"
                                    )}
                                >
                                    <item.icon className="w-5 h-5" />
                                    <span className="font-medium">{item.label}</span>
                                </Link>
                            </li>
                        );
                    })}
                </ul>
            </nav>

            {/* Footer */}
            <div className="p-4 border-t">
                <Link
                    href="/dashboard/settings"
                    className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-accent hover:text-accent-foreground transition-colors"
                >
                    <Settings className="w-5 h-5" />
                    <span className="font-medium">Settings</span>
                </Link>
            </div>
        </div>
    );
}
