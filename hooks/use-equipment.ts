"use client";

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { createClient } from "@/lib/supabase/client";
import { Database } from "@/types/database.types";

type Equipment = Database["public"]["Tables"]["equipment"]["Row"] & {
    assigned_to_profile?: Database["public"]["Tables"]["profiles"]["Row"];
    maintenance_team?: Database["public"]["Tables"]["teams"]["Row"];
};

export function useEquipment() {
    const supabase = createClient();

    return useQuery({
        queryKey: ["equipment"],
        queryFn: async () => {
            const { data, error } = await supabase
                .from("equipment")
                .select(`
          *,
          assigned_to_profile:profiles!assigned_to(*),
          maintenance_team:teams!maintenance_team_id(*)
        `)
                .order("created_at", { ascending: false });

            if (error) throw error;
            return data as Equipment[];
        },
    });
}

export function useEquipmentById(id: string | null) {
    const supabase = createClient();

    return useQuery({
        queryKey: ["equipment", id],
        queryFn: async () => {
            if (!id) return null;

            const { data, error } = await supabase
                .from("equipment")
                .select(`
          *,
          assigned_to_profile:profiles!assigned_to(*),
          maintenance_team:teams!maintenance_team_id(*)
        `)
                .eq("id", id)
                .single();

            if (error) throw error;
            return data as Equipment;
        },
        enabled: !!id,
    });
}

export function useEquipmentMaintenanceHistory(equipmentId: string | null) {
    const supabase = createClient();

    return useQuery({
        queryKey: ["maintenance-history", equipmentId],
        queryFn: async () => {
            if (!equipmentId) return [];

            const { data, error } = await supabase
                .from("maintenance_requests")
                .select(`
          *,
          assigned_technician:profiles!assigned_technician_id(*)
        `)
                .eq("equipment_id", equipmentId)
                .order("created_at", { ascending: false });

            if (error) throw error;
            return data as (Database["public"]["Tables"]["maintenance_requests"]["Row"] & {
                assigned_technician: Database["public"]["Tables"]["profiles"]["Row"] | null
            })[];
        },
        enabled: !!equipmentId,
    });
}

export function useCreateEquipment() {
    const supabase = createClient();
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async (
            equipment: Database["public"]["Tables"]["equipment"]["Insert"]
        ) => {
            const { data, error } = await supabase
                .from("equipment")
                .insert(equipment as any)
                .select()
                .single();

            if (error) throw error;
            return data;
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["equipment"] });
        },
    });
}

export function useUpdateEquipment() {
    const supabase = createClient();
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async ({
            id,
            updates,
        }: {
            id: string;
            updates: Database["public"]["Tables"]["equipment"]["Update"];
        }) => {
            // Bypass strict type checking for this update operation
            const { data, error } = await (supabase
                .from("equipment") as any)
                .update(updates)
                .eq("id", id)
                .select()
                .single();

            if (error) throw error;
            return data;
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["equipment"] });
        },
    });
}
