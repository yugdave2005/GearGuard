"use client";

import { useTheme } from "next-themes";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Moon, Sun, LogOut, User, Search, Slash, Bell, Command } from "lucide-react";
import { createClient } from "@/lib/supabase/client";
import { useRouter, usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import { CommandMenu } from "@/components/ui/command-menu";
import { cn } from "@/lib/utils";

export function Header() {
    const { theme, setTheme } = useTheme();
    const router = useRouter();
    const pathname = usePathname();
    const [user, setUser] = useState<any>(null);
    const [isCommandOpen, setIsCommandOpen] = useState(false);

    useEffect(() => {
        const supabase = createClient();
        supabase.auth.getUser().then(({ data }) => {
            setUser(data.user);
        });
    }, []);

    useEffect(() => {
        const down = (e: KeyboardEvent) => {
            if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
                e.preventDefault();
                // We rely on the CommandMenu's internal listener, but visual feedback here is good practice,
                // actually since CommandMenu handles the open state internally based on the event, 
                // we probably only need to render it. But to trigger it via button we need a trigger mechanism.
                // Let's assume CommandMenu listens to the prop or global event.
                // Actually, my CommandMenu simple implementation used local state. 
                // I should have exposed a trigger or made it global.
                // For this iteration, let's keep it simple: The CommandMenu component attaches the listener.
                // The button here will simulate 'Ctrl+K' or we should refactor CommandMenu to accept 'open' prop.
                // For now, let's just dispatch the event to trigger the menu if the user clicks the button.
                const event = new KeyboardEvent('keydown', { key: 'k', metaKey: true, ctrlKey: true });
                document.dispatchEvent(event);
            }
        };
        // No listener needed here if we dispatch, but actually button click is easier if we just dispatch.
    }, []);

    const handleLogout = async () => {
        const supabase = createClient();
        await supabase.auth.signOut();
        router.push("/login");
    };

    const handleCommandClick = () => {
        const event = new KeyboardEvent('keydown', { key: 'k', metaKey: true, bubbles: true });
        document.dispatchEvent(event);
    }

    // Breadcrumbs logic
    const pathSegments = pathname.split('/').filter(Boolean);

    return (
        <header className="sticky top-0 z-10 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
            <div className="flex h-16 items-center justify-between px-4 sm:px-6">

                {/* Breadcrumbs & Title */}
                <div className="flex flex-col gap-1">
                    <nav className="flex items-center text-sm text-muted-foreground">
                        <span className="font-medium text-foreground">GearGuard</span>
                        {pathSegments.slice(1).map((segment, index) => (
                            <div key={segment} className="flex items-center">
                                <Slash className="mx-2 h-3.5 w-3.5" />
                                <span className="capitalize font-medium text-foreground">{segment}</span>
                            </div>
                        ))}
                    </nav>
                </div>

                <div className="flex items-center gap-4">
                    {/* Command Palette Trigger */}
                    <Button
                        variant="outline"
                        size="sm"
                        className="w-full justify-start text-sm text-muted-foreground sm:w-64 bg-muted/50 hidden md:flex"
                        onClick={handleCommandClick}
                    >
                        <Search className="mr-2 h-4 w-4" />
                        Search...
                        <kbd className="pointer-events-none ml-auto inline-flex h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium text-muted-foreground opacity-100">
                            <span className="text-xs">⌘</span>K
                        </kbd>
                    </Button>
                    <Button
                        variant="ghost"
                        size="icon"
                        className="md:hidden"
                        onClick={handleCommandClick}
                    >
                        <Search className="h-5 w-5" />
                    </Button>

                    {/* Notification */}
                    <Button variant="ghost" size="icon" className="relative">
                        <Bell className="h-5 w-5 text-muted-foreground" />
                        <span className="absolute top-2.5 right-2.5 h-2 w-2 rounded-full bg-red-600 border-2 border-background" />
                    </Button>

                    {/* Theme toggle */}
                    <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                    >
                        <Sun className="h-5 w-5 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
                        <Moon className="absolute h-5 w-5 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
                        <span className="sr-only">Toggle theme</span>
                    </Button>

                    <div className="h-6 w-px bg-border mx-1" />

                    {/* User Profile */}
                    <div className="flex items-center gap-2">
                        <div className="flex-col items-end hidden md:flex">
                            <span className="text-sm font-semibold leading-none">{user?.email?.split('@')[0] || 'Technician'}</span>
                            <span className="text-xs text-muted-foreground">Admin</span>
                        </div>
                        <Avatar className="h-8 w-8 border">
                            <AvatarFallback>
                                <User className="w-4 h-4" />
                            </AvatarFallback>
                        </Avatar>

                        <Button variant="ghost" size="icon" onClick={handleLogout} className="text-muted-foreground hover:text-destructive">
                            <LogOut className="w-5 h-5" />
                        </Button>
                    </div>
                </div>
            </div>

            <CommandMenu />
        </header>
    );
}
