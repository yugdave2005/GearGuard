"use client";

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { createClient } from "@/lib/supabase/client";
import { Database } from "@/types/database.types";
import { useEffect } from "react";

type MaintenanceRequest = Database["public"]["Tables"]["maintenance_requests"]["Row"] & {
    equipment?: Database["public"]["Tables"]["equipment"]["Row"];
    assigned_technician?: Database["public"]["Tables"]["profiles"]["Row"];
    team?: Database["public"]["Tables"]["teams"]["Row"];
};

export function useMaintenanceRequests() {
    const supabase = createClient();
    const queryClient = useQueryClient();

    const query = useQuery({
        queryKey: ["maintenance-requests"],
        queryFn: async () => {
            const { data, error } = await supabase
                .from("maintenance_requests")
                .select(`
          *,
          equipment(*),
          assigned_technician:profiles!assigned_technician_id(*),
          team:teams(*)
        `)
                .order("created_at", { ascending: false });

            if (error) throw error;
            return data as MaintenanceRequest[];
        },
    });

    // Subscribe to realtime changes
    useEffect(() => {
        const channel = supabase
            .channel("maintenance_requests_changes")
            .on(
                "postgres_changes",
                {
                    event: "*",
                    schema: "public",
                    table: "maintenance_requests",
                },
                () => {
                    queryClient.invalidateQueries({ queryKey: ["maintenance-requests"] });
                }
            )
            .subscribe();

        return () => {
            supabase.removeChannel(channel);
        };
    }, [supabase, queryClient]);

    return query;
}

export function useUpdateRequestStatus() {
    const supabase = createClient();
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async ({
            id,
            status,
        }: {
            id: string;
            status: "new" | "in_progress" | "repaired" | "scrap";
        }) => {
            const updateData: Database["public"]["Tables"]["maintenance_requests"]["Update"] = {
                status,
            };

            // If status is repaired or scrap, set completed_at
            if (status === "repaired" || status === "scrap") {
                updateData.completed_at = new Date().toISOString();
            }

            // @ts-ignore - Supabase type inference issue with update operations
            const { data, error } = await supabase
                .from("maintenance_requests")
                .update(updateData as any)
                .eq("id", id)
                .select()
                .single();

            if (error) throw error;
            return data;
        },
        onMutate: async ({ id, status }) => {
            // Cancel any outgoing refetches (so they don't overwrite our optimistic update)
            await queryClient.cancelQueries({ queryKey: ["maintenance-requests"] });

            // Snapshot the previous value
            const previousRequests = queryClient.getQueryData<MaintenanceRequest[]>(["maintenance-requests"]);

            // Optimistically update to the new value
            queryClient.setQueryData<MaintenanceRequest[]>(["maintenance-requests"], (old) => {
                if (!old) return [];
                return old.map((req) =>
                    req.id === id ? { ...req, status } : req
                );
            });

            // Return a context object with the snapshotted value
            return { previousRequests };
        },
        onError: (_err, _newRequest, context) => {
            // If the mutation fails, use the context returned from onMutate to roll back
            if (context?.previousRequests) {
                queryClient.setQueryData(["maintenance-requests"], context.previousRequests);
            }
        },
        onSettled: () => {
            // Always refetch after error or success:
            queryClient.invalidateQueries({ queryKey: ["maintenance-requests"] });
        },
    });
}

export function useCreateRequest() {
    const supabase = createClient();
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async (
            request: Database["public"]["Tables"]["maintenance_requests"]["Insert"]
        ) => {
            // Auto-assignment logic: fetch team_id from equipment if not provided
            let finalRequest = { ...request };

            if (request.equipment_id && !request.team_id) {
                // @ts-ignore - Supabase type inference issue with select operations
                const { data: equipment } = await supabase
                    .from("equipment")
                    .select("maintenance_team_id")
                    .eq("id", request.equipment_id)
                    .single();

                if (equipment?.maintenance_team_id) {
                    finalRequest.team_id = equipment.maintenance_team_id as string | null;
                }
            }

            // @ts-ignore - Supabase type inference issue with insert operations
            const { data, error } = await supabase
                .from("maintenance_requests")
                .insert(finalRequest as any)
                .select()
                .single();

            if (error) throw error;
            return data;
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["maintenance-requests"] });
        },
    });
}

export function useDeleteRequest() {
    const supabase = createClient();
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async (id: string) => {
            const { error } = await supabase
                .from("maintenance_requests")
                .delete()
                .eq("id", id);

            if (error) throw error;
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["maintenance-requests"] });
        },
    });
}
