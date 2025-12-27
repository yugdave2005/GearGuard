export type Json =
    | string
    | number
    | boolean
    | null
    | { [key: string]: Json | undefined }
    | Json[]

export type Database = {
    public: {
        Tables: {
            equipment: {
                Row: {
                    id: string
                    name: string
                    serial_number: string
                    purchase_date: string | null
                    warranty_expiry: string | null
                    warranty_info: string | null
                    location: string | null
                    department: string | null
                    status: "active" | "scrap"
                    assigned_to: string | null
                    maintenance_team_id: string | null
                    created_at: string
                    updated_at: string
                }
                Insert: {
                    id?: string
                    name: string
                    serial_number: string
                    purchase_date?: string | null
                    warranty_expiry?: string | null
                    warranty_info?: string | null
                    location?: string | null
                    department?: string | null
                    status?: "active" | "scrap"
                    assigned_to?: string | null
                    maintenance_team_id?: string | null
                    created_at?: string
                    updated_at?: string
                }
                Update: {
                    id?: string
                    name?: string
                    serial_number?: string
                    purchase_date?: string | null
                    warranty_expiry?: string | null
                    warranty_info?: string | null
                    location?: string | null
                    department?: string | null
                    status?: "active" | "scrap"
                    assigned_to?: string | null
                    maintenance_team_id?: string | null
                    created_at?: string
                    updated_at?: string
                }
            }
            maintenance_requests: {
                Row: {
                    id: string
                    equipment_id: string
                    subject: string
                    description: string | null
                    request_type: "corrective" | "preventive"
                    status: "new" | "in_progress" | "repaired" | "scrap"
                    scheduled_date: string | null
                    duration: number | null
                    assigned_technician_id: string | null
                    team_id: string | null
                    created_at: string
                    updated_at: string
                    completed_at: string | null
                }
                Insert: {
                    id?: string
                    equipment_id: string
                    subject: string
                    description?: string | null
                    request_type?: "corrective" | "preventive"
                    status?: "new" | "in_progress" | "repaired" | "scrap"
                    scheduled_date?: string | null
                    duration?: number | null
                    assigned_technician_id?: string | null
                    team_id?: string | null
                    created_at?: string
                    updated_at?: string
                    completed_at?: string | null
                }
                Update: {
                    id?: string
                    equipment_id?: string
                    subject?: string
                    description?: string | null
                    request_type?: "corrective" | "preventive"
                    status?: "new" | "in_progress" | "repaired" | "scrap"
                    scheduled_date?: string | null
                    duration?: number | null
                    assigned_technician_id?: string | null
                    team_id?: string | null
                    created_at?: string
                    updated_at?: string
                    completed_at?: string | null
                }
            }
            profiles: {
                Row: {
                    id: string
                    full_name: string
                    role: "admin" | "technician" | "manager" | "viewer"
                    avatar_url: string | null
                    created_at: string
                    updated_at: string
                }
                Insert: {
                    id: string
                    full_name: string
                    role: "admin" | "technician" | "manager" | "viewer"
                    avatar_url?: string | null
                    created_at?: string
                    updated_at?: string
                }
                Update: {
                    id?: string
                    full_name?: string
                    role?: "admin" | "technician" | "manager" | "viewer"
                    avatar_url?: string | null
                    created_at?: string
                    updated_at?: string
                }
            }
            team_members: {
                Row: {
                    id: string
                    team_id: string
                    profile_id: string
                    joined_at: string
                }
                Insert: {
                    id?: string
                    team_id: string
                    profile_id: string
                    joined_at?: string
                }
                Update: {
                    id?: string
                    team_id?: string
                    profile_id?: string
                    joined_at?: string
                }
            }
            teams: {
                Row: {
                    id: string
                    name: string
                    description: string | null
                    created_at: string
                    updated_at: string
                }
                Insert: {
                    id?: string
                    name: string
                    description?: string | null
                    created_at?: string
                    updated_at?: string
                }
                Update: {
                    id?: string
                    name?: string
                    description?: string | null
                    created_at?: string
                    updated_at?: string
                }
            }
        }
    }
}
