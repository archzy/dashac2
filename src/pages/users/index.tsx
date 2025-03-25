import React, { useState } from "react";
import { DashboardLayout } from "@/components/layout/dashboard-layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Plus, MoreHorizontal, PencilIcon, Trash2Icon, SearchIcon } from "lucide-react";
import { UserForm } from "./user-form";

// Sample user data
const users = [
  { 
    id: "1", 
    name: "John Smith", 
    email: "john@example.com", 
    role: "Admin", 
    sectors: ["Finance", "Tax"], 
    status: "Active" 
  },
  { 
    id: "2", 
    name: "Sarah Johnson", 
    email: "sarah@example.com", 
    role: "Operator", 
    sectors: ["HR", "Accounting"], 
    status: "Active" 
  },
  { 
    id: "3", 
    name: "Michael Brown", 
    email: "michael@example.com", 
    role: "Guest", 
    sectors: ["Digital Certificate"], 
    status: "Inactive" 
  },
  { 
    id: "4", 
    name: "Emily Davis", 
    email: "emily@example.com", 
    role: "Operator", 
    sectors: ["Finance", "Accounting"], 
    status: "Active" 
  },
  { 
    id: "5", 
    name: "David Wilson", 
    email: "david@example.com", 
    role: "Admin", 
    sectors: ["HR", "Digital Certificate"], 
    status: "Active" 
  },
];

const UsersPage = () => {
  const [showAddUserDialog, setShowAddUserDialog] = useState(false);
  const [editingUser, setEditingUser] = useState<typeof users[0] | null>(null);
  const [searchQuery, setSearchQuery] = useState("");

  const handleEdit = (user: typeof users[0]) => {
    setEditingUser(user);
    setShowAddUserDialog(true);
  };

  const handleDelete = (userId: string) => {
    // In a real application, this would call an API
    console.log(`Delete user with ID: ${userId}`);
  };

  // Filter users based on search query
  const filteredUsers = users.filter(user => 
    user.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
    user.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-semibold mb-2">Users</h1>
            <p className="text-muted-foreground">View and manage user accounts</p>
          </div>
          <Dialog open={showAddUserDialog} onOpenChange={setShowAddUserDialog}>
            <DialogTrigger asChild>
              <Button className="flex items-center gap-1">
                <Plus size={16} />
                <span>Add User</span>
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[600px]">
              <DialogHeader>
                <DialogTitle>{editingUser ? "Edit User" : "Add New User"}</DialogTitle>
                <DialogDescription>
                  {editingUser 
                    ? "Update user details and permissions" 
                    : "Fill in the information to create a new user"}
                </DialogDescription>
              </DialogHeader>
              <UserForm 
                initialData={editingUser} 
                onSubmit={() => {
                  setShowAddUserDialog(false);
                  setEditingUser(null);
                }} 
              />
            </DialogContent>
          </Dialog>
        </div>

        <div className="bg-card rounded-lg border overflow-hidden">
          <div className="p-4 flex justify-between items-center border-b">
            <div className="relative w-full max-w-sm">
              <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground h-4 w-4" />
              <Input 
                placeholder="Search users..." 
                className="pl-9"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>

          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Role</TableHead>
                  <TableHead>Sectors</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="w-[60px]"></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredUsers.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={6} className="text-center py-6 text-muted-foreground">
                      No users found
                    </TableCell>
                  </TableRow>
                ) : (
                  filteredUsers.map((user) => (
                    <TableRow key={user.id}>
                      <TableCell className="font-medium">{user.name}</TableCell>
                      <TableCell>{user.email}</TableCell>
                      <TableCell>
                        <Badge variant={user.role === "Admin" ? "default" : user.role === "Operator" ? "secondary" : "outline"}>
                          {user.role}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <div className="flex flex-wrap gap-1">
                          {user.sectors.map((sector) => (
                            <Badge key={sector} variant="outline" className="text-xs py-0">
                              {sector}
                            </Badge>
                          ))}
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge variant={user.status === "Active" ? "secondary" : "outline"} className={user.status === "Active" ? "bg-green-100 text-green-800 hover:bg-green-100 hover:text-green-800" : ""}>
                          {user.status}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon" className="h-8 w-8">
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem onClick={() => handleEdit(user)} className="flex items-center gap-2">
                              <PencilIcon className="h-4 w-4" />
                              <span>Edit</span>
                            </DropdownMenuItem>
                            <DropdownMenuItem 
                              onClick={() => handleDelete(user.id)}
                              className="flex items-center gap-2 text-red-600 focus:text-red-600"
                            >
                              <Trash2Icon className="h-4 w-4" />
                              <span>Delete</span>
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default UsersPage;
