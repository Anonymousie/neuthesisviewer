import React, { useState } from "react";
import {
  Users,
  FileText,
  Settings,
  BarChart3,
  Shield,
  LogOut,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import UserManagement from "@/components/admin/UserManagement";

interface AdminDashboardProps {
  username?: string;
}

const AdminDashboard = ({ username = "Admin User" }: AdminDashboardProps) => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("users");

  // Stats for the dashboard overview
  const stats = [
    {
      title: "Total Users",
      value: "124",
      icon: <Users className="h-4 w-4 text-pink-500" />,
    },
    {
      title: "Thesis Documents",
      value: "87",
      icon: <FileText className="h-4 w-4 text-pink-500" />,
    },
    {
      title: "Pending Approvals",
      value: "12",
      icon: <Shield className="h-4 w-4 text-pink-500" />,
    },
  ];

  return (
    <div className="bg-white min-h-screen p-6">
      <div className="max-w-7xl mx-auto">
        <header className="mb-8 flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-pink-700">
              Admin Dashboard
            </h1>
            <p className="text-gray-500">Welcome back, {username}</p>
          </div>
          <Button
            variant="outline"
            className="flex items-center gap-2 border-pink-200 text-pink-700 hover:bg-pink-50"
            onClick={() => navigate("/")}
          >
            <LogOut className="h-4 w-4" />
            Logout
          </Button>
        </header>

        {/* Dashboard Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {stats.map((stat, index) => (
            <Card key={index}>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium text-gray-500">
                  {stat.title}
                </CardTitle>
                {stat.icon}
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-pink-600">
                  {stat.value}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Main Content Tabs */}
        <Tabs
          defaultValue="users"
          value={activeTab}
          onValueChange={setActiveTab}
          className="w-full"
        >
          <TabsList className="bg-pink-50 mb-6">
            <TabsTrigger
              value="users"
              className="data-[state=active]:bg-pink-100 data-[state=active]:text-pink-700"
            >
              <Users className="h-4 w-4 mr-2" />
              User Management
            </TabsTrigger>
            <TabsTrigger
              value="content"
              className="data-[state=active]:bg-pink-100 data-[state=active]:text-pink-700"
            >
              <FileText className="h-4 w-4 mr-2" />
              Content Management
            </TabsTrigger>
            <TabsTrigger
              value="settings"
              className="data-[state=active]:bg-pink-100 data-[state=active]:text-pink-700"
            >
              <Settings className="h-4 w-4 mr-2" />
              Settings
            </TabsTrigger>
            <TabsTrigger
              value="analytics"
              className="data-[state=active]:bg-pink-100 data-[state=active]:text-pink-700"
            >
              <BarChart3 className="h-4 w-4 mr-2" />
              Analytics
            </TabsTrigger>
          </TabsList>

          {/* User Management Tab */}
          <TabsContent value="users" className="space-y-4">
            <UserManagement />
          </TabsContent>

          {/* Content Management Tab */}
          <TabsContent value="content" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="text-2xl font-bold text-pink-700">
                  Content Management
                </CardTitle>
                <CardDescription>
                  Manage thesis documents, categories, and visibility settings.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between items-center p-4 border rounded-lg">
                    <div>
                      <h3 className="font-medium">
                        Advanced Machine Learning Techniques
                      </h3>
                      <p className="text-sm text-gray-500">
                        Uploaded by: Sarah Johnson • 3 days ago
                      </p>
                    </div>
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm">
                        Hide
                      </Button>
                      <Button variant="destructive" size="sm">
                        Delete
                      </Button>
                    </div>
                  </div>

                  <div className="flex justify-between items-center p-4 border rounded-lg">
                    <div>
                      <h3 className="font-medium">
                        Quantum Computing Applications
                      </h3>
                      <p className="text-sm text-gray-500">
                        Uploaded by: Michael Chen • 1 week ago
                      </p>
                    </div>
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm">
                        Hide
                      </Button>
                      <Button variant="destructive" size="sm">
                        Delete
                      </Button>
                    </div>
                  </div>

                  <div className="flex justify-between items-center p-4 border rounded-lg">
                    <div>
                      <h3 className="font-medium">
                        Sustainable Energy Solutions
                      </h3>
                      <p className="text-sm text-gray-500">
                        Uploaded by: Emma Davis • 2 weeks ago
                      </p>
                    </div>
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm">
                        Hide
                      </Button>
                      <Button variant="destructive" size="sm">
                        Delete
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Settings Tab */}
          <TabsContent value="settings" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="text-2xl font-bold text-pink-700">
                  System Settings
                </CardTitle>
                <CardDescription>
                  Configure application settings and permissions.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div className="space-y-2">
                    <h3 className="text-lg font-medium">General Settings</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <label className="text-sm font-medium">
                          Site Title
                        </label>
                        <input
                          type="text"
                          className="w-full p-2 border rounded-md"
                          defaultValue="NEU Thesis Viewer"
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="text-sm font-medium">
                          Contact Email
                        </label>
                        <input
                          type="email"
                          className="w-full p-2 border rounded-md"
                          defaultValue="admin@neuthesis.edu"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <h3 className="text-lg font-medium">Access Controls</h3>
                    <div className="space-y-2">
                      <div className="flex items-center space-x-2">
                        <input
                          type="checkbox"
                          id="allow-downloads"
                          defaultChecked
                        />
                        <label htmlFor="allow-downloads">
                          Allow thesis downloads for all users
                        </label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <input
                          type="checkbox"
                          id="require-approval"
                          defaultChecked
                        />
                        <label htmlFor="require-approval">
                          Require approval for new thesis uploads
                        </label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <input
                          type="checkbox"
                          id="enable-chatbot"
                          defaultChecked
                        />
                        <label htmlFor="enable-chatbot">
                          Enable AI chatbot assistant
                        </label>
                      </div>
                    </div>
                  </div>

                  <Button className="bg-pink-600 hover:bg-pink-700">
                    Save Settings
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Analytics Tab */}
          <TabsContent value="analytics" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="text-2xl font-bold text-pink-700">
                  Usage Analytics
                </CardTitle>
                <CardDescription>
                  View system usage statistics and user activity.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <Card>
                      <CardHeader className="pb-2">
                        <CardTitle className="text-sm font-medium">
                          Most Viewed Thesis
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="text-2xl font-bold text-pink-600">
                          Quantum Computing
                        </div>
                        <p className="text-sm text-gray-500">
                          1,245 views this month
                        </p>
                      </CardContent>
                    </Card>
                    <Card>
                      <CardHeader className="pb-2">
                        <CardTitle className="text-sm font-medium">
                          Active Users
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="text-2xl font-bold text-pink-600">
                          78
                        </div>
                        <p className="text-sm text-gray-500">
                          Currently online
                        </p>
                      </CardContent>
                    </Card>
                    <Card>
                      <CardHeader className="pb-2">
                        <CardTitle className="text-sm font-medium">
                          Downloads
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="text-2xl font-bold text-pink-600">
                          342
                        </div>
                        <p className="text-sm text-gray-500">This week</p>
                      </CardContent>
                    </Card>
                  </div>

                  <div className="h-64 bg-pink-50 rounded-lg flex items-center justify-center">
                    <p className="text-gray-500">Analytics chart placeholder</p>
                  </div>

                  <div className="space-y-2">
                    <h3 className="text-lg font-medium">
                      Popular Search Terms
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      <span className="px-3 py-1 bg-pink-100 text-pink-700 rounded-full text-sm">
                        machine learning
                      </span>
                      <span className="px-3 py-1 bg-pink-100 text-pink-700 rounded-full text-sm">
                        artificial intelligence
                      </span>
                      <span className="px-3 py-1 bg-pink-100 text-pink-700 rounded-full text-sm">
                        quantum computing
                      </span>
                      <span className="px-3 py-1 bg-pink-100 text-pink-700 rounded-full text-sm">
                        renewable energy
                      </span>
                      <span className="px-3 py-1 bg-pink-100 text-pink-700 rounded-full text-sm">
                        neural networks
                      </span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default AdminDashboard;
