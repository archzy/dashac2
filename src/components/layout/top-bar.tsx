
import React from "react";
import { Bell, Menu } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useAuth } from "@/hooks/use-auth";

export const TopBar = () => {
  const { user } = useAuth();
  
  return (
    <header className="h-16 border-b flex items-center px-4 md:px-6 sticky top-0 bg-background/95 backdrop-blur-sm z-10">
      <div className="md:hidden mr-2">
        <Button variant="ghost" size="icon" className="md:hidden">
          <Menu size={20} />
        </Button>
      </div>
      
      <div className="flex-1">
        <h1 className="text-lg font-medium">Welcome, {user?.name}</h1>
      </div>
      
      <div className="flex items-center gap-4">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon" className="relative">
              <Bell size={20} />
              <Badge className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0">
                2
              </Badge>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-80">
            <div className="p-2 font-medium">Notifications</div>
            <div className="border-t">
              <DropdownMenuItem className="py-3">
                <div className="flex flex-col gap-1">
                  <p className="font-medium">New message from Sarah</p>
                  <p className="text-sm text-muted-foreground">Hey, can we meet tomorrow to discuss the project?</p>
                  <p className="text-xs text-muted-foreground">1 hour ago</p>
                </div>
              </DropdownMenuItem>
              <DropdownMenuItem className="py-3">
                <div className="flex flex-col gap-1">
                  <p className="font-medium">Request status updated</p>
                  <p className="text-sm text-muted-foreground">Your document request has been completed</p>
                  <p className="text-xs text-muted-foreground">2 hours ago</p>
                </div>
              </DropdownMenuItem>
            </div>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
};
