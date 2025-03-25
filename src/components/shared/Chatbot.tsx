import React, { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Send,
  Bot,
  ChevronDown,
  ChevronUp,
  X,
  ExternalLink,
} from "lucide-react";

interface Message {
  id: string;
  content: string;
  sender: "user" | "bot";
  timestamp: Date;
  thesisLink?: string;
  thesisTitle?: string;
}

interface ChatbotProps {
  isOpen?: boolean;
  onToggle?: () => void;
  onThesisOpen?: (thesisId: string) => void;
  userName?: string;
}

const Chatbot = ({
  isOpen = true,
  onToggle = () => {},
  onThesisOpen = () => {},
  userName = "Guest",
}: ChatbotProps) => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      content:
        "Hello! I'm your NEU Thesis Viewer assistant. How can I help you today?",
      sender: "bot",
      timestamp: new Date(),
    },
  ]);
  const [inputValue, setInputValue] = useState("");
  const [minimized, setMinimized] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Sample thesis data for demonstration
  const sampleTheses = [
    { id: "thesis-1", title: "Machine Learning Applications in Healthcare" },
    { id: "thesis-2", title: "Sustainable Architecture in Urban Environments" },
    {
      id: "thesis-3",
      title: "Quantum Computing: Challenges and Opportunities",
    },
  ];

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const handleSendMessage = () => {
    if (inputValue.trim() === "") return;

    // Add user message
    const userMessage: Message = {
      id: Date.now().toString(),
      content: inputValue,
      sender: "user",
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputValue("");

    // Simulate bot response after a short delay
    setTimeout(() => {
      let botResponse: Message;

      // Simple keyword matching for demonstration
      const lowercaseInput = inputValue.toLowerCase();

      if (
        lowercaseInput.includes("thesis") &&
        lowercaseInput.includes("recommend")
      ) {
        // Recommendation response
        const randomThesis =
          sampleTheses[Math.floor(Math.random() * sampleTheses.length)];
        botResponse = {
          id: Date.now().toString(),
          content: `I recommend checking out "${randomThesis.title}". Would you like to open it?`,
          sender: "bot",
          timestamp: new Date(),
          thesisLink: randomThesis.id,
          thesisTitle: randomThesis.title,
        };
      } else if (
        lowercaseInput.includes("help") ||
        lowercaseInput.includes("how to")
      ) {
        // Help response
        botResponse = {
          id: Date.now().toString(),
          content:
            "You can browse theses in the repository, search by keywords, or ask me for recommendations. What would you like to do?",
          sender: "bot",
          timestamp: new Date(),
        };
      } else if (
        lowercaseInput.includes("hello") ||
        lowercaseInput.includes("hi")
      ) {
        // Greeting response
        botResponse = {
          id: Date.now().toString(),
          content: `Hello ${userName}! How can I assist you with the NEU Thesis Viewer today?`,
          sender: "bot",
          timestamp: new Date(),
        };
      } else {
        // Default response
        botResponse = {
          id: Date.now().toString(),
          content:
            "I'm here to help you navigate the thesis repository. You can ask me for recommendations, search help, or information about specific topics.",
          sender: "bot",
          timestamp: new Date(),
        };
      }

      setMessages((prev) => [...prev, botResponse]);
    }, 1000);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleSendMessage();
    }
  };

  const handleOpenThesis = (thesisId: string, thesisTitle: string) => {
    onThesisOpen(thesisId);

    // Add a confirmation message
    const confirmationMessage: Message = {
      id: Date.now().toString(),
      content: `Opening "${thesisTitle}" for you.`,
      sender: "bot",
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, confirmationMessage]);
  };

  const toggleMinimize = () => {
    setMinimized(!minimized);
  };

  return (
    <div
      className="fixed bottom-4 right-4 z-50 flex flex-col bg-white rounded-lg shadow-lg border border-pink-200 w-80 md:w-96 transition-all duration-300 ease-in-out"
      style={{ height: minimized ? "60px" : "500px", maxHeight: "80vh" }}
    >
      {/* Chatbot Header */}
      <div
        className="flex items-center justify-between p-3 bg-pink-500 text-white rounded-t-lg cursor-pointer"
        onClick={toggleMinimize}
      >
        <div className="flex items-center space-x-2">
          <Bot size={20} />
          <h3 className="font-medium">NEU Thesis Assistant</h3>
        </div>
        <div className="flex items-center space-x-1">
          {minimized ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
          <X
            size={18}
            onClick={(e) => {
              e.stopPropagation();
              onToggle();
            }}
            className="ml-2 hover:bg-pink-600 rounded-full p-1"
          />
        </div>
      </div>

      {/* Chat Messages */}
      {!minimized && (
        <>
          <ScrollArea className="flex-1 p-4 overflow-y-auto bg-pink-50">
            <div className="space-y-4">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex ${message.sender === "user" ? "justify-end" : "justify-start"}`}
                >
                  <div
                    className={`max-w-[80%] rounded-lg p-3 ${message.sender === "user" ? "bg-pink-500 text-white" : "bg-white border border-pink-200"}`}
                  >
                    {message.sender === "bot" && (
                      <div className="flex items-center mb-1">
                        <Avatar className="h-6 w-6 mr-2">
                          <AvatarImage
                            src="https://api.dicebear.com/7.x/avataaars/svg?seed=bot"
                            alt="Bot"
                          />
                          <AvatarFallback>Bot</AvatarFallback>
                        </Avatar>
                        <span className="text-xs font-semibold text-pink-500">
                          Assistant
                        </span>
                      </div>
                    )}
                    <p className="text-sm">{message.content}</p>
                    {message.thesisLink && (
                      <Button
                        variant="outline"
                        size="sm"
                        className="mt-2 text-xs bg-pink-100 hover:bg-pink-200 border-pink-300 text-pink-700 flex items-center"
                        onClick={() =>
                          handleOpenThesis(
                            message.thesisLink!,
                            message.thesisTitle!,
                          )
                        }
                      >
                        <ExternalLink size={12} className="mr-1" />
                        Open Thesis
                      </Button>
                    )}
                    <div className="text-right mt-1">
                      <span className="text-xs opacity-70">
                        {message.timestamp.toLocaleTimeString([], {
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
              <div ref={messagesEndRef} />
            </div>
          </ScrollArea>

          {/* Input Area */}
          <div className="p-3 border-t border-pink-100 bg-white rounded-b-lg">
            <div className="flex items-center space-x-2">
              <Input
                type="text"
                placeholder="Type your message..."
                value={inputValue}
                onChange={handleInputChange}
                onKeyPress={handleKeyPress}
                className="flex-1 border-pink-200 focus:border-pink-400 focus:ring-pink-400"
              />
              <Button
                onClick={handleSendMessage}
                size="icon"
                className="bg-pink-500 hover:bg-pink-600 text-white"
              >
                <Send size={16} />
              </Button>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Chatbot;
