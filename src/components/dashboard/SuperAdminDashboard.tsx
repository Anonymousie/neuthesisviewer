import React, { useState } from "react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Shield,
  Users,
  FileText,
  Settings,
  BarChart,
  UserCog,
  Database,
  Bell,
  LogOut,
} from "lucide-react";

// Import components
import SystemConfiguration from "@/components/admin/SystemConfiguration";
import AnalyticsDashboard from "@/components/admin/AnalyticsDashboard";
import UserManagement from "@/components/admin/UserManagement";

interface SuperAdminDashboardProps {
  userName?: string;
  userAvatar?: string;
  activeTab?: string;
}

const SuperAdminDashboard = ({
  userName = "Emily Davis",
  userAvatar = "https://api.dicebear.com/7.x/avataaars/svg?seed=Emily",
  activeTab = "overview",
}: SuperAdminDashboardProps) => {
  const [currentTab, setCurrentTab] = useState(activeTab);

  // Stats for quick overview
  const stats = [
    {
      title: "Total Users",
      value: "4,271",
      change: "+12%",
      icon: <Users className="h-5 w-5 text-pink-500" />,
    },
    {
      title: "Total Theses",
      value: "1,834",
      change: "+8%",
      icon: <FileText className="h-5 w-5 text-pink-500" />,
    },
    {
      title: "Active Admins",
      value: "24",
      change: "+2",
      icon: <Shield className="h-5 w-5 text-pink-500" />,
    },
    {
      title: "System Health",
      value: "98%",
      change: "+1%",
      icon: <Database className="h-5 w-5 text-pink-500" />,
    },
  ];

  // Recent notifications
  const notifications = [
    {
      id: 1,
      title: "New Admin Added",
      description: "Robert Johnson was promoted to Admin role",
      time: "2 hours ago",
    },
    {
      id: 2,
      title: "System Update Completed",
      description: "The system was updated to version 2.4.0",
      time: "Yesterday",
    },
    {
      id: 3,
      title: "Backup Completed",
      description: "Weekly system backup completed successfully",
      time: "2 days ago",
    },
  ];

  return (
    <div className="min-h-screen bg-pink-50">
      {/* Header */}
      <header className="bg-white border-b border-pink-100 p-4 shadow-sm">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <Shield className="h-8 w-8 text-pink-600" />
            <h1 className="text-2xl font-bold text-pink-700">
              Super Admin Dashboard
            </h1>
          </div>
          <div className="flex items-center space-x-4">
            <div className="relative">
              <Bell className="h-6 w-6 text-pink-500 cursor-pointer" />
              <span className="absolute -top-1 -right-1 bg-pink-600 text-white text-xs rounded-full h-4 w-4 flex items-center justify-center">
                3
              </span>
            </div>
            <div className="flex items-center space-x-2">
              <img
                src={userAvatar}
                alt="User Avatar"
                className="h-8 w-8 rounded-full border-2 border-pink-200"
              />
              <span className="font-medium text-gray-700">{userName}</span>
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => (window.location.href = "/")}
            >
              <LogOut className="h-4 w-4 mr-2" /> Logout
            </Button>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto p-4 md:p-6">
        {/* Dashboard Overview */}
        <div className="mb-8">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">
            Dashboard Overview
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {stats.map((stat, index) => (
              <Card key={index} className="bg-white">
                <CardContent className="p-6">
                  <div className="flex justify-between items-start">
                    <div>
                      <p className="text-sm font-medium text-gray-500">
                        {stat.title}
                      </p>
                      <p className="text-2xl font-bold mt-1">{stat.value}</p>
                      <p className="text-xs text-green-500 mt-1">
                        {stat.change} from last month
                      </p>
                    </div>
                    <div className="p-3 bg-pink-100 rounded-full">
                      {stat.icon}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Sidebar */}
          <Card className="bg-white lg:col-span-1 h-fit">
            <CardContent className="p-4">
              <nav className="space-y-2">
                <Button
                  variant={currentTab === "overview" ? "default" : "ghost"}
                  className={`w-full justify-start ${currentTab === "overview" ? "bg-pink-600 hover:bg-pink-700" : ""}`}
                  onClick={() => setCurrentTab("overview")}
                >
                  <BarChart className="mr-2 h-4 w-4" />
                  Overview
                </Button>
                <Button
                  variant={currentTab === "users" ? "default" : "ghost"}
                  className={`w-full justify-start ${currentTab === "users" ? "bg-pink-600 hover:bg-pink-700" : ""}`}
                  onClick={() => setCurrentTab("users")}
                >
                  <UserCog className="mr-2 h-4 w-4" />
                  User Management
                </Button>
                <Button
                  variant={currentTab === "system" ? "default" : "ghost"}
                  className={`w-full justify-start ${currentTab === "system" ? "bg-pink-600 hover:bg-pink-700" : ""}`}
                  onClick={() => setCurrentTab("system")}
                >
                  <Settings className="mr-2 h-4 w-4" />
                  System Configuration
                </Button>
                <Button
                  variant={currentTab === "analytics" ? "default" : "ghost"}
                  className={`w-full justify-start ${currentTab === "analytics" ? "bg-pink-600 hover:bg-pink-700" : ""}`}
                  onClick={() => setCurrentTab("analytics")}
                >
                  <BarChart className="mr-2 h-4 w-4" />
                  Analytics
                </Button>
              </nav>

              <div className="mt-8">
                <h3 className="text-sm font-medium text-gray-500 mb-3">
                  Recent Notifications
                </h3>
                <div className="space-y-3">
                  {notifications.map((notification) => (
                    <div
                      key={notification.id}
                      className="p-3 bg-pink-50 rounded-lg"
                    >
                      <p className="text-sm font-medium">
                        {notification.title}
                      </p>
                      <p className="text-xs text-gray-500">
                        {notification.description}
                      </p>
                      <p className="text-xs text-pink-500 mt-1">
                        {notification.time}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Main Content Area */}
          <div className="lg:col-span-3">
            {currentTab === "overview" && (
              <Card className="bg-white">
                <CardHeader>
                  <CardTitle>Welcome, {userName}</CardTitle>
                  <CardDescription>
                    You have full access to all system features and settings as
                    a Super Admin.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <p className="text-gray-600">
                      As a Super Admin, you can manage all aspects of the NEU
                      Thesis Viewer system, including:
                    </p>
                    <ul className="list-disc pl-5 space-y-2 text-gray-600">
                      <li>Managing all user accounts and roles</li>
                      <li>Configuring system settings and permissions</li>
                      <li>Viewing detailed analytics and reports</li>
                      <li>Managing thesis content and metadata requirements</li>
                      <li>Performing system maintenance and backups</li>
                    </ul>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
                      <Button
                        className="bg-pink-600 hover:bg-pink-700"
                        onClick={() => setCurrentTab("users")}
                      >
                        <UserCog className="mr-2 h-4 w-4" />
                        Manage Users
                      </Button>
                      <Button
                        className="bg-pink-600 hover:bg-pink-700"
                        onClick={() => setCurrentTab("system")}
                      >
                        <Settings className="mr-2 h-4 w-4" />
                        System Settings
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}

            {currentTab === "users" && <UserManagement />}
            {currentTab === "system" && <SystemConfiguration />}
            {currentTab === "analytics" && <AnalyticsDashboard />}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SuperAdminDashboard;
