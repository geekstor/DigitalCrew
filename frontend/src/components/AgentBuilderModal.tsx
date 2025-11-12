import { useState } from "react";
import { X, Upload, Mic, Send, Bot, User } from "lucide-react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { Progress } from "./ui/progress";
import { VoiceChatWindow } from "./VoiceChatWindow";
import { AgentSuggestions } from "./AgentSuggestions";
import { AgentActivityDashboard } from "./AgentActivityDashboard";

interface AgentBuilderModalProps {
  onClose: () => void;
}

interface Message {
  role: "user" | "ai";
  content: string;
}

const industries = [
  "Retail",
  "Education",
  "Consulting",
  "SaaS",
  "Healthcare",
  "Finance",
  "Manufacturing",
  "E-commerce",
  "Marketing",
  "Real Estate"
];

export function AgentBuilderModal({ onClose }: AgentBuilderModalProps) {
  const [currentStep, setCurrentStep] = useState<"chat" | "suggestions" | "dashboard">("chat");
  const [selectedIndustry, setSelectedIndustry] = useState("");
  const [uploadedFiles, setUploadedFiles] = useState<string[]>([]);
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "ai",
      content: "Hello! I'm here to help you build the perfect AI agent for your business. Let's start by understanding what you need. What are the main tasks you'd like to automate?"
    }
  ]);
  const [inputMessage, setInputMessage] = useState("");
  const [showVoiceChat, setShowVoiceChat] = useState(false);
  const progress = currentStep === "chat" ? 25 : currentStep === "suggestions" ? 75 : 100;

  const handleSendMessage = () => {
    if (!inputMessage.trim()) return;

    const userMessage: Message = {
      role: "user",
      content: inputMessage
    };

    setMessages([...messages, userMessage]);
    setInputMessage("");

    // Simulate AI response
    setTimeout(() => {
      const aiMessage: Message = {
        role: "ai",
        content: "That's a great use case! Based on your description, I recommend creating an agent with natural language processing capabilities and integration with your existing tools. Would you like me to suggest specific features for this agent?"
      };
      setMessages(prev => [...prev, aiMessage]);
    }, 1000);
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files && files.length > 0) {
      const fileNames = Array.from(files).map(file => file.name);
      setUploadedFiles([...uploadedFiles, ...fileNames]);
    }
  };

  const handleViewSuggestions = () => {
    setCurrentStep("suggestions");
  };

  const handleBackToChat = () => {
    setCurrentStep("chat");
  };

  const handleAddAgent = (agentId: string) => {
    console.log("Adding agent:", agentId);
    // Navigate to dashboard when agent is added
    setCurrentStep("dashboard");
  };

  const handlePreviewAgent = (agentId: string) => {
    console.log("Previewing agent:", agentId);
    // Handle preview agent logic here
  };

  const handleAddAllAgents = () => {
    setCurrentStep("dashboard");
  };

  const handleAddNewAgent = () => {
    setCurrentStep("chat");
  };

  return (
    <>
      <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-40 p-4">
        <div className="bg-white rounded-3xl w-full max-w-6xl h-[90vh] shadow-2xl overflow-hidden flex flex-col">
          {/* Header */}
          <div className="bg-white border-b border-[#E5E7EB] p-6 flex items-center justify-between">
            <div>
              <h2 className="text-2xl">AI Agent Builder</h2>
              <p className="text-sm text-muted-foreground font-inter mt-1">
                Configure your intelligent automation assistant
              </p>
            </div>
            <button 
              onClick={onClose}
              className="text-[#6B7280] hover:text-[#0B0D12] transition-colors"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          {/* Progress Bar */}
          {currentStep !== "dashboard" && (
            <div className="px-6 py-3 bg-[#F5F5F5] border-b border-[#E5E7EB]">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs text-muted-foreground font-inter">Setup Progress</span>
                <span className="text-xs text-muted-foreground font-inter">{progress}%</span>
              </div>
              <Progress value={progress} className="h-1.5" />
            </div>
          )}

          {/* Main Content */}
          <div className="flex flex-1 overflow-hidden">
            {currentStep === "dashboard" ? (
              <AgentActivityDashboard
                onAddNewAgent={handleAddNewAgent}
              />
            ) : currentStep === "suggestions" ? (
              <AgentSuggestions
                onBack={handleBackToChat}
                onAddAgent={handleAddAgent}
                onPreviewAgent={handlePreviewAgent}
                onAddAllAgents={handleAddAllAgents}
              />
            ) : (
              <>
                {/* Left Panel */}
                <div className="w-80 bg-[#F5F5F5] p-6 space-y-6 overflow-y-auto border-r border-[#E5E7EB]">
              <div>
                <label className="block mb-2 text-sm">Industry</label>
                <Select value={selectedIndustry} onValueChange={setSelectedIndustry}>
                  <SelectTrigger className="bg-white rounded-xl">
                    <SelectValue placeholder="Select your industry" />
                  </SelectTrigger>
                  <SelectContent>
                    {industries.map((industry) => (
                      <SelectItem key={industry} value={industry.toLowerCase()}>
                        {industry}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <div className="mb-3">
                  <p className="text-xs text-[#777] mb-1 font-inter" style={{ letterSpacing: '0.02em' }}>
                    Upload files to help the AI understand your company better.
                  </p>
                </div>
                <label className="w-full cursor-pointer">
                  <input
                    type="file"
                    multiple
                    onChange={handleFileUpload}
                    className="hidden"
                    accept=".pdf,.doc,.docx,.txt,.csv,.xlsx,.xls"
                  />
                  <div className="w-full rounded-xl border-2 border-dashed border-input hover:border-[#6ADBCD] hover:bg-white transition-colors bg-white px-4 py-2 flex items-center justify-center gap-2">
                    <Upload className="h-4 w-4" />
                    <span className="text-sm">Upload Files</span>
                  </div>
                </label>
                
                {uploadedFiles.length > 0 && (
                  <div className="mt-4 space-y-2">
                    {uploadedFiles.map((file, index) => (
                      <div 
                        key={index}
                        className="bg-white rounded-lg p-3 text-sm flex items-center gap-2"
                      >
                        <div className="w-8 h-8 rounded bg-[#6ADBCD]/10 flex items-center justify-center flex-shrink-0">
                          <Upload className="w-4 h-4 text-[#6ADBCD]" />
                        </div>
                        <span className="truncate font-inter">{file}</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              <div className="pt-4 border-t border-[#E5E7EB]">
                <h4 className="text-sm mb-3">Quick Templates</h4>
                <div className="space-y-2">
                  {["Customer Support", "Data Processing", "Email Management"].map((template) => (
                    <button
                      key={template}
                      className="w-full text-left text-sm p-3 bg-white rounded-xl hover:bg-gray-50 transition-colors"
                    >
                      {template}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Right Panel - Chat Interface */}
            <div className="flex-1 flex flex-col bg-white">
              {/* Messages */}
              <div className="flex-1 overflow-y-auto p-6 space-y-4">
                {messages.map((message, index) => (
                  <div 
                    key={index}
                    className={`flex gap-3 ${message.role === "user" ? "justify-end" : "justify-start"}`}
                  >
                    {message.role === "ai" && (
                      <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#6ADBCD] to-[#B8A2F7] flex items-center justify-center flex-shrink-0">
                        <Bot className="w-4 h-4 text-white" />
                      </div>
                    )}
                    <div 
                      className={`max-w-md rounded-2xl p-4 ${
                        message.role === "user" 
                          ? "bg-white border border-[#E5E7EB]" 
                          : "bg-[#F5F5F5] border border-[#E5E7EB]"
                      }`}
                    >
                      <p className="text-sm leading-relaxed">{message.content}</p>
                    </div>
                    {message.role === "user" && (
                      <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center flex-shrink-0">
                        <User className="w-4 h-4 text-gray-600" />
                      </div>
                    )}
                  </div>
                ))}
              </div>

              {/* Input Area */}
              <div className="border-t border-[#E5E7EB] p-6 bg-[#F5F5F5]">
                <div className="flex gap-3">
                  <Button
                    size="icon"
                    variant="outline"
                    className="rounded-full w-11 h-11 flex-shrink-0 border-2"
                    onClick={() => setShowVoiceChat(true)}
                  >
                    <Mic className="w-5 h-5" />
                  </Button>
                  <Input 
                    placeholder="Describe what you need your AI agent to do..."
                    className="flex-1 rounded-full bg-white border-2 px-6"
                    value={inputMessage}
                    onChange={(e) => setInputMessage(e.target.value)}
                    onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
                  />
                  <Button
                    size="icon"
                    className="rounded-full w-11 h-11 flex-shrink-0 bg-[#6ADBCD] hover:bg-[#4FD6C9]"
                    onClick={handleSendMessage}
                  >
                    <Send className="w-5 h-5" />
                  </Button>
                </div>
                <div className="mt-4 flex justify-end">
                  <Button
                    variant="link"
                    className="text-[#6ADBCD] hover:text-[#4FD6C9]"
                    onClick={handleViewSuggestions}
                  >
                    View Suggested Agents →
                  </Button>
                </div>
              </div>
            </div>
              </>
            )}
          </div>
        </div>
      </div>

      {/* Voice Chat Window */}
      {showVoiceChat && (
        <VoiceChatWindow onClose={() => setShowVoiceChat(false)} />
      )}
    </>
  );
}
