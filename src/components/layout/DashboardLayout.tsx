import React, { ReactNode, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  BookOpen,
  Users,
  Settings,
  BarChart3,
  Upload,
  LogOut,
  Menu,
  X,
  Home,
  MessageSquare,
  User,
} from "lucide-react";

interface NavItemProps {
  icon: ReactNode;
  label: string;
  href: string;
  active?: boolean;
}

const NavItem = ({ icon, label, href, active = false }: NavItemProps) => {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <Link
            to={href}
            className={cn(
              "flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition-colors",
              active
                ? "bg-pink-100 text-pink-700"
                : "text-gray-700 hover:bg-pink-50 hover:text-pink-600",
            )}
          >
            <span className="text-lg">{icon}</span>
            <span className="hidden md:inline">{label}</span>
          </Link>
        </TooltipTrigger>
        <TooltipContent side="right" className="md:hidden">
          {label}
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};

interface DashboardLayoutProps {
  children: ReactNode;
  userRole?: "User" | "Librarian" | "Admin" | "Super Admin";
  userName?: string;
  userAvatar?: string;
}

const DashboardLayout = ({
  children,
  userRole = "User",
  userName = "Guest User",
  userAvatar = "",
}: DashboardLayoutProps) => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const navigate = useNavigate();

  const handleLogout = () => {
    // Logout functionality
    navigate("/");
  };

  const userInitials = userName
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase();

  return (
    <div className="flex h-screen bg-white">
      {/* Mobile sidebar toggle */}
      <div className="fixed left-4 top-4 z-50 block md:hidden">
        <Button
          variant="outline"
          size="icon"
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className="rounded-full bg-white shadow-md"
        >
          {sidebarOpen ? <X size={18} /> : <Menu size={18} />}
        </Button>
      </div>

      {/* Sidebar */}
      <aside
        className={cn(
          "fixed inset-y-0 left-0 z-40 w-16 flex-shrink-0 transform overflow-y-auto bg-white px-2 py-4 shadow-md transition-all duration-300 ease-in-out md:relative md:w-64 md:translate-x-0 md:px-4",
          sidebarOpen ? "translate-x-0" : "-translate-x-full",
        )}
      >
        {/* Logo */}
        <div className="mb-8 flex items-center justify-center md:justify-start">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-pink-600 text-white">
            <BookOpen size={20} />
          </div>
          <h1 className="ml-2 hidden text-xl font-bold text-pink-700 md:block">
            NEU Thesis
          </h1>
        </div>

        {/* Navigation */}
        <nav className="space-y-1">
          <NavItem icon={<Home />} label="Dashboard" href="/dashboard" active />
          <NavItem
            icon={<BookOpen />}
            label="Thesis Repository"
            href="/thesis"
          />
          <NavItem
            icon={<MessageSquare />}
            label="AI Assistant"
            href="/assistant"
          />

          {/* Conditional navigation based on user role */}
          {(userRole === "Librarian" ||
            userRole === "Admin" ||
            userRole === "Super Admin") && (
            <NavItem icon={<Upload />} label="Upload Thesis" href="/upload" />
          )}

          {(userRole === "Admin" || userRole === "Super Admin") && (
            <NavItem icon={<Users />} label="User Management" href="/users" />
          )}

          {userRole === "Super Admin" && (
            <>
              <NavItem
                icon={<Settings />}
                label="System Settings"
                href="/settings"
              />
              <NavItem
                icon={<BarChart3 />}
                label="Analytics"
                href="/analytics"
              />
            </>
          )}
        </nav>

        {/* User profile at bottom */}
        <div className="absolute bottom-4 left-0 right-0 px-2 md:px-4">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                className="w-full justify-start gap-2 px-2 hover:bg-pink-50"
              >
                <Avatar className="h-8 w-8 border border-pink-200">
                  {userAvatar ? (
                    <AvatarImage src={userAvatar} alt={userName} />
                  ) : (
                    <AvatarFallback className="bg-pink-100 text-pink-700">
                      {userInitials}
                    </AvatarFallback>
                  )}
                </Avatar>
                <div className="hidden flex-col items-start text-left md:flex">
                  <span className="text-sm font-medium">{userName}</span>
                  <span className="text-xs text-gray-500">{userRole}</span>
                </div>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56">
              <DropdownMenuLabel>My Account</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem asChild>
                <Link to="/profile" className="flex w-full cursor-pointer">
                  <User className="mr-2 h-4 w-4" />
                  <span>Profile</span>
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem
                className="text-red-600 focus:bg-red-50 focus:text-red-600"
                onClick={handleLogout}
              >
                <LogOut className="mr-2 h-4 w-4" />
                <span>Log out</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </aside>

      {/* Main content */}
      <main className="flex-1 overflow-auto bg-gray-50 p-4 md:p-6">
        <div className="mx-auto max-w-7xl">{children}</div>
      </main>
    </div>
  );
};

export default DashboardLayout;
