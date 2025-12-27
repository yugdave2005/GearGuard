"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { useCreateRequest } from "@/hooks/use-maintenance-requests";
import { useEquipment } from "@/hooks/use-equipment";
import { Plus, Loader2 } from "lucide-react";
import { useState } from "react";

const formSchema = z.object({
    subject: z.string().min(4, "Subject must be at least 4 characters"),
    description: z.string().optional(),
    equipment_id: z.string().min(1, "Equipment selection is required"),
    request_type: z.enum(["corrective", "preventive"]),
    scheduled_date: z.string().min(1, "Date is required"),
});

export function AddMaintenanceDialog() {
    const [open, setOpen] = useState(false);
    const createRequest = useCreateRequest();

    // Fetch equipment list for the dropdown
    const { data: equipmentList } = useEquipment();

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            subject: "",
            description: "",
            request_type: "preventive",
            // default to today's date in YYYY-MM-DD
            scheduled_date: new Date().toISOString().split('T')[0],
        },
    });

    async function onSubmit(values: z.infer<typeof formSchema>) {
        try {
            await createRequest.mutateAsync({
                subject: values.subject,
                description: values.description || null,
                equipment_id: values.equipment_id,
                request_type: values.request_type,
                scheduled_date: new Date(values.scheduled_date).toISOString(),
                status: "new",
            });
            setOpen(false);
            form.reset();
        } catch (error) {
            console.error("Failed to create request", error);
        }
    }

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button>
                    <Plus className="w-4 h-4 mr-2" />
                    Schedule Maintenance
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[550px]">
                <DialogHeader>
                    <DialogTitle>Schedule Maintenance</DialogTitle>
                    <DialogDescription>
                        Create a new maintenance request for an equipment item.
                    </DialogDescription>
                </DialogHeader>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                        <FormField
                            control={form.control}
                            name="subject"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Subject</FormLabel>
                                    <FormControl>
                                        <Input placeholder="Routine Safety Inspection" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <div className="grid grid-cols-2 gap-4">
                            <FormField
                                control={form.control}
                                name="equipment_id"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Equipment</FormLabel>
                                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                                            <FormControl>
                                                <SelectTrigger>
                                                    <SelectValue placeholder="Select equipment" />
                                                </SelectTrigger>
                                            </FormControl>
                                            <SelectContent>
                                                {equipmentList?.map((eq) => (
                                                    <SelectItem key={eq.id} value={eq.id}>
                                                        {eq.name} ({eq.serial_number})
                                                    </SelectItem>
                                                ))}
                                            </SelectContent>
                                        </Select>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="request_type"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Type</FormLabel>
                                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                                            <FormControl>
                                                <SelectTrigger>
                                                    <SelectValue placeholder="Select type" />
                                                </SelectTrigger>
                                            </FormControl>
                                            <SelectContent>
                                                <SelectItem value="preventive">Preventive</SelectItem>
                                                <SelectItem value="corrective">Corrective</SelectItem>
                                            </SelectContent>
                                        </Select>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>

                        <FormField
                            control={form.control}
                            name="scheduled_date"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Scheduled Date</FormLabel>
                                    <FormControl>
                                        <Input type="date" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="description"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Description (Optional)</FormLabel>
                                    <FormControl>
                                        <Textarea placeholder="Details about the required maintenance..." {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <DialogFooter>
                            <Button type="submit" disabled={createRequest.isPending}>
                                {createRequest.isPending && (
                                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                                )}
                                Create Request
                            </Button>
                        </DialogFooter>
                    </form>
                </Form>
            </DialogContent>
        </Dialog>
    );
}
