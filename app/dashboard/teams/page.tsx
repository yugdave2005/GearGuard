"use client";

import { useQuery } from "@tanstack/react-query";
import { createClient } from "@/lib/supabase/client";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Users, Wrench, AlertCircle, Plus } from "lucide-react";
import Link from "next/link";
import { CreateTeamDialog } from "@/components/teams/create-team-dialog";

export default function TeamsPage() {
    const supabase = createClient();

    const { data: teams, isLoading } = useQuery({
        queryKey: ["teams"],
        queryFn: async () => {
            const { data, error } = await supabase
                .from("teams")
                .select(`
          *,
          members:team_members(count),
          active_requests:maintenance_requests(count)
        `);
            if (error) throw error;
            return data as any[];
        },
    });

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <div>
                    <h2 className="text-3xl font-bold tracking-tight">Teams</h2>
                    <p className="text-muted-foreground">
                        Manage maintenance teams and their members
                    </p>
                </div>
                <CreateTeamDialog />
            </div>

            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {teams?.map((team) => (
                    <Card key={team.id} className="hover:shadow-lg transition-shadow">
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-xl font-bold">{team.name}</CardTitle>
                            <Users className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                            <CardDescription className="min-h-[40px] mb-4">
                                {team.description || "No description provided"}
                            </CardDescription>

                            <div className="flex gap-2">
                                <Badge variant="secondary" className="flex items-center gap-1">
                                    <Users className="w-3 h-3" />
                                    {team.members?.[0]?.count || 0} Members
                                </Badge>
                                <Badge variant="outline" className="flex items-center gap-1">
                                    <AlertCircle className="w-3 h-3" />
                                    {team.active_requests?.[0]?.count || 0} Active Jobs
                                </Badge>
                            </div>

                            <div className="mt-4 pt-4 border-t flex justify-end">
                                <Link href={`/dashboard/teams/${team.id}`}>
                                    <Button variant="ghost" size="sm">View Details</Button>
                                </Link>
                            </div>
                        </CardContent>
                    </Card>
                ))}
                {!isLoading && teams?.length === 0 && (
                    <div className="col-span-full text-center p-12 text-muted-foreground">
                        No teams found. Run the seed script to verify.
                    </div>
                )}
            </div>
        </div>
    );
}
