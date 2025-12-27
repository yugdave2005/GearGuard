import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

export function formatDate(date: Date | string | null): string {
    if (!date) return "N/A";
    return new Date(date).toLocaleDateString("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric",
    });
}

export function formatDateTime(date: Date | string | null): string {
    if (!date) return "N/A";
    return new Date(date).toLocaleString("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit",
    });
}

export function isOverdue(scheduledDate: Date | string | null, status: string): boolean {
    if (!scheduledDate || status === "repaired" || status === "scrap") return false;
    return new Date(scheduledDate) < new Date();
}

export function getStatusColor(status: string): string {
    const colors: Record<string, string> = {
        new: "bg-blue-500",
        in_progress: "bg-yellow-500",
        repaired: "bg-green-500",
        scrap: "bg-red-500",
        active: "bg-green-500",
    };
    return colors[status] || "bg-gray-500";
}

export function getStatusLabel(status: string): string {
    const labels: Record<string, string> = {
        new: "New",
        in_progress: "In Progress",
        repaired: "Repaired",
        scrap: "Scrap",
        active: "Active",
        corrective: "Corrective",
        preventive: "Preventive",
    };
    return labels[status] || status;
}
