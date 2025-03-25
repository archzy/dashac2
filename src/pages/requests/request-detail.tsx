import React from "react";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Calendar, Clock, User, Briefcase, AlertTriangle, Plus } from "lucide-react";

interface RequestDetailProps {
  request: {
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
  };
}

export const RequestDetail = ({ request }: RequestDetailProps) => {
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-semibold">{request.title}</h2>
        <div className="flex flex-wrap gap-2 mt-2">
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
          <Badge 
            variant="outline" 
            className={`
              ${request.priority === "High" ? "text-red-600 bg-red-50" : ""} 
              ${request.priority === "Medium" ? "text-amber-600 bg-amber-50" : ""}
              ${request.priority === "Low" ? "text-blue-600 bg-blue-50" : ""}
            `}
          >
            Priority: {request.priority}
          </Badge>
        </div>
      </div>

      <Separator />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-4">
          <div className="flex items-start gap-2">
            <User className="h-5 w-5 text-muted-foreground mt-0.5" />
            <div>
              <p className="text-sm text-muted-foreground">Requester</p>
              <p className="font-medium">{request.requester.name}</p>
            </div>
          </div>
          
          <div className="flex items-start gap-2">
            <User className="h-5 w-5 text-muted-foreground mt-0.5" />
            <div>
              <p className="text-sm text-muted-foreground">Assignee</p>
              <p className="font-medium">{request.assignee.name}</p>
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <div className="flex items-start gap-2">
            <Briefcase className="h-5 w-5 text-muted-foreground mt-0.5" />
            <div>
              <p className="text-sm text-muted-foreground">Sector</p>
              <p className="font-medium">{request.sector}</p>
            </div>
          </div>
          
          <div className="flex items-start gap-2">
            <Calendar className="h-5 w-5 text-muted-foreground mt-0.5" />
            <div>
              <p className="text-sm text-muted-foreground">Created</p>
              <p className="font-medium">{formatDate(request.createdAt)}</p>
            </div>
          </div>
        </div>
      </div>

      <Separator />

      <div>
        <h3 className="font-medium mb-2">Description</h3>
        <div className="bg-secondary/50 p-4 rounded-md text-secondary-foreground">
          <p className="whitespace-pre-line">{request.description}</p>
        </div>
      </div>

      <div>
        <h3 className="font-medium mb-2">Activity Timeline</h3>
        <div className="space-y-4">
          <div className="flex gap-2">
            <div className="h-7 w-7 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0">
              <Clock size={14} className="text-green-700" />
            </div>
            <div>
              <p className="text-sm font-medium">Status updated to {request.status}</p>
              <p className="text-xs text-muted-foreground">{formatDate(request.updatedAt)}</p>
            </div>
          </div>
          
          <div className="flex gap-2">
            <div className="h-7 w-7 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0">
              <User size={14} className="text-blue-700" />
            </div>
            <div>
              <p className="text-sm font-medium">Request assigned to {request.assignee.name}</p>
              <p className="text-xs text-muted-foreground">{formatDate(request.createdAt)}</p>
            </div>
          </div>
          
          <div className="flex gap-2">
            <div className="h-7 w-7 rounded-full bg-purple-100 flex items-center justify-center flex-shrink-0">
              <Plus size={14} className="text-purple-700" />
            </div>
            <div>
              <p className="text-sm font-medium">Request created by {request.requester.name}</p>
              <p className="text-xs text-muted-foreground">{formatDate(request.createdAt)}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
