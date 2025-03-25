import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Book, Bell, Search, LogOut, User, UserCircle2 } from "lucide-react";
import { Button } from "../ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Badge } from "../ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import ThesisGrid from "./ThesisGrid";
import Chatbot from "../shared/Chatbot";

interface UserDashboardProps {
  userName?: string;
  userAvatar?: string;
  notifications?: number;
}

const UserDashboard = ({
  userName = "John Doe",
  userAvatar = "https://api.dicebear.com/7.x/avataaars/svg?seed=user123",
  notifications = 3,
}: UserDashboardProps) => {
  // State to control whether the user is logged in
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();
  const [isChatbotOpen, setIsChatbotOpen] = useState(true);
  const [selectedThesis, setSelectedThesis] = useState<any>(null);

  const handleThesisSelect = (thesis: any) => {
    setSelectedThesis(thesis);
    // Open the thesis in a new tab if it has a URL
    if (thesis.pdfUrl) {
      window.open(thesis.pdfUrl, "_blank");
    } else {
      console.log("Selected thesis:", thesis);
    }
  };

  const handleThesisOpenFromChatbot = (thesisId: string) => {
    // In a real implementation, this would fetch the thesis details and navigate
    console.log("Opening thesis from chatbot:", thesisId);
    // navigate(`/thesis/${thesisId}`);
  };

  const toggleChatbot = () => {
    setIsChatbotOpen(!isChatbotOpen);
  };

  // If not logged in, show login button
  if (!isLoggedIn) {
    return (
      <div className="min-h-screen bg-pink-50 flex flex-col items-center justify-center">
        <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full text-center">
          <div className="flex justify-center mb-6">
            <Book className="h-16 w-16 text-pink-500" />
          </div>
          <h1 className="text-2xl font-bold text-pink-700 mb-2">
            NEU Thesis Viewer
          </h1>
          <p className="text-gray-600 mb-6">
            Access academic excellence through our digital repository
          </p>
          <Button
            onClick={() => setIsLoggedIn(true)}
            className="w-full bg-pink-600 hover:bg-pink-700 text-white"
          >
            <UserCircle2 className="mr-2 h-4 w-4" />
            Enter as User
          </Button>
          <div className="mt-4 flex gap-2">
            <Button
              onClick={() => navigate("/dashboard/librarian")}
              variant="outline"
              className="flex-1 border-pink-200 text-pink-700 hover:bg-pink-50"
            >
              Librarian
            </Button>
            <Button
              onClick={() => navigate("/dashboard/admin")}
              variant="outline"
              className="flex-1 border-pink-200 text-pink-700 hover:bg-pink-50"
            >
              Admin
            </Button>
            <Button
              onClick={() => navigate("/dashboard/superadmin")}
              variant="outline"
              className="flex-1 border-pink-200 text-pink-700 hover:bg-pink-50"
            >
              Super Admin
            </Button>
          </div>
        </div>
      </div>
    );
  }

  // If logged in, show dashboard
  return (
    <div className="min-h-screen bg-pink-50 flex flex-col">
      {/* Header */}
      <header className="bg-white border-b border-pink-100 sticky top-0 z-10">
        <div className="container mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Book className="h-6 w-6 text-pink-500" />
            <h1 className="text-xl font-bold text-pink-700">
              NEU Thesis Viewer
            </h1>
          </div>

          <div className="flex items-center space-x-4">
            <Button
              variant="outline"
              size="icon"
              className="relative border-pink-200 text-pink-700 hover:bg-pink-50"
              onClick={toggleChatbot}
            >
              <Bell className="h-5 w-5" />
              {notifications > 0 && (
                <Badge className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 bg-pink-500 text-white">
                  {notifications}
                </Badge>
              )}
            </Button>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  className="relative h-10 w-10 rounded-full"
                >
                  <Avatar className="h-10 w-10 border border-pink-200">
                    <AvatarImage src={userAvatar} alt={userName} />
                    <AvatarFallback className="bg-pink-100 text-pink-700">
                      {userName
                        .split(" ")
                        .map((n) => n[0])
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
                      User
                    </p>
                  </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                  <User className="mr-2 h-4 w-4" />
                  <span>Profile</span>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Bell className="mr-2 h-4 w-4" />
                  <span>Notifications</span>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem
                  onClick={() => {
                    setIsLoggedIn(false);
                    navigate("/");
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
      <main className="flex-1 container mx-auto px-4 py-6">
        <div className="mb-6">
          <h2 className="text-2xl font-bold text-gray-800">
            Welcome, {userName}
          </h2>
          <p className="text-gray-600">
            Browse through our collection of academic theses
          </p>
        </div>

        {/* Featured Section */}
        <div className="mb-8 bg-gradient-to-r from-pink-100 to-pink-200 rounded-lg p-6 shadow-sm">
          <h3 className="text-xl font-semibold text-pink-800 mb-2">
            Featured Collection
          </h3>
          <p className="text-pink-700 mb-4">
            Explore our latest and most popular academic works
          </p>
          <Button className="bg-pink-500 hover:bg-pink-600 text-white">
            Explore Featured
          </Button>
        </div>

        {/* Thesis Grid */}
        <div className="mb-6">
          <h3 className="text-xl font-semibold text-gray-800 mb-4">
            Browse Theses
          </h3>
          <ThesisGrid onThesisSelect={handleThesisSelect} />
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-pink-100 py-4">
        <div className="container mx-auto px-4 text-center text-gray-600 text-sm">
          <p>
            © {new Date().getFullYear()} NEU Thesis Viewer. All rights
            reserved.
          </p>
        </div>
      </footer>

      {/* Chatbot */}
      {isChatbotOpen && (
        <Chatbot
          isOpen={isChatbotOpen}
          onToggle={toggleChatbot}
          onThesisOpen={handleThesisOpenFromChatbot}
          userName={userName}
        />
      )}
    </div>
  );
};

export default UserDashboard;
