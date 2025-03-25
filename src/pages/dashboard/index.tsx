
import React from "react";
import { DashboardLayout } from "@/components/layout/dashboard-layout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowUpRight, MessageSquare, FileText, Users, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const Dashboard = () => {
  return (
    <DashboardLayout>
      <div className="space-y-8">
        <div>
          <h1 className="text-2xl font-semibold mb-2 slide-up">Dashboard</h1>
          <p className="text-muted-foreground slide-up">Overview of your recent activity and key metrics</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 fade-in-delay-1">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Unread Messages</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex justify-between items-center">
                <div className="text-2xl font-bold">5</div>
                <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-600">
                  <MessageSquare size={20} />
                </div>
              </div>
              <div className="text-xs text-muted-foreground mt-1">+2 from yesterday</div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Open Requests</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex justify-between items-center">
                <div className="text-2xl font-bold">8</div>
                <div className="h-10 w-10 rounded-full bg-amber-100 flex items-center justify-center text-amber-600">
                  <FileText size={20} />
                </div>
              </div>
              <div className="text-xs text-muted-foreground mt-1">+3 new requests today</div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Active Users</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex justify-between items-center">
                <div className="text-2xl font-bold">12</div>
                <div className="h-10 w-10 rounded-full bg-green-100 flex items-center justify-center text-green-600">
                  <Users size={20} />
                </div>
              </div>
              <div className="text-xs text-muted-foreground mt-1">4 users currently online</div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Completion Rate</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex justify-between items-center">
                <div className="text-2xl font-bold">78%</div>
                <div className="h-10 w-10 rounded-full bg-purple-100 flex items-center justify-center text-purple-600">
                  <ArrowUpRight size={20} />
                </div>
              </div>
              <Progress value={78} className="h-1.5 mt-2" />
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 fade-in-delay-2">
          <Card className="col-span-1">
            <CardHeader>
              <CardTitle>Recent Messages</CardTitle>
              <CardDescription>Your latest unread messages</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {[
                { from: "Sarah Johnson", message: "Hey, can we meet tomorrow to discuss the project?", time: "1 hour ago" },
                { from: "David Lee", message: "I've uploaded the revised document, please check", time: "3 hours ago" },
                { from: "Emily Chen", message: "Do you have the tax documents ready?", time: "5 hours ago" },
              ].map((msg, index) => (
                <div key={index} className="flex gap-4 items-start">
                  <div className="w-10 h-10 rounded-full bg-secondary flex items-center justify-center flex-shrink-0">
                    <span className="text-sm font-medium">{msg.from[0]}</span>
                  </div>
                  <div className="flex-1">
                    <div className="flex justify-between items-center">
                      <h4 className="font-medium">{msg.from}</h4>
                      <time className="text-xs text-muted-foreground">{msg.time}</time>
                    </div>
                    <p className="text-sm text-muted-foreground mt-1">{msg.message}</p>
                  </div>
                </div>
              ))}
              <Button variant="ghost" size="sm" className="w-full flex items-center justify-center mt-2">
                <span>View all messages</span>
                <ArrowRight size={16} className="ml-2" />
              </Button>
            </CardContent>
          </Card>

          <Card className="col-span-1">
            <CardHeader>
              <CardTitle>Recent Requests</CardTitle>
              <CardDescription>Recent requests assigned to you</CardDescription>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="incoming">
                <TabsList className="mb-4">
                  <TabsTrigger value="incoming">Incoming</TabsTrigger>
                  <TabsTrigger value="outgoing">Outgoing</TabsTrigger>
                </TabsList>

                <TabsContent value="incoming" className="space-y-4">
                  {[
                    { title: "Digital Certificate Renewal", requester: "John Smith", status: "Open", department: "Finance" },
                    { title: "System Access Request", requester: "Maria Garcia", status: "In Progress", department: "IT" },
                    { title: "Tax Document Approval", requester: "Robert Chen", status: "Open", department: "Tax" },
                  ].map((req, index) => (
                    <div key={index} className="flex justify-between items-start border-b last:border-0 pb-3 last:pb-0">
                      <div>
                        <h4 className="font-medium text-sm">{req.title}</h4>
                        <p className="text-xs text-muted-foreground mt-1">From: {req.requester} ({req.department})</p>
                      </div>
                      <Badge variant={req.status === "Open" ? "outline" : "secondary"}>
                        {req.status}
                      </Badge>
                    </div>
                  ))}
                </TabsContent>

                <TabsContent value="outgoing" className="space-y-4">
                  {[
                    { title: "Budget Approval", assignee: "Financial Department", status: "In Progress", department: "Accounting" },
                    { title: "New Hire Onboarding", assignee: "HR Team", status: "Open", department: "HR" },
                  ].map((req, index) => (
                    <div key={index} className="flex justify-between items-start border-b last:border-0 pb-3 last:pb-0">
                      <div>
                        <h4 className="font-medium text-sm">{req.title}</h4>
                        <p className="text-xs text-muted-foreground mt-1">To: {req.assignee} ({req.department})</p>
                      </div>
                      <Badge variant={req.status === "Open" ? "outline" : "secondary"}>
                        {req.status}
                      </Badge>
                    </div>
                  ))}
                </TabsContent>
              </Tabs>
              
              <Button variant="ghost" size="sm" className="w-full flex items-center justify-center mt-4">
                <span>View all requests</span>
                <ArrowRight size={16} className="ml-2" />
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Dashboard;
