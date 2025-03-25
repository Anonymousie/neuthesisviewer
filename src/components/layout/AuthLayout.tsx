import React from "react";
import { cn } from "@/lib/utils";

interface AuthLayoutProps {
  children?: React.ReactNode;
  title?: string;
  subtitle?: string;
  backgroundImage?: string;
}

const AuthLayout = ({
  children,
  title = "NEU Thesis Viewer",
  subtitle = "Access academic excellence through our digital repository",
  backgroundImage = "https://images.unsplash.com/photo-1579546929518-9e396f3cc809?w=1200&q=80",
}: AuthLayoutProps) => {
  return (
    <div className="flex min-h-screen w-full bg-white">
      {/* Left side - Branding and decorative elements */}
      <div className="hidden md:flex md:w-1/2 bg-gradient-to-br from-pink-400 to-pink-600 flex-col justify-between p-10 text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <img
            src={backgroundImage}
            alt="Background pattern"
            className="w-full h-full object-cover"
          />
        </div>

        <div className="relative z-10">
          <div className="flex items-center space-x-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="32"
              height="32"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="lucide lucide-book-open"
            >
              <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" />
              <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" />
            </svg>
            <span className="font-bold text-xl">NEU</span>
          </div>
        </div>

        <div className="relative z-10 space-y-6">
          <h1 className="text-4xl font-bold">{title}</h1>
          <p className="text-lg opacity-90">{subtitle}</p>
          <div className="pt-4">
            <div className="flex space-x-2 items-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="lucide lucide-check-circle"
              >
                <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                <polyline points="22 4 12 14.01 9 11.01" />
              </svg>
              <span>Access thousands of academic theses</span>
            </div>
            <div className="flex space-x-2 items-center mt-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="lucide lucide-check-circle"
              >
                <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                <polyline points="22 4 12 14.01 9 11.01" />
              </svg>
              <span>AI-powered research assistant</span>
            </div>
            <div className="flex space-x-2 items-center mt-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="lucide lucide-check-circle"
              >
                <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                <polyline points="22 4 12 14.01 9 11.01" />
              </svg>
              <span>Seamless reading experience</span>
            </div>
          </div>
        </div>

        <div className="relative z-10">
          <p className="text-sm opacity-70">
            &copy; {new Date().getFullYear()} Northeastern University. All
            rights reserved.
          </p>
        </div>

        {/* Decorative elements */}
        <div className="absolute -bottom-16 -left-16 w-64 h-64 rounded-full bg-pink-300 opacity-30"></div>
        <div className="absolute top-1/4 right-0 w-32 h-32 rounded-full bg-pink-300 opacity-30"></div>
      </div>

      {/* Right side - Authentication form */}
      <div className="w-full md:w-1/2 flex items-center justify-center p-8">
        <div className="w-full max-w-md">
          <div className="md:hidden mb-8 text-center">
            <div className="flex items-center justify-center space-x-2 mb-4">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="32"
                height="32"
                viewBox="0 0 24 24"
                fill="none"
                stroke="#d53f8c"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="lucide lucide-book-open"
              >
                <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" />
                <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" />
              </svg>
              <span className="font-bold text-xl text-pink-600">NEU</span>
            </div>
            <h1 className="text-2xl font-bold text-gray-900">{title}</h1>
            <p className="text-gray-600 mt-1">{subtitle}</p>
          </div>

          {children}
        </div>
      </div>
    </div>
  );
};

export default AuthLayout;
