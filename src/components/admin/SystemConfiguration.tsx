import React, { useState } from "react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import {
  Shield,
  Lock,
  Users,
  Database,
  Bell,
  Globe,
  Eye,
  FileText,
  Settings,
  Save,
} from "lucide-react";

interface SystemConfigurationProps {
  initialTab?: string;
}

const SystemConfiguration = ({
  initialTab = "security",
}: SystemConfigurationProps) => {
  const [activeTab, setActiveTab] = useState(initialTab);

  return (
    <div className="w-full min-h-screen bg-white p-6">
      <div className="max-w-6xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-pink-600">
            System Configuration
          </h1>
          <p className="text-gray-500 mt-2">
            Manage system settings and configurations for NEU Thesis Viewer
          </p>
        </div>

        <Tabs
          defaultValue={activeTab}
          onValueChange={setActiveTab}
          className="w-full"
        >
          <TabsList className="grid grid-cols-5 mb-8">
            <TabsTrigger value="security" className="flex items-center gap-2">
              <Shield className="h-4 w-4" />
              <span>Security</span>
            </TabsTrigger>
            <TabsTrigger value="access" className="flex items-center gap-2">
              <Lock className="h-4 w-4" />
              <span>Access Control</span>
            </TabsTrigger>
            <TabsTrigger value="users" className="flex items-center gap-2">
              <Users className="h-4 w-4" />
              <span>User Settings</span>
            </TabsTrigger>
            <TabsTrigger value="content" className="flex items-center gap-2">
              <FileText className="h-4 w-4" />
              <span>Content</span>
            </TabsTrigger>
            <TabsTrigger value="system" className="flex items-center gap-2">
              <Settings className="h-4 w-4" />
              <span>System</span>
            </TabsTrigger>
          </TabsList>

          {/* Security Settings */}
          <TabsContent value="security" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-pink-600">
                  Authentication Settings
                </CardTitle>
                <CardDescription>
                  Configure authentication methods and security policies
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-medium">Two-Factor Authentication</h3>
                    <p className="text-sm text-gray-500">
                      Require 2FA for all admin accounts
                    </p>
                  </div>
                  <Switch defaultChecked={true} />
                </div>
                <Separator />
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-medium">Password Policy</h3>
                    <p className="text-sm text-gray-500">
                      Enforce strong password requirements
                    </p>
                  </div>
                  <Switch defaultChecked={true} />
                </div>
                <Separator />
                <div className="space-y-2">
                  <h3 className="font-medium">Session Timeout (minutes)</h3>
                  <Input type="number" defaultValue="30" />
                </div>
                <div className="space-y-2">
                  <h3 className="font-medium">Maximum Login Attempts</h3>
                  <Input type="number" defaultValue="5" />
                </div>
              </CardContent>
              <CardFooter>
                <Button className="bg-pink-600 hover:bg-pink-700">
                  <Save className="mr-2 h-4 w-4" />
                  Save Changes
                </Button>
              </CardFooter>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-pink-600">API Security</CardTitle>
                <CardDescription>
                  Manage API access and security settings
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-medium">API Rate Limiting</h3>
                    <p className="text-sm text-gray-500">
                      Limit API requests per minute
                    </p>
                  </div>
                  <Switch defaultChecked={true} />
                </div>
                <div className="space-y-2">
                  <h3 className="font-medium">
                    Rate Limit (requests per minute)
                  </h3>
                  <Input type="number" defaultValue="100" />
                </div>
                <Separator />
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-medium">API Key Authentication</h3>
                    <p className="text-sm text-gray-500">
                      Require API keys for external access
                    </p>
                  </div>
                  <Switch defaultChecked={true} />
                </div>
              </CardContent>
              <CardFooter>
                <Button className="bg-pink-600 hover:bg-pink-700">
                  <Save className="mr-2 h-4 w-4" />
                  Save Changes
                </Button>
              </CardFooter>
            </Card>
          </TabsContent>

          {/* Access Control Settings */}
          <TabsContent value="access" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-pink-600">
                  Role Permissions
                </CardTitle>
                <CardDescription>
                  Configure permissions for each user role
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <h3 className="font-medium">User Role</h3>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="flex items-center justify-between p-3 border rounded-md">
                      <div className="flex items-center">
                        <Eye className="h-4 w-4 mr-2 text-gray-500" />
                        <span>View Thesis Documents</span>
                      </div>
                      <Switch defaultChecked={true} />
                    </div>
                    <div className="flex items-center justify-between p-3 border rounded-md">
                      <div className="flex items-center">
                        <FileText className="h-4 w-4 mr-2 text-gray-500" />
                        <span>Download Thesis</span>
                      </div>
                      <Switch defaultChecked={false} />
                    </div>
                  </div>
                </div>

                <Separator />

                <div className="space-y-4">
                  <h3 className="font-medium">Librarian Role</h3>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="flex items-center justify-between p-3 border rounded-md">
                      <div className="flex items-center">
                        <FileText className="h-4 w-4 mr-2 text-gray-500" />
                        <span>Upload Thesis</span>
                      </div>
                      <Switch defaultChecked={true} />
                    </div>
                    <div className="flex items-center justify-between p-3 border rounded-md">
                      <div className="flex items-center">
                        <FileText className="h-4 w-4 mr-2 text-gray-500" />
                        <span>Edit Metadata</span>
                      </div>
                      <Switch defaultChecked={true} />
                    </div>
                  </div>
                </div>

                <Separator />

                <div className="space-y-4">
                  <h3 className="font-medium">Admin Role</h3>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="flex items-center justify-between p-3 border rounded-md">
                      <div className="flex items-center">
                        <Users className="h-4 w-4 mr-2 text-gray-500" />
                        <span>Manage Users</span>
                      </div>
                      <Switch defaultChecked={true} />
                    </div>
                    <div className="flex items-center justify-between p-3 border rounded-md">
                      <div className="flex items-center">
                        <FileText className="h-4 w-4 mr-2 text-gray-500" />
                        <span>Delete Content</span>
                      </div>
                      <Switch defaultChecked={true} />
                    </div>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button className="bg-pink-600 hover:bg-pink-700">
                  <Save className="mr-2 h-4 w-4" />
                  Save Changes
                </Button>
              </CardFooter>
            </Card>
          </TabsContent>

          {/* User Settings */}
          <TabsContent value="users" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-pink-600">
                  User Registration
                </CardTitle>
                <CardDescription>
                  Configure user registration and account settings
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-medium">Allow Public Registration</h3>
                    <p className="text-sm text-gray-500">
                      Enable users to register accounts
                    </p>
                  </div>
                  <Switch defaultChecked={true} />
                </div>
                <Separator />
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-medium">Email Verification</h3>
                    <p className="text-sm text-gray-500">
                      Require email verification for new accounts
                    </p>
                  </div>
                  <Switch defaultChecked={true} />
                </div>
                <Separator />
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-medium">Default User Role</h3>
                    <p className="text-sm text-gray-500">
                      Set default role for new registrations
                    </p>
                  </div>
                  <Select defaultValue="user">
                    <SelectTrigger className="w-[180px]">
                      <SelectValue placeholder="Select role" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="user">User</SelectItem>
                      <SelectItem value="librarian">Librarian</SelectItem>
                      <SelectItem value="admin">Admin</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </CardContent>
              <CardFooter>
                <Button className="bg-pink-600 hover:bg-pink-700">
                  <Save className="mr-2 h-4 w-4" />
                  Save Changes
                </Button>
              </CardFooter>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-pink-600">
                  Account Policies
                </CardTitle>
                <CardDescription>
                  Set account management policies
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-medium">Account Inactivity Timeout</h3>
                    <p className="text-sm text-gray-500">
                      Disable inactive accounts after period
                    </p>
                  </div>
                  <Switch defaultChecked={false} />
                </div>
                <div className="space-y-2">
                  <h3 className="font-medium">Inactivity Period (days)</h3>
                  <Input type="number" defaultValue="90" />
                </div>
                <Separator />
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-medium">
                      Profile Picture Requirements
                    </h3>
                    <p className="text-sm text-gray-500">
                      Require profile pictures for accounts
                    </p>
                  </div>
                  <Switch defaultChecked={false} />
                </div>
              </CardContent>
              <CardFooter>
                <Button className="bg-pink-600 hover:bg-pink-700">
                  <Save className="mr-2 h-4 w-4" />
                  Save Changes
                </Button>
              </CardFooter>
            </Card>
          </TabsContent>

          {/* Content Settings */}
          <TabsContent value="content" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-pink-600">
                  Thesis Document Settings
                </CardTitle>
                <CardDescription>
                  Configure thesis document handling and display
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-medium">Maximum File Size (MB)</h3>
                    <p className="text-sm text-gray-500">
                      Set maximum upload size for thesis documents
                    </p>
                  </div>
                  <Input type="number" defaultValue="50" className="w-24" />
                </div>
                <Separator />
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-medium">Allowed File Types</h3>
                    <p className="text-sm text-gray-500">
                      File formats allowed for upload
                    </p>
                  </div>
                  <Input defaultValue="pdf,docx" className="w-40" />
                </div>
                <Separator />
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-medium">Enable Watermarking</h3>
                    <p className="text-sm text-gray-500">
                      Add NEU watermark to viewed documents
                    </p>
                  </div>
                  <Switch defaultChecked={true} />
                </div>
                <Separator />
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-medium">Content Moderation</h3>
                    <p className="text-sm text-gray-500">
                      Require approval for new uploads
                    </p>
                  </div>
                  <Switch defaultChecked={true} />
                </div>
              </CardContent>
              <CardFooter>
                <Button className="bg-pink-600 hover:bg-pink-700">
                  <Save className="mr-2 h-4 w-4" />
                  Save Changes
                </Button>
              </CardFooter>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-pink-600">
                  Metadata Requirements
                </CardTitle>
                <CardDescription>
                  Configure required metadata for thesis documents
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="flex items-center justify-between p-3 border rounded-md">
                    <span>Title</span>
                    <Switch defaultChecked={true} />
                  </div>
                  <div className="flex items-center justify-between p-3 border rounded-md">
                    <span>Author</span>
                    <Switch defaultChecked={true} />
                  </div>
                  <div className="flex items-center justify-between p-3 border rounded-md">
                    <span>Publication Date</span>
                    <Switch defaultChecked={true} />
                  </div>
                  <div className="flex items-center justify-between p-3 border rounded-md">
                    <span>Abstract</span>
                    <Switch defaultChecked={true} />
                  </div>
                  <div className="flex items-center justify-between p-3 border rounded-md">
                    <span>Keywords</span>
                    <Switch defaultChecked={true} />
                  </div>
                  <div className="flex items-center justify-between p-3 border rounded-md">
                    <span>Department</span>
                    <Switch defaultChecked={true} />
                  </div>
                  <div className="flex items-center justify-between p-3 border rounded-md">
                    <span>Advisor</span>
                    <Switch defaultChecked={false} />
                  </div>
                  <div className="flex items-center justify-between p-3 border rounded-md">
                    <span>Co-Authors</span>
                    <Switch defaultChecked={false} />
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button className="bg-pink-600 hover:bg-pink-700">
                  <Save className="mr-2 h-4 w-4" />
                  Save Changes
                </Button>
              </CardFooter>
            </Card>
          </TabsContent>

          {/* System Settings */}
          <TabsContent value="system" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-pink-600">
                  System Performance
                </CardTitle>
                <CardDescription>
                  Configure system performance settings
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-medium">Enable Caching</h3>
                    <p className="text-sm text-gray-500">
                      Cache frequently accessed content
                    </p>
                  </div>
                  <Switch defaultChecked={true} />
                </div>
                <div className="space-y-2">
                  <h3 className="font-medium">Cache Expiration (minutes)</h3>
                  <Input type="number" defaultValue="60" />
                </div>
                <Separator />
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-medium">Maintenance Mode</h3>
                    <p className="text-sm text-gray-500">
                      Put system in maintenance mode
                    </p>
                  </div>
                  <Switch defaultChecked={false} />
                </div>
              </CardContent>
              <CardFooter>
                <Button className="bg-pink-600 hover:bg-pink-700">
                  <Save className="mr-2 h-4 w-4" />
                  Save Changes
                </Button>
              </CardFooter>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-pink-600">
                  AI Chatbot Configuration
                </CardTitle>
                <CardDescription>
                  Configure the AI assistant settings
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-medium">Enable AI Chatbot</h3>
                    <p className="text-sm text-gray-500">
                      Show AI assistant to users
                    </p>
                  </div>
                  <Switch defaultChecked={true} />
                </div>
                <Separator />
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-medium">Chatbot Model</h3>
                    <p className="text-sm text-gray-500">
                      Select AI model to use
                    </p>
                  </div>
                  <Select defaultValue="gpt-4">
                    <SelectTrigger className="w-[180px]">
                      <SelectValue placeholder="Select model" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="gpt-3.5">GPT-3.5</SelectItem>
                      <SelectItem value="gpt-4">GPT-4</SelectItem>
                      <SelectItem value="custom">Custom Model</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <Separator />
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-medium">Allow Document Opening</h3>
                    <p className="text-sm text-gray-500">
                      Let chatbot open documents directly
                    </p>
                  </div>
                  <Switch defaultChecked={true} />
                </div>
                <div className="space-y-2">
                  <h3 className="font-medium">Welcome Message</h3>
                  <Input defaultValue="Welcome to NEU Thesis Viewer! How can I help you today?" />
                </div>
              </CardContent>
              <CardFooter>
                <Button className="bg-pink-600 hover:bg-pink-700">
                  <Save className="mr-2 h-4 w-4" />
                  Save Changes
                </Button>
              </CardFooter>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-pink-600">
                  Backup & Restore
                </CardTitle>
                <CardDescription>
                  Configure system backup settings
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-medium">Automatic Backups</h3>
                    <p className="text-sm text-gray-500">
                      Schedule regular system backups
                    </p>
                  </div>
                  <Switch defaultChecked={true} />
                </div>
                <div className="space-y-2">
                  <h3 className="font-medium">Backup Frequency</h3>
                  <Select defaultValue="daily">
                    <SelectTrigger>
                      <SelectValue placeholder="Select frequency" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="hourly">Hourly</SelectItem>
                      <SelectItem value="daily">Daily</SelectItem>
                      <SelectItem value="weekly">Weekly</SelectItem>
                      <SelectItem value="monthly">Monthly</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <h3 className="font-medium">Backup Retention (days)</h3>
                  <Input type="number" defaultValue="30" />
                </div>
                <div className="pt-4 flex gap-4">
                  <Button className="bg-pink-600 hover:bg-pink-700">
                    <Database className="mr-2 h-4 w-4" />
                    Backup Now
                  </Button>
                  <Button variant="outline">Restore from Backup</Button>
                </div>
              </CardContent>
              <CardFooter>
                <Button className="bg-pink-600 hover:bg-pink-700">
                  <Save className="mr-2 h-4 w-4" />
                  Save Changes
                </Button>
              </CardFooter>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default SystemConfiguration;
