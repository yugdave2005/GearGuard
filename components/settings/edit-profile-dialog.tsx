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
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { useProfile, useUpdateProfile } from "@/hooks/use-profile";
import { Loader2, User } from "lucide-react";
import { useState, useEffect } from "react";

const formSchema = z.object({
    full_name: z.string().min(2, "Name must be at least 2 characters"),
    role: z.enum(["admin", "technician", "manager", "viewer"]),
});

export function EditProfileDialog() {
    const [open, setOpen] = useState(false);
    const { data: profile, isLoading } = useProfile();
    const updateProfile = useUpdateProfile();

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            full_name: "",
            role: "technician",
        },
    });

    useEffect(() => {
        if (profile) {
            form.reset({
                full_name: profile.full_name,
                role: profile.role,
            });
        }
    }, [profile, form]);

    async function onSubmit(values: z.infer<typeof formSchema>) {
        try {
            await updateProfile.mutateAsync({
                full_name: values.full_name,
                role: values.role,
            });
            setOpen(false);
        } catch (error) {
            console.error("Failed to update profile", error);
        }
    }

    if (isLoading) return null;

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button>Edit Profile</Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Edit Profile</DialogTitle>
                    <DialogDescription>
                        Update your account information.
                    </DialogDescription>
                </DialogHeader>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                        <FormField
                            control={form.control}
                            name="full_name"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Full Name</FormLabel>
                                    <FormControl>
                                        <Input placeholder="John Doe" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="role"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Role</FormLabel>
                                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                                        <FormControl>
                                            <SelectTrigger>
                                                <SelectValue placeholder="Select a role" />
                                            </SelectTrigger>
                                        </FormControl>
                                        <SelectContent>
                                            <SelectItem value="admin">Admin</SelectItem>
                                            <SelectItem value="manager">Manager</SelectItem>
                                            <SelectItem value="technician">Technician</SelectItem>
                                            <SelectItem value="viewer">Viewer</SelectItem>
                                        </SelectContent>
                                    </Select>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <DialogFooter>
                            <Button type="submit" disabled={updateProfile.isPending}>
                                {updateProfile.isPending && (
                                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                                )}
                                Save Changes
                            </Button>
                        </DialogFooter>
                    </form>
                </Form>
            </DialogContent>
        </Dialog>
    );
}
