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
import { useCreateTeam } from "@/hooks/use-teams";
import { Plus, Loader2 } from "lucide-react";
import { useState } from "react";

const formSchema = z.object({
    name: z.string().min(3, "Name must be at least 3 characters"),
    description: z.string().optional(),
});

export function CreateTeamDialog() {
    const [open, setOpen] = useState(false);
    const createTeam = useCreateTeam();

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: "",
            description: "",
        },
    });

    async function onSubmit(values: z.infer<typeof formSchema>) {
        try {
            await createTeam.mutateAsync({
                name: values.name,
                description: values.description || null,
            });
            setOpen(false);
            form.reset();
        } catch (error) {
            console.error("Failed to create team", error);
        }
    }

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button>
                    <Plus className="w-4 h-4 mr-2" />
                    Create Team
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Create New Team</DialogTitle>
                    <DialogDescription>
                        Add a new maintenance team to the organization.
                    </DialogDescription>
                </DialogHeader>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                        <FormField
                            control={form.control}
                            name="name"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Team Name</FormLabel>
                                    <FormControl>
                                        <Input placeholder="Alpha Squad" {...field} />
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
                                    <FormLabel>Description</FormLabel>
                                    <FormControl>
                                        <Textarea placeholder="Responsible for heavy machinery..." {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <DialogFooter>
                            <Button type="submit" disabled={createTeam.isPending}>
                                {createTeam.isPending && (
                                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                                )}
                                Create Team
                            </Button>
                        </DialogFooter>
                    </form>
                </Form>
            </DialogContent>
        </Dialog>
    );
}
