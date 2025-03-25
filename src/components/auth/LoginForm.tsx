import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Eye, EyeOff, Lock, Mail } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

interface LoginFormProps {
  onLogin?: (email: string, password: string) => void;
  isLoading?: boolean;
  error?: string | null;
}

const LoginForm = ({
  onLogin = () => {},
  isLoading = false,
  error = null,
}: LoginFormProps) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onLogin(email, password);
    // For demo purposes, navigate to user dashboard
    navigate("/dashboard/user");
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <Card className="w-full max-w-md bg-white border-pink-200 shadow-lg">
      <CardHeader className="space-y-2 text-center">
        <div className="flex justify-center mb-2">
          <img
            src="https://api.dicebear.com/7.x/avataaars/svg?seed=neu-thesis"
            alt="NEU Logo"
            className="h-16 w-16 rounded-full bg-pink-100 p-2"
          />
        </div>
        <CardTitle className="text-2xl font-bold text-pink-700">
          NEU Thesis Viewer
        </CardTitle>
        <CardDescription className="text-gray-500">
          Sign in to access academic resources
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="email" className="text-gray-700">
              Email
            </Label>
            <div className="relative">
              <Mail className="absolute left-3 top-2.5 h-4 w-4 text-pink-500" />
              <Input
                id="email"
                type="email"
                placeholder="your.email@example.com"
                className="pl-10 border-pink-200 focus:border-pink-500 focus:ring-pink-500"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
          </div>
          <div className="space-y-2">
            <div className="flex justify-between">
              <Label htmlFor="password" className="text-gray-700">
                Password
              </Label>
              <a href="#" className="text-xs text-pink-600 hover:text-pink-800">
                Forgot password?
              </a>
            </div>
            <div className="relative">
              <Lock className="absolute left-3 top-2.5 h-4 w-4 text-pink-500" />
              <Input
                id="password"
                type={showPassword ? "text" : "password"}
                placeholder="••••••••"
                className="pl-10 border-pink-200 focus:border-pink-500 focus:ring-pink-500"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <button
                type="button"
                onClick={togglePasswordVisibility}
                className="absolute right-3 top-2.5 text-gray-400 hover:text-gray-600"
              >
                {showPassword ? (
                  <EyeOff className="h-4 w-4" />
                ) : (
                  <Eye className="h-4 w-4" />
                )}
              </button>
            </div>
          </div>
          {error && <p className="text-sm text-red-500">{error}</p>}
          <Button
            type="submit"
            className="w-full bg-pink-600 hover:bg-pink-700 text-white"
            disabled={isLoading}
          >
            {isLoading ? "Signing in..." : "Sign in"}
          </Button>
        </form>
      </CardContent>
      <CardFooter className="flex flex-col space-y-4 text-center text-sm">
        <div className="text-gray-500">
          Don't have an account?{" "}
          <a href="#" className="text-pink-600 hover:text-pink-800 font-medium">
            Contact your administrator
          </a>
        </div>
        <div className="text-xs text-gray-400">
          By signing in, you agree to our Terms of Service and Privacy Policy
        </div>
      </CardFooter>
    </Card>
  );
};

export default LoginForm;
