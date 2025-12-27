"use client";

import { useQuery } from "@tanstack/react-query";
import { createClient } from "@/lib/supabase/client";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Loader2, ArrowLeft, Mail, Shield } from "lucide-react";
import Link from "next/link";
import { useParams } from "next/navigation";

export default function TeamDetailsPage() {
    const params = useParams();
    const id = params.id as string;
    const supabase = createClient();

    const { data: team, isLoading: isTeamLoading } = useQuery({
        queryKey: ["team", id],
        queryFn: async () => {
            const { data, error } = await supabase
                .from("teams")
                .select("*")
                .eq("id", id)
                .single();
            if (error) throw error;
            return data as any;
        },
    });

    const { data: members, isLoading: isMembersLoading } = useQuery({
        queryKey: ["team-members", id],
        queryFn: async () => {
            const { data, error } = await supabase
                .from("team_members")
                .select(`
                    id,
                    joined_at,
                    profile:profiles (
                        id,
                        full_name,
                        role,
                        avatar_url
                    )
                `)
                .eq("team_id", id);

            if (error) throw error;
            return data;
        },
    });

    if (isTeamLoading || isMembersLoading) {
        return (
            <div className="flex items-center justify-center h-full">
                <Loader2 className="w-8 h-8 animate-spin text-primary" />
            </div>
        );
    }

    if (!team) {
        return (
            <div className="flex flex-col items-center justify-center h-full gap-4">
                <p className="text-muted-foreground">Team not found</p>
                <Link href="/dashboard/teams">
                    <Button variant="outline">
                        <ArrowLeft className="w-4 h-4 mr-2" />
                        Back to Teams
                    </Button>
                </Link>
            </div>
        );
    }

    return (
        <div className="space-y-6">
            {/* Header */}
            <div>
                <Link href="/dashboard/teams" className="inline-flex items-center text-sm text-muted-foreground hover:text-foreground mb-4 transition-colors">
                    <ArrowLeft className="w-4 h-4 mr-2" />
                    Back to Teams
                </Link>
                <div className="flex justify-between items-start">
                    <div>
                        <h1 className="text-3xl font-bold tracking-tight">{team.name}</h1>
                        <p className="text-muted-foreground mt-1">
                            {team.description}
                        </p>
                    </div>
                    {/* Placeholder for Edit Team button */}
                </div>
            </div>

            {/* Members Section */}
            <div>
                <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
                    Team Members
                    <Badge variant="secondary">{members?.length || 0}</Badge>
                </h2>

                {members && members.length > 0 ? (
                    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                        {members.map((member: any) => (
                            <Card key={member.id} className="hover:shadow-md transition-shadow">
                                <CardHeader className="flex flex-row items-center gap-4 pb-2">
                                    <Avatar className="w-12 h-12">
                                        <AvatarImage src={member.profile?.avatar_url} />
                                        <AvatarFallback>{member.profile?.full_name?.charAt(0) || "U"}</AvatarFallback>
                                    </Avatar>
                                    <div className="space-y-1">
                                        <CardTitle className="text-base">{member.profile?.full_name || "Unknown User"}</CardTitle>
                                        <Badge variant="outline" className="text-xs capitalize">
                                            {member.profile?.role || "Member"}
                                        </Badge>
                                    </div>
                                </CardHeader>
                                <CardContent>
                                    <div className="grid gap-2 text-sm text-muted-foreground mt-2">
                                        <div className="flex items-center gap-2">
                                            <Shield className="w-4 h-4" />
                                            <span>ID: ...{member.profile?.id?.slice(-4)}</span>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <Mail className="w-4 h-4" />
                                            <span>Joined: {new Date(member.joined_at).toLocaleDateString()}</span>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                ) : (
                    <div className="text-center py-12 border rounded-lg bg-muted/10">
                        <p className="text-muted-foreground">No members assigned to this team.</p>
                        <Button variant="link" className="mt-2">Add Member</Button>
                    </div>
                )}
            </div>
        </div>
    );
}
