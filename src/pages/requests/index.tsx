
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
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { 
  Plus, 
  MoreHorizontal, 
  PencilIcon, 
  EyeIcon, 
  SearchIcon,
  ListFilter 
} from "lucide-react";
import { RequestForm } from "./request-form";
import { RequestDetail } from "./request-detail";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

// Sample request data
const requests = [
  {
    id: "1",
    title: "Digital Certificate Renewal",
    description: "Need to renew the company's digital certificate that expires next month",
    requester: { id: "user_1", name: "John Smith" },
    assignee: { id: "user_2", name: "Sarah Johnson" },
    sector: "Digital Certificate",
    status: "Open",
    priority: "High",
    createdAt: "2023-05-15T10:30:00Z",
    updatedAt: "2023-05-15T14:45:00Z",
  },
  {
    id: "2",
    title: "System Access Request",
    description: "Request for access to the financial reporting system for the new hire",
    requester: { id: "user_3", name: "Emily Davis" },
    assignee: { id: "user_1", name: "John Smith" },
    sector: "IT",
    status: "In Progress",
    priority: "Medium",
    createdAt: "2023-05-14T09:15:00Z",
    updatedAt: "2023-05-16T11:20:00Z",
  },
  {
    id: "3",
    title: "Tax Document Approval",
    description: "Approval needed for the quarterly tax filing documents",
    requester: { id: "user_4", name: "David Wilson" },
    assignee: { id: "user_5", name: "Michael Brown" },
    sector: "Tax",
    status: "Open",
    priority: "High",
    createdAt: "2023-05-13T14:20:00Z",
    updatedAt: "2023-05-13T16:30:00Z",
  },
  {
    id: "4",
    title: "Budget Approval",
    description: "Approve the marketing department's Q3 budget proposal",
    requester: { id: "user_2", name: "Sarah Johnson" },
    assignee: { id: "user_4", name: "David Wilson" },
    sector: "Finance",
    status: "Closed",
    priority: "Medium",
    createdAt: "2023-05-10T11:45:00Z",
    updatedAt: "2023-05-12T15:30:00Z",
  },
  {
    id: "5",
    title: "New Hire Onboarding",
    description: "Prepare onboarding materials and access rights for new financial analyst",
    requester: { id: "user_5", name: "Michael Brown" },
    assignee: { id: "user_3", name: "Emily Davis" },
    sector: "HR",
    status: "In Progress",
    priority: "Low",
    createdAt: "2023-05-09T09:00:00Z",
    updatedAt: "2023-05-11T10:15:00Z",
  },
];

