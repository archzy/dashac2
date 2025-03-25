
import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
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
import { DialogFooter } from "@/components/ui/dialog";
import { toast } from "sonner";

const formSchema = z.object({
  title: z.string().min(5, "Title must be at least 5 characters"),
  description: z.string().min(10, "Description must be at least 10 characters"),
  assigneeId: z.string().min(1, "Please select an assignee"),
  sector: z.string().min(1, "Please select a sector"),
  priority: z.enum(["Low", "Medium", "High"]),
  status: z.enum(["Open", "In Progress", "Closed"]),
});

type FormValues = z.infer<typeof formSchema>;

interface RequestFormProps {
  initialData: {
    id: string;
    title: string;
    description: string;
    requester: { id: string; name: string };
    assignee: { id: string; name: string };
    sector: string;
    status: string;
    priority: string;
    createdAt: string;
    updatedAt: string;
  } | null;
  onSubmit: () => void;
}

// Sample user data for assignees
const users = [
  { id: "user_1", name: "John Smith" },
  { id: "user_2", name: "Sarah Johnson" },
  { id: "user_3", name: "Emily Davis" },
  { id: "user_4", name: "David Wilson" },
  { id: "user_5", name: "Michael Brown" },
];

// Sectors
const sectors = [
  "Finance",
  "Tax",
  "HR",
  "Accounting",
  "Digital Certificate",
  "IT",
];

export const RequestForm = ({ initialData, onSubmit }: RequestFormProps) => {
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: initialData
      ? {
          title: initialData.title,
          description: initialData.description,
          assigneeId: initialData.assignee.id,
          sector: initialData.sector,
          priority: initialData.priority as "Low" | "Medium" | "High",
          status: initialData.status as "Open" | "In Progress" | "Closed",
        }
      : {
          title: "",
          description: "",
          assigneeId: "",
          sector: "",
          priority: "Medium",
          status: "Open",
        },
  });

  const handleSubmit = async (values: FormValues) => {
    try {
      // In a real app, this would submit to an API
      console.log("Form values:", values);
      toast.success(
        initialData ? "Request updated successfully" : "Request created successfully"
      );
      onSubmit();
    } catch (error) {
      console.error("Error submitting form:", error);
      toast.error("An error occurred");
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Title</FormLabel>
              <FormControl>
                <Input placeholder="Enter request title" {...field} />
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
                <Textarea 
                  placeholder="Provide details about your request" 
                  className="min-h-[100px]" 
                  {...field} 
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <FormField
            control={form.control}
            name="assigneeId"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Assignee</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select assignee" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {users.map((user) => (
                      <SelectItem key={user.id} value={user.id}>
                        {user.name}
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
            name="sector"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Sector</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select sector" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {sectors.map((sector) => (
                      <SelectItem key={sector} value={sector}>
                        {sector}
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
            name="priority"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Priority</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select priority" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="Low">Low</SelectItem>
                    <SelectItem value="Medium">Medium</SelectItem>
                    <SelectItem value="High">High</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="status"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Status</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select status" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="Open">Open</SelectItem>
                    <SelectItem value="In Progress">In Progress</SelectItem>
                    <SelectItem value="Closed">Closed</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <DialogFooter>
          <Button
            type="button"
            variant="outline"
            onClick={onSubmit}
            className="mr-2"
          >
            Cancel
          </Button>
          <Button type="submit">
            {initialData ? "Update Request" : "Create Request"}
          </Button>
        </DialogFooter>
      </form>
    </Form>
  );
};
