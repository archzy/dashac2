
import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
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
import { Checkbox } from "@/components/ui/checkbox";
import { DialogFooter } from "@/components/ui/dialog";
import { toast } from "sonner";

const formSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email address"),
  password: z
    .string()
    .min(6, "Password must be at least 6 characters")
    .optional()
    .or(z.literal("")),
  role: z.enum(["Admin", "Operator", "Guest"]),
  sectors: z.array(z.string()).min(1, "Please select at least one sector"),
  status: z.enum(["Active", "Inactive"]),
});

type FormValues = z.infer<typeof formSchema>;

interface UserFormProps {
  initialData: {
    id: string;
    name: string;
    email: string;
    role: string;
    sectors: string[];
    status: string;
  } | null;
  onSubmit: () => void;
}

const sectors = [
  { id: "finance", label: "Finance" },
  { id: "tax", label: "Tax" },
  { id: "hr", label: "HR" },
  { id: "accounting", label: "Accounting" },
  { id: "digital_certificate", label: "Digital Certificate" },
];

export const UserForm = ({ initialData, onSubmit }: UserFormProps) => {
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: initialData
      ? {
          name: initialData.name,
          email: initialData.email,
          password: "",
          role: initialData.role as "Admin" | "Operator" | "Guest",
          sectors: initialData.sectors,
          status: initialData.status as "Active" | "Inactive",
        }
      : {
          name: "",
          email: "",
          password: "",
          role: "Guest",
          sectors: [],
          status: "Active",
        },
  });

  const handleSubmit = async (values: FormValues) => {
    try {
      // In a real app, this would submit to an API
      console.log("Form values:", values);
      toast.success(
        initialData ? "User updated successfully" : "User created successfully"
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
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input placeholder="John Smith" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input placeholder="john@example.com" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  {initialData ? "Password (leave empty to keep current)" : "Password"}
                </FormLabel>
                <FormControl>
                  <Input
                    placeholder="••••••••"
                    type="password"
                    {...field}
                  />
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
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select role" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="Admin">Admin</SelectItem>
                    <SelectItem value="Operator">Operator</SelectItem>
                    <SelectItem value="Guest">Guest</SelectItem>
                  </SelectContent>
                </Select>
                <FormDescription>
                  Determines user permissions in the system
                </FormDescription>
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
                    <SelectItem value="Active">Active</SelectItem>
                    <SelectItem value="Inactive">Inactive</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="sectors"
            render={() => (
              <FormItem className="col-span-2">
                <div className="mb-4">
                  <FormLabel>Sectors</FormLabel>
                  <FormDescription>
                    Select the sectors this user can access
                  </FormDescription>
                </div>
                <div className="grid grid-cols-2 gap-2">
                  {sectors.map((sector) => (
                    <FormField
                      key={sector.id}
                      control={form.control}
                      name="sectors"
                      render={({ field }) => {
                        return (
                          <FormItem
                            key={sector.id}
                            className="flex flex-row items-start space-x-3 space-y-0"
                          >
                            <FormControl>
                              <Checkbox
                                checked={field.value?.includes(sector.label)}
                                onCheckedChange={(checked) => {
                                  return checked
                                    ? field.onChange([...field.value, sector.label])
                                    : field.onChange(
                                        field.value?.filter(
                                          (value) => value !== sector.label
                                        )
                                      );
                                }}
                              />
                            </FormControl>
                            <FormLabel className="font-normal cursor-pointer">
                              {sector.label}
                            </FormLabel>
                          </FormItem>
                        );
                      }}
                    />
                  ))}
                </div>
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
            {initialData ? "Update User" : "Create User"}
          </Button>
        </DialogFooter>
      </form>
    </Form>
  );
};
