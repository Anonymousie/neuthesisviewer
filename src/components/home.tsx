import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import AuthLayout from "./layout/AuthLayout";
import LoginForm from "./auth/LoginForm";

const Home = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleLogin = async (email: string, password: string) => {
    setIsLoading(true);
    setError(null);

    try {
      // Simulate authentication process
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // For demo purposes, route to different dashboards based on email
      if (email.includes("user")) {
        navigate("/dashboard/user");
      } else if (email.includes("librarian")) {
        navigate("/dashboard/librarian");
      } else if (email.includes("admin")) {
        navigate("/dashboard/admin");
      } else if (email.includes("superadmin")) {
        navigate("/dashboard/superadmin");
      } else {
        // Default to user dashboard
        navigate("/dashboard/user");
      }
    } catch (err) {
      setError("Authentication failed. Please check your credentials.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-white">
      <AuthLayout
        title="NEU Thesis Viewer"
        subtitle="Discover academic excellence through our digital repository"
        backgroundImage="https://images.unsplash.com/photo-1532153975070-2e9ab71f1b14?w=1200&q=80"
      >
        <LoginForm onLogin={handleLogin} isLoading={isLoading} error={error} />
      </AuthLayout>
    </div>
  );
};

export default Home;
