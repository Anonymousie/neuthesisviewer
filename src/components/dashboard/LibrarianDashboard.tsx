import React, { useState } from "react";
import {
  Library,
  Upload,
  BookOpen,
  Search,
  Settings,
  User,
  LogOut,
} from "lucide-react";
import { Button } from "../ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import ThesisGrid from "./ThesisGrid";
import ThesisUploader from "../thesis/ThesisUploader";
import Chatbot from "../shared/Chatbot";

interface LibrarianDashboardProps {
  userName?: string;
  userAvatar?: string;
  onLogout?: () => void;
}

const LibrarianDashboard = ({
  userName = "Sarah Johnson",
  userAvatar = "https://api.dicebear.com/7.x/avataaars/svg?seed=librarian",
  onLogout = () => console.log("Logout clicked"),
}: LibrarianDashboardProps) => {
  const [activeTab, setActiveTab] = useState("browse");
  const [showChatbot, setShowChatbot] = useState(true);
  const [selectedThesis, setSelectedThesis] = useState<any>(null);

  const handleThesisSelect = (thesis: any) => {
    setSelectedThesis(thesis);
    console.log("Selected thesis:", thesis);
    // In a real implementation, this would navigate to the PDF viewer
  };

  const handleUploadSuccess = () => {
    setActiveTab("browse");
    // In a real implementation, this would refresh the thesis list
  };

  return (
    <div className="min-h-screen bg-pink-50">
      {/* Header */}
      <header className="bg-white border-b border-pink-100 sticky top-0 z-10">
        <div className="container mx-auto px-4 py-3 flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <Library className="h-6 w-6 text-pink-600" />
            <h1 className="text-xl font-bold text-pink-700">
              NEU Thesis Viewer
            </h1>
          </div>

          <div className="flex items-center space-x-4">
            <Button
              variant="outline"
              size="sm"
              className="text-pink-600 border-pink-200 hover:bg-pink-50"
              onClick={() => setShowChatbot(!showChatbot)}
            >
              <span className="mr-2">Assistant</span>
            </Button>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  className="relative h-8 w-8 rounded-full"
                >
                  <Avatar className="h-8 w-8">
                    <AvatarImage src={userAvatar} alt={userName} />
                    <AvatarFallback className="bg-pink-200 text-pink-700">
                      {userName
                        .split(" ")
                        .map((name) => name[0])
                        .join("")}
                    </AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56" align="end" forceMount>
                <DropdownMenuLabel className="font-normal">
                  <div className="flex flex-col space-y-1">
                    <p className="text-sm font-medium leading-none">
                      {userName}
                    </p>
                    <p className="text-xs leading-none text-muted-foreground">
                      Librarian
                    </p>
                  </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                  <User className="mr-2 h-4 w-4" />
                  <span>Profile</span>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Settings className="mr-2 h-4 w-4" />
                  <span>Settings</span>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem
                  onClick={() => {
                    onLogout();
                    window.location.href = "/";
                  }}
                >
                  <LogOut className="mr-2 h-4 w-4" />
                  <span>Log out</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-6">
        <div className="flex flex-col md:flex-row gap-6">
          {/* Sidebar */}
          <aside className="w-full md:w-64 shrink-0">
            <Card className="bg-white border-pink-100">
              <CardHeader className="pb-3">
                <CardTitle className="text-lg font-medium text-pink-700">
                  Librarian Dashboard
                </CardTitle>
                <CardDescription>Manage thesis documents</CardDescription>
              </CardHeader>
              <CardContent className="grid gap-1">
                <Button
                  variant={activeTab === "browse" ? "default" : "ghost"}
                  className={
                    activeTab === "browse"
                      ? "bg-pink-600 hover:bg-pink-700"
                      : "hover:bg-pink-50 text-pink-700"
                  }
                  onClick={() => setActiveTab("browse")}
                >
                  <BookOpen className="mr-2 h-4 w-4" />
                  Browse Theses
                </Button>
                <Button
                  variant={activeTab === "upload" ? "default" : "ghost"}
                  className={
                    activeTab === "upload"
                      ? "bg-pink-600 hover:bg-pink-700"
                      : "hover:bg-pink-50 text-pink-700"
                  }
                  onClick={() => setActiveTab("upload")}
                >
                  <Upload className="mr-2 h-4 w-4" />
                  Upload New Thesis
                </Button>
                <Button
                  variant={activeTab === "search" ? "default" : "ghost"}
                  className={
                    activeTab === "search"
                      ? "bg-pink-600 hover:bg-pink-700"
                      : "hover:bg-pink-50 text-pink-700"
                  }
                  onClick={() => setActiveTab("search")}
                >
                  <Search className="mr-2 h-4 w-4" />
                  Advanced Search
                </Button>
              </CardContent>
            </Card>

            {/* Stats Card */}
            <Card className="bg-white border-pink-100 mt-4">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-pink-700">
                  Repository Stats
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-500">Your Uploads</span>
                    <span className="text-sm font-medium">24</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-500">Total Theses</span>
                    <span className="text-sm font-medium">156</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-500">Categories</span>
                    <span className="text-sm font-medium">12</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </aside>

          {/* Main Content Area */}
          <div className="flex-1">
            <Tabs
              value={activeTab}
              onValueChange={setActiveTab}
              className="w-full"
            >
              <TabsList className="grid w-full grid-cols-3 bg-pink-100">
                <TabsTrigger
                  value="browse"
                  className="data-[state=active]:bg-white data-[state=active]:text-pink-700"
                >
                  Browse
                </TabsTrigger>
                <TabsTrigger
                  value="upload"
                  className="data-[state=active]:bg-white data-[state=active]:text-pink-700"
                >
                  Upload
                </TabsTrigger>
                <TabsTrigger
                  value="search"
                  className="data-[state=active]:bg-white data-[state=active]:text-pink-700"
                >
                  Search
                </TabsTrigger>
              </TabsList>
              <TabsContent value="browse" className="mt-4">
                <Card className="border-pink-100">
                  <CardHeader className="pb-3">
                    <CardTitle className="text-xl font-bold text-pink-700">
                      Thesis Repository
                    </CardTitle>
                    <CardDescription>
                      Browse and manage thesis documents
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ThesisGrid onThesisSelect={handleThesisSelect} />
                  </CardContent>
                </Card>
              </TabsContent>
              <TabsContent value="upload" className="mt-4">
                <ThesisUploader onUploadSuccess={handleUploadSuccess} />
              </TabsContent>
              <TabsContent value="search" className="mt-4">
                <Card className="border-pink-100">
                  <CardHeader>
                    <CardTitle className="text-xl font-bold text-pink-700">
                      Advanced Search
                    </CardTitle>
                    <CardDescription>
                      Search for specific thesis documents
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="p-8 text-center text-gray-500">
                      <Search className="h-12 w-12 mx-auto text-pink-300 mb-4" />
                      <h3 className="text-lg font-medium text-gray-900">
                        Advanced Search
                      </h3>
                      <p className="mt-1">This feature is coming soon.</p>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </main>

      {/* Chatbot */}
      {showChatbot && (
        <Chatbot
          isOpen={showChatbot}
          onToggle={() => setShowChatbot(!showChatbot)}
          onThesisOpen={(thesisId) => console.log("Opening thesis:", thesisId)}
          userName={userName}
        />
      )}
    </div>
  );
};

export default LibrarianDashboard;
