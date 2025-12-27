"use client";

import { useMutation, useQueryClient, useQuery } from "@tanstack/react-query";
import { createClient } from "@/lib/supabase/client";
import { Database } from "@/types/database.types";

export function useTeams() {
    const supabase = createClient();

    return useQuery({
        queryKey: ["teams"],
        queryFn: async () => {
            const { data, error } = await supabase
                .from("teams")
                .select(`
          *,
          members:team_members(count),
          active_requests:maintenance_requests(count)
        `);
            // Note: This matches the query in TeamsPage, but we might want to centralize it. 
            // Ideally we replace the page's inline query with this hook.
            if (error) throw error;
            return data as any[];
        },
    });
}

export function useCreateTeam() {
    const supabase = createClient();
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async (
            team: Database["public"]["Tables"]["teams"]["Insert"]
        ) => {
            const { data, error } = await supabase
                .from("teams")
                // @ts-ignore
                .insert(team as any)
                .select()
                .single();

            if (error) throw error;
            return data;
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["teams"] });
        },
    });
}
