"use client";

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { createClient } from "@/lib/supabase/client";
import { Database } from "@/types/database.types";

type Profile = Database["public"]["Tables"]["profiles"]["Row"];

export function useProfile() {
    const supabase = createClient();

    return useQuery({
        queryKey: ["profile"],
        queryFn: async () => {
            const { data: { user } } = await supabase.auth.getUser();
            if (!user) throw new Error("Not authenticated");

            const { data, error } = await supabase
                .from("profiles")
                .select("*")
                .eq("id", user.id)
                .single();

            if (error) throw error;
            return data as Profile;
        },
    });
}

export function useUpdateProfile() {
    const supabase = createClient();
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async (updates: Database["public"]["Tables"]["profiles"]["Update"]) => {
            const { data: { user } } = await supabase.auth.getUser();
            if (!user) throw new Error("Not authenticated");

            const { data, error } = await supabase
                .from("profiles")
                // @ts-ignore
                .update(updates as any)
                .eq("id", user.id)
                .select()
                .single();

            if (error) throw error;
            return data;
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["profile"] });
            // Also invalidate user caching if necessary
        },
    });
}
