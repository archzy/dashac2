
import React, { useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";
import { ChevronLeft, ChevronRight, LayoutDashboard, Users, MessageSquare, FileText, LogOut } from "lucide-react";
import { useAuth } from "@/hooks/use-auth";
import { toast } from "sonner";

export const Sidebar = () => {
  const [collapsed, setCollapsed] = useState(false);
  const location = useLocation();
  const { user, logout } = useAuth();

  const handleLogout = async () => {
    await logout();
    toast.success("Logged out successfully");
  };

  const navItems = [
    { 
      path: "/dashboard", 
      icon: <LayoutDashboard size={20} />, 
      label: "Dashboard" 
    },
    { 
      path: "/users", 
      icon: <Users size={20} />, 
      label: "Users" 
    },
    { 
      path: "/chat", 
      icon: <MessageSquare size={20} />, 
      label: "Chat" 
    },
    { 
      path: "/requests", 
      icon: <FileText size={20} />, 
      label: "Requests" 
    },
  ];

  return (
    <aside 
      className={cn(
        "h-screen sticky top-0 bg-card border-r z-30 transition-all duration-300 ease-in-out",
        collapsed ? "w-[72px]" : "w-[240px]",
        "hidden md:block"
      )}
    >
      <div className="flex flex-col h-full">
        <div className="h-16 flex items-center px-4 border-b justify-between">
          {!collapsed && (
            <span className="font-semibold tracking-tight fade-in">
              AdminHub
            </span>
          )}
          <button 
            onClick={() => setCollapsed(!collapsed)}
            className="p-1.5 rounded-md hover:bg-secondary transition-colors ml-auto"
          >
            {collapsed ? <ChevronRight size={18} /> : <ChevronLeft size={18} />}
          </button>
        </div>

        <nav className="flex-1 py-6 px-3">
          <ul className="space-y-1">
            {navItems.map((item) => (
              <li key={item.path}>
                <NavLink
                  to={item.path}
                  className={({ isActive }) => cn(
                    "flex items-center gap-x-2 py-2.5 px-3 rounded-md transition-all group",
                    isActive 
                      ? "bg-secondary text-foreground font-medium" 
                      : "text-muted-foreground hover:text-foreground hover:bg-secondary/50"
                  )}
                >
                  <span className="transition-transform duration-300">
                    {item.icon}
                  </span>
                  {!collapsed && (
                    <span className="transition-opacity duration-200">{item.label}</span>
                  )}
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>

        <div className="p-3 mt-auto">
          <div className="border-t pt-3">
            <button
              onClick={handleLogout}
              className={cn(
                "flex items-center w-full gap-x-2 py-2.5 px-3 rounded-md transition-all text-muted-foreground hover:text-foreground hover:bg-secondary/50"
              )}
            >
              <LogOut size={20} />
              {!collapsed && <span>Log out</span>}
            </button>
          </div>
          
          {!collapsed && user && (
            <div className="border-t mt-3 pt-3">
              <div className="flex items-center gap-3 px-3">
                <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                  <span className="text-xs font-medium">
                    {user.name.split(" ").map(n => n[0]).join("").toUpperCase()}
                  </span>
                </div>
                <div className="overflow-hidden">
                  <p className="text-sm font-medium truncate">{user.name}</p>
                  <p className="text-xs text-muted-foreground truncate">{user.email}</p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </aside>
  );
};