const RequestsPage = () => {
  const [showAddRequestDialog, setShowAddRequestDialog] = useState(false);
  const [showDetailDialog, setShowDetailDialog] = useState(false);
  const [editingRequest, setEditingRequest] = useState<typeof requests[0] | null>(null);
  const [selectedRequest, setSelectedRequest] = useState<typeof requests[0] | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [activeTab, setActiveTab] = useState("all");

  const handleCreate = () => {
    setEditingRequest(null);
    setShowAddRequestDialog(true);
  };

  const handleEdit = (request: typeof requests[0]) => {
    setEditingRequest(request);
    setShowAddRequestDialog(true);
  };

  const handleView = (request: typeof requests[0]) => {
    setSelectedRequest(request);
    setShowDetailDialog(true);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  // Filter and sort requests
  const filteredRequests = requests
    .filter(request => {
      const matchesSearch = request.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        request.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        request.requester.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        request.assignee.name.toLowerCase().includes(searchQuery.toLowerCase());
      
      const matchesStatus = statusFilter === "all" || request.status === statusFilter;
      
      const matchesTab = activeTab === "all" || 
        (activeTab === "incoming" && request.assignee.id === "user_1") ||
        (activeTab === "outgoing" && request.requester.id === "user_1");
      
      return matchesSearch && matchesStatus && matchesTab;
    })
    .sort((a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime());

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-semibold mb-2">Requests</h1>
            <p className="text-muted-foreground">View and manage user requests</p>
          </div>
          <Dialog open={showAddRequestDialog} onOpenChange={setShowAddRequestDialog}>
            <DialogTrigger asChild>
              <Button className="flex items-center gap-1" onClick={handleCreate}>
                <Plus size={16} />
                <span>New Request</span>
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[600px]">
              <DialogHeader>
                <DialogTitle>{editingRequest ? "Edit Request" : "Create New Request"}</DialogTitle>
              </DialogHeader>
              <RequestForm 
                initialData={editingRequest} 
                onSubmit={() => {
                  setShowAddRequestDialog(false);
                  setEditingRequest(null);
                }} 
              />
            </DialogContent>
          </Dialog>
        </div>

        <Tabs defaultValue="all" value={activeTab} onValueChange={setActiveTab}>
          <div className="flex justify-between items-center mb-4">
            <TabsList>
              <TabsTrigger value="all">All Requests</TabsTrigger>
              <TabsTrigger value="incoming">Assigned to Me</TabsTrigger>
              <TabsTrigger value="outgoing">Created by Me</TabsTrigger>
            </TabsList>
          </div>

          <TabsContent value={activeTab} className="space-y-4">
            <div className="bg-card rounded-lg border overflow-hidden">
              <div className="p-4 flex flex-col sm:flex-row justify-between gap-4 items-center border-b">
                <div className="relative w-full sm:max-w-xs">
                  <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground h-4 w-4" />
                  <Input 
                    placeholder="Search requests..." 
                    className="pl-9"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
                <div className="flex items-center gap-2 w-full sm:w-auto">
                  <ListFilter size={16} className="text-muted-foreground" />
                  <Select value={statusFilter} onValueChange={setStatusFilter}>
                    <SelectTrigger className="w-[140px]">
                      <SelectValue placeholder="Filter by status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Statuses</SelectItem>
                      <SelectItem value="Open">Open</SelectItem>
                      <SelectItem value="In Progress">In Progress</SelectItem>
                      <SelectItem value="Closed">Closed</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Title</TableHead>
                      <TableHead>Requester</TableHead>
                      <TableHead>Assignee</TableHead>
                      <TableHead>Sector</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Priority</TableHead>
                      <TableHead>Updated</TableHead>
                      <TableHead className="w-[60px]"></TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredRequests.length === 0 ? (
                      <TableRow>
                        <TableCell colSpan={8} className="text-center py-6 text-muted-foreground">
                          No requests found
                        </TableCell>
                      </TableRow>
                    ) : (
                      filteredRequests.map((request) => (
                        <TableRow key={request.id}>
                          <TableCell className="font-medium">{request.title}</TableCell>
                          <TableCell>{request.requester.name}</TableCell>
                          <TableCell>{request.assignee.name}</TableCell>
                          <TableCell>{request.sector}</TableCell>
                          <TableCell>
                            <Badge 
                              variant={
                                request.status === "Open" 
                                  ? "outline" 
                                  : request.status === "In Progress" 
                                    ? "secondary" 
                                    : "default"
                              }
                              className={
                                request.status === "Closed" 
                                  ? "bg-green-100 text-green-800 hover:bg-green-100 hover:text-green-800" 
                                  : ""
                              }
                            >
                              {request.status}
                            </Badge>
                          </TableCell>
                          <TableCell>
                            <Badge 
                              variant="outline" 
                              className={`
                                ${request.priority === "High" ? "text-red-600 bg-red-50" : ""} 
                                ${request.priority === "Medium" ? "text-amber-600 bg-amber-50" : ""}
                                ${request.priority === "Low" ? "text-blue-600 bg-blue-50" : ""}
                              `}
                            >
                              {request.priority}
                            </Badge>
                          </TableCell>
                          <TableCell className="text-muted-foreground">
                            {formatDate(request.updatedAt)}
                          </TableCell>
                          <TableCell>
                            <DropdownMenu>
                              <DropdownMenuTrigger asChild>
                                <Button variant="ghost" size="icon" className="h-8 w-8">
                                  <MoreHorizontal className="h-4 w-4" />
                                </Button>
                              </DropdownMenuTrigger>
                              <DropdownMenuContent align="end">
                                <DropdownMenuItem 
                                  onClick={() => handleView(request)} 
                                  className="flex items-center gap-2"
                                >
                                  <EyeIcon className="h-4 w-4" />
                                  <span>View</span>
                                </DropdownMenuItem>
                                <DropdownMenuItem 
                                  onClick={() => handleEdit(request)} 
                                  className="flex items-center gap-2"
                                >
                                  <PencilIcon className="h-4 w-4" />
                                  <span>Edit</span>
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
          </TabsContent>
        </Tabs>
      </div>

      <Dialog open={showDetailDialog} onOpenChange={setShowDetailDialog}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>Request Details</DialogTitle>
          </DialogHeader>
          {selectedRequest && <RequestDetail request={selectedRequest} />}
        </DialogContent>
      </Dialog>
    </DashboardLayout>
  );
};

export default RequestsPage;
