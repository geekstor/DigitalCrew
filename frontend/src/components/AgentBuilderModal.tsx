import { useState } from "react";
import { X, Upload, Mic, Send, Bot, User, Loader2, AlertCircle, Sparkles, TrendingUp } from "lucide-react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { Progress } from "./ui/progress";
import { Card } from "./ui/card";
import { VoiceChatWindow } from "./VoiceChatWindow";
import { apiClient, type AnalysisResponse, type GenerateAgentsResponse, type SimulationResponse } from "../services/api";

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
  const [selectedIndustry, setSelectedIndustry] = useState("");
  const [uploadedFiles, setUploadedFiles] = useState<string[]>([]);
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "ai",
      content: "Hello! I'm here to help you build the perfect AI agent for your business. Let's start by understanding what you need. Please describe your company and the main tasks you'd like to automate."
    }
  ]);
  const [inputMessage, setInputMessage] = useState("");
  const [showVoiceChat, setShowVoiceChat] = useState(false);
  const [progress, setProgress] = useState(25);
  const [isLoading, setIsLoading] = useState(false);
  const [analysisData, setAnalysisData] = useState<AnalysisResponse | null>(null);
  const [agentsData, setAgentsData] = useState<GenerateAgentsResponse | null>(null);
  const [simulationData, setSimulationData] = useState<SimulationResponse | null>(null);

  const handleSendMessage = async () => {
    if (!inputMessage.trim() || isLoading) return;

    const userMessage: Message = {
      role: "user",
      content: inputMessage
    };

    setMessages([...messages, userMessage]);
    const currentInput = inputMessage;
    setInputMessage("");
    setIsLoading(true);

    try {
      // Step 1: Analyze company if this is the first message with company description
      if (!analysisData && messages.length === 1) {
        const analysis = await apiClient.analyzeCompany(currentInput);
        setAnalysisData(analysis);
        setProgress(50);
        
        const analysisMessage: Message = {
          role: "ai",
          content: `Great! I've analyzed your company and identified ${analysis.problems.length} key areas for improvement. Now generating custom AI agents...`
        };
        setMessages(prev => [...prev, analysisMessage]);

        // Step 2: Generate agents
        const agents = await apiClient.generateAgents(analysis);
        setAgentsData(agents);
        setProgress(75);
        
        const agentsMessage: Message = {
          role: "ai",
          content: `Perfect! I've designed ${agents.agents.length} specialized AI agents for your business. Would you like to see the simulated impact?`
        };
        setMessages(prev => [...prev, agentsMessage]);
        
      } else if (analysisData && agentsData && !simulationData) {
        // Step 3: Run simulation if user confirms
        if (currentInput.toLowerCase().includes('yes') || currentInput.toLowerCase().includes('simulate') || currentInput.toLowerCase().includes('show')) {
          const simulation = await apiClient.simulateImpact(
            analysisData.problems,
            agentsData.agents
          );
          setSimulationData(simulation);
          setProgress(100);
          
          const simulationMessage: Message = {
            role: "ai",
            content: `Excellent! The simulation shows impressive results with an estimated monthly savings of $${simulation.total_monthly_savings.toLocaleString()}. ${simulation.roi_description}`
          };
          setMessages(prev => [...prev, simulationMessage]);
        } else {
          const aiMessage: Message = {
            role: "ai",
            content: "I understand. Feel free to ask me any questions about the agents or if you'd like to see the simulation results, just let me know!"
          };
          setMessages(prev => [...prev, aiMessage]);
        }
      } else {
        // General conversation
        const aiMessage: Message = {
          role: "ai",
          content: "Thanks for the additional information! Is there anything specific about the AI agents or implementation that you'd like to know more about?"
        };
        setMessages(prev => [...prev, aiMessage]);
      }
    } catch (error) {
      console.error('API Error:', error);
      const errorMessage: Message = {
        role: "ai",
        content: "I apologize, but I encountered an error while processing your request. Please make sure the backend server is running and try again."
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleFileUpload = () => {
    // Simulate file upload
    setUploadedFiles([...uploadedFiles, "company-overview.pdf"]);
  };

  return (
    <>
      <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-40 p-4">
        <div className="bg-white rounded-3xl w-full max-w-6xl h-[90vh] shadow-2xl overflow-hidden flex flex-col">
          {/* Header */}
          <div className="bg-white border-b border-gray-100 p-6 flex items-center justify-between">
            <div>
              <h2 className="text-2xl">AI Agent Builder</h2>
              <p className="text-sm text-muted-foreground font-inter mt-1">
                Configure your intelligent automation assistant
              </p>
            </div>
            <button 
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600 transition-colors"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          {/* Progress Bar */}
          <div className="px-6 py-3 bg-[#F5F5F5] border-b border-gray-100">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs text-muted-foreground font-inter">Setup Progress</span>
              <span className="text-xs text-muted-foreground font-inter">{progress}%</span>
            </div>
            <Progress value={progress} className="h-1.5" />
          </div>

          {/* Main Content */}
          <div className="flex flex-1 overflow-hidden">
            {/* Left Panel */}
            <div className="w-80 bg-[#F5F5F5] p-6 space-y-6 overflow-y-auto border-r border-gray-200">
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
                <Button 
                  variant="outline" 
                  className="w-full rounded-xl border-2 border-dashed hover:border-[#00C68E] hover:bg-white"
                  onClick={handleFileUpload}
                >
                  <Upload className="mr-2 h-4 w-4" />
                  Upload Files
                </Button>
                
                {uploadedFiles.length > 0 && (
                  <div className="mt-4 space-y-2">
                    {uploadedFiles.map((file, index) => (
                      <div 
                        key={index}
                        className="bg-white rounded-lg p-3 text-sm flex items-center gap-2"
                      >
                        <div className="w-8 h-8 rounded bg-[#00C68E]/10 flex items-center justify-center flex-shrink-0">
                          <Upload className="w-4 h-4 text-[#00C68E]" />
                        </div>
                        <span className="truncate font-inter">{file}</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              <div className="pt-4 border-t border-gray-200">
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
              <div className="flex-1 overflow-y-auto p-6 space-y-6">
                {messages.map((message, index) => (
                  <div 
                    key={index}
                    className={`flex gap-3 ${message.role === "user" ? "justify-end" : "justify-start"}`}
                  >
                    {message.role === "ai" && (
                      <div className="w-8 h-8 rounded-full bg-[#00C68E]/10 flex items-center justify-center flex-shrink-0">
                        <Bot className="w-4 h-4 text-[#00C68E]" />
                      </div>
                    )}
                    <div 
                      className={`max-w-md rounded-2xl p-4 ${
                        message.role === "user" 
                          ? "bg-white border border-gray-200" 
                          : "bg-[#F5F5F5] border border-gray-100"
                      }`}
                    >
                      <p className="text-sm leading-relaxed whitespace-pre-line">{message.content}</p>
                    </div>
                    {message.role === "user" && (
                      <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center flex-shrink-0">
                        <User className="w-4 h-4 text-gray-600" />
                      </div>
                    )}
                  </div>
                ))}

                {/* Problems Cards */}
                {analysisData && (
                  <div className="space-y-3">
                    <div className="flex items-center gap-2 text-sm font-medium text-gray-700">
                      <AlertCircle className="w-4 h-4" />
                      <span>Identified Problems</span>
                    </div>
                    <div className="grid gap-3">
                      {analysisData.problems.map((problem, idx) => (
                        <Card key={idx} className="p-4 border-l-4 border-l-orange-500">
                          <h4 className="font-semibold text-sm mb-2">{problem.title}</h4>
                          <p className="text-xs text-gray-600 mb-2">{problem.description}</p>
                          <div className="flex items-center justify-between">
                            <span className="text-xs text-gray-500">{problem.impact}</span>
                            <span className="text-xs font-semibold text-orange-600">
                              ${problem.cost_per_month.toLocaleString()}/mo
                            </span>
                          </div>
                        </Card>
                      ))}
                    </div>
                  </div>
                )}

                {/* Agents Cards */}
                {agentsData && (
                  <div className="space-y-3">
                    <div className="flex items-center gap-2 text-sm font-medium text-gray-700">
                      <Sparkles className="w-4 h-4" />
                      <span>AI Agents</span>
                    </div>
                    <div className="grid gap-3">
                      {agentsData.agents.map((agent, idx) => (
                        <Card key={idx} className="p-4 border-l-4 border-l-[#00C68E]">
                          <h4 className="font-semibold text-sm mb-2">{agent.name}</h4>
                          <p className="text-xs text-gray-600 mb-3">{agent.description}</p>
                          <div className="flex flex-wrap gap-1 mb-2">
                            {agent.capabilities.slice(0, 3).map((cap, capIdx) => (
                              <span key={capIdx} className="text-xs px-2 py-1 bg-[#00C68E]/10 text-[#00C68E] rounded-full">
                                {cap}
                              </span>
                            ))}
                          </div>
                          <div className="text-xs text-gray-500">
                            Targets: {agent.target_problem}
                          </div>
                        </Card>
                      ))}
                    </div>
                  </div>
                )}

                {/* Simulation Metrics Cards */}
                {simulationData && (
                  <div className="space-y-3">
                    <div className="flex items-center gap-2 text-sm font-medium text-gray-700">
                      <TrendingUp className="w-4 h-4" />
                      <span>Impact Simulation</span>
                    </div>
                    <div className="grid gap-3">
                      {simulationData.metrics.map((metric, idx) => (
                        <Card key={idx} className="p-4 border-l-4 border-l-blue-500">
                          <h4 className="font-semibold text-sm mb-2">{metric.metric_name}</h4>
                          <div className="flex items-center justify-between mb-2">
                            <span className="text-xs text-gray-500">Before: {metric.before}</span>
                            <span className="text-xs text-gray-500">After: {metric.after}</span>
                          </div>
                          <div className="text-right">
                            <span className="text-sm font-bold text-blue-600">
                              +{metric.improvement_percent}% improvement
                            </span>
                          </div>
                        </Card>
                      ))}
                      <Card className="p-4 bg-gradient-to-r from-green-50 to-emerald-50 border-green-200">
                        <div className="text-center">
                          <p className="text-xs text-gray-600 mb-1">Total Monthly Savings</p>
                          <p className="text-2xl font-bold text-green-600">
                            ${simulationData.total_monthly_savings.toLocaleString()}
                          </p>
                        </div>
                      </Card>
                    </div>
                  </div>
                )}

                {isLoading && (
                  <div className="flex gap-3 justify-start">
                    <div className="w-8 h-8 rounded-full bg-[#00C68E]/10 flex items-center justify-center flex-shrink-0">
                      <Loader2 className="w-4 h-4 text-[#00C68E] animate-spin" />
                    </div>
                    <div className="max-w-md rounded-2xl p-4 bg-[#F5F5F5] border border-gray-100">
                      <p className="text-sm leading-relaxed">Analyzing your requirements...</p>
                    </div>
                  </div>
                )}
              </div>

              {/* Input Area */}
              <div className="border-t border-gray-100 p-6 bg-[#F5F5F5]">
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
                    onKeyPress={(e) => e.key === "Enter" && !isLoading && handleSendMessage()}
                    disabled={isLoading}
                  />
                  <Button
                    size="icon"
                    className="rounded-full w-11 h-11 flex-shrink-0 bg-[#00C68E] hover:bg-[#00B380]"
                    onClick={handleSendMessage}
                    disabled={isLoading}
                  >
                    {isLoading ? (
                      <Loader2 className="w-5 h-5 animate-spin" />
                    ) : (
                      <Send className="w-5 h-5" />
                    )}
                  </Button>
                </div>
              </div>
            </div>
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
