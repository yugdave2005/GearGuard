"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Moon, Sun, Monitor, Bell, Shield, User } from "lucide-react";
import { useTheme } from "next-themes";
import { EditProfileDialog } from "@/components/settings/edit-profile-dialog";

export default function SettingsPage() {
    const { setTheme } = useTheme();

    return (
        <div className="space-y-6">
            <div>
                <h2 className="text-3xl font-bold tracking-tight">Settings</h2>
                <p className="text-muted-foreground">
                    Manage your account and application preferences
                </p>
            </div>

            <div className="grid gap-6">
                <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <Monitor className="w-5 h-5" />
                            Appearance
                        </CardTitle>
                        <CardDescription>
                            Customize how GearGuard looks on your device
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="flex items-center justify-between">
                            <div className="space-y-1">
                                <Label className="text-base">Theme Mode</Label>
                                <p className="text-sm text-muted-foreground">
                                    Select your preferred display theme
                                </p>
                            </div>
                            <div className="flex gap-2">
                                <Button variant="outline" size="icon" onClick={() => setTheme('light')}>
                                    <Sun className="h-4 w-4" />
                                </Button>
                                <Button variant="outline" size="icon" onClick={() => setTheme('dark')}>
                                    <Moon className="h-4 w-4" />
                                </Button>
                                <Button variant="outline" size="icon" onClick={() => setTheme('system')}>
                                    <Monitor className="h-4 w-4" />
                                </Button>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <Bell className="w-5 h-5" />
                            Notifications
                        </CardTitle>
                        <CardDescription>
                            Configure how you receive alerts
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="flex items-center justify-between">
                            <div className="space-y-1">
                                <Label className="text-base">Email Notifications</Label>
                                <p className="text-sm text-muted-foreground">
                                    Receive updates about your assigned tasks
                                </p>
                            </div>
                            <Switch defaultChecked />
                        </div>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <User className="w-5 h-5" />
                            Profile Settings
                        </CardTitle>
                        <CardDescription>
                            Update your personal information
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="flex justify-end">
                            <EditProfileDialog />
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
