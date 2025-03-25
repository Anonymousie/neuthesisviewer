import React, { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  BarChart,
  LineChart,
  PieChart,
  Activity,
  Users,
  FileText,
  Eye,
  Download,
  Clock,
} from "lucide-react";

interface AnalyticsCardProps {
  title: string;
  value: string;
  description: string;
  icon: React.ReactNode;
  className?: string;
}

const AnalyticsCard = ({
  title,
  value,
  description,
  icon,
  className = "",
}: AnalyticsCardProps) => (
  <Card className={`bg-white ${className}`}>
    <CardHeader className="flex flex-row items-center justify-between pb-2">
      <CardTitle className="text-sm font-medium text-gray-500">
        {title}
      </CardTitle>
      <div className="p-2 bg-pink-100 rounded-full">{icon}</div>
    </CardHeader>
    <CardContent>
      <div className="text-2xl font-bold">{value}</div>
      <CardDescription>{description}</CardDescription>
    </CardContent>
  </Card>
);

interface ChartContainerProps {
  title: string;
  children: React.ReactNode;
}

const ChartContainer = ({ title, children }: ChartContainerProps) => (
  <Card className="bg-white">
    <CardHeader>
      <CardTitle>{title}</CardTitle>
    </CardHeader>
    <CardContent>{children}</CardContent>
  </Card>
);

const AnalyticsDashboard = () => {
  const [timeRange, setTimeRange] = useState<string>("7d");

  // Mock data for charts - in a real app, this would come from an API
  const mockBarChartData = (
    <div className="h-80 w-full flex items-center justify-center flex-col">
      <BarChart className="h-40 w-40 text-pink-300" />
      <p className="text-muted-foreground mt-4">Thesis views by category</p>
    </div>
  );

  const mockLineChartData = (
    <div className="h-80 w-full flex items-center justify-center flex-col">
      <LineChart className="h-40 w-40 text-pink-300" />
      <p className="text-muted-foreground mt-4">User activity over time</p>
    </div>
  );

  const mockPieChartData = (
    <div className="h-80 w-full flex items-center justify-center flex-col">
      <PieChart className="h-40 w-40 text-pink-300" />
      <p className="text-muted-foreground mt-4">User role distribution</p>
    </div>
  );

  // Mock data for recent activity
  const recentActivities = [
    {
      id: 1,
      user: "John Doe",
      action: "Downloaded thesis",
      thesis: "Machine Learning Applications",
      time: "2 hours ago",
    },
    {
      id: 2,
      user: "Jane Smith",
      action: "Viewed thesis",
      thesis: "Quantum Computing Fundamentals",
      time: "3 hours ago",
    },
    {
      id: 3,
      user: "Robert Johnson",
      action: "Uploaded thesis",
      thesis: "Blockchain Technology",
      time: "5 hours ago",
    },
    {
      id: 4,
      user: "Emily Davis",
      action: "Commented on thesis",
      thesis: "Artificial Intelligence Ethics",
      time: "6 hours ago",
    },
    {
      id: 5,
      user: "Michael Brown",
      action: "Bookmarked thesis",
      thesis: "Neural Networks",
      time: "8 hours ago",
    },
  ];

  return (
    <div className="p-6 bg-pink-50 min-h-screen">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-pink-800">
          Analytics Dashboard
        </h1>
        <div className="flex items-center space-x-2">
          <Select value={timeRange} onValueChange={setTimeRange}>
            <SelectTrigger className="w-[180px] bg-white">
              <SelectValue placeholder="Select time range" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="24h">Last 24 hours</SelectItem>
              <SelectItem value="7d">Last 7 days</SelectItem>
              <SelectItem value="30d">Last 30 days</SelectItem>
              <SelectItem value="90d">Last 90 days</SelectItem>
              <SelectItem value="1y">Last year</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <AnalyticsCard
          title="Total Theses"
          value="1,248"
          description="+12% from last month"
          icon={<FileText className="h-4 w-4 text-pink-500" />}
        />
        <AnalyticsCard
          title="Active Users"
          value="3,427"
          description="+8% from last month"
          icon={<Users className="h-4 w-4 text-pink-500" />}
        />
        <AnalyticsCard
          title="Total Views"
          value="28.3k"
          description="+24% from last month"
          icon={<Eye className="h-4 w-4 text-pink-500" />}
        />
        <AnalyticsCard
          title="Downloads"
          value="4,271"
          description="+18% from last month"
          icon={<Download className="h-4 w-4 text-pink-500" />}
        />
      </div>

      <div className="mb-6">
        <Tabs defaultValue="overview" className="w-full">
          <TabsList className="bg-white">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="users">Users</TabsTrigger>
            <TabsTrigger value="content">Content</TabsTrigger>
            <TabsTrigger value="access">Access Logs</TabsTrigger>
          </TabsList>
          <TabsContent value="overview" className="space-y-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              <ChartContainer title="Thesis Views Trend">
                {mockLineChartData}
              </ChartContainer>
              <ChartContainer title="User Activity">
                {mockBarChartData}
              </ChartContainer>
            </div>
          </TabsContent>
          <TabsContent value="users" className="space-y-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              <ChartContainer title="User Role Distribution">
                {mockPieChartData}
              </ChartContainer>
              <ChartContainer title="User Growth">
                {mockLineChartData}
              </ChartContainer>
            </div>
          </TabsContent>
          <TabsContent value="content" className="space-y-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              <ChartContainer title="Popular Categories">
                {mockBarChartData}
              </ChartContainer>
              <ChartContainer title="Content Growth">
                {mockLineChartData}
              </ChartContainer>
            </div>
          </TabsContent>
          <TabsContent value="access" className="space-y-4">
            <Card className="bg-white">
              <CardHeader>
                <CardTitle>Recent Activity</CardTitle>
                <CardDescription>
                  Latest user interactions with the system
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentActivities.map((activity) => (
                    <div
                      key={activity.id}
                      className="flex items-start space-x-4 border-b border-gray-100 pb-4"
                    >
                      <div className="p-2 bg-pink-100 rounded-full">
                        <Clock className="h-4 w-4 text-pink-500" />
                      </div>
                      <div>
                        <p className="font-medium">{activity.user}</p>
                        <p className="text-sm text-gray-500">
                          {activity.action}:{" "}
                          <span className="font-medium">{activity.thesis}</span>
                        </p>
                        <p className="text-xs text-gray-400">{activity.time}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <Card className="bg-white lg:col-span-2">
          <CardHeader>
            <CardTitle>System Performance</CardTitle>
            <CardDescription>Server load and response times</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-80 w-full flex items-center justify-center">
              <Activity className="h-40 w-40 text-pink-300" />
            </div>
          </CardContent>
        </Card>
        <Card className="bg-white">
          <CardHeader>
            <CardTitle>Top Theses</CardTitle>
            <CardDescription>Most viewed documents</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                { title: "Machine Learning Applications", views: "1,245" },
                { title: "Quantum Computing Fundamentals", views: "982" },
                { title: "Blockchain Technology", views: "879" },
                { title: "Artificial Intelligence Ethics", views: "754" },
                { title: "Neural Networks", views: "621" },
              ].map((thesis, index) => (
                <div key={index} className="flex justify-between items-center">
                  <p className="font-medium truncate">{thesis.title}</p>
                  <p className="text-sm text-gray-500">{thesis.views} views</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AnalyticsDashboard;
