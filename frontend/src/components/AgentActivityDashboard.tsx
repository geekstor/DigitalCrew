import { useState } from "react";
import { Pause, Plus, Bot, Mail, BarChart3, Share2, Calendar, TrendingUp, Clock, CheckCircle } from "lucide-react";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { motion } from "motion/react";

interface AgentActivityDashboardProps {
  onAddNewAgent: () => void;
}

interface AgentStatus {
  id: string;
  name: string;
  description: string;
  status: "active" | "processing" | "idle";
  icon: React.ReactNode;
  metrics: {
    tasksCompleted: number;
    responseRate: string;
    avgProcessingTime: string;
  };
}

const activeAgents: AgentStatus[] = [
  {
    id: "customer-support",
    name: "Customer Support Bot",
    description: "Handling customer inquiries and support tickets",
    status: "active",
    icon: <Bot className="w-6 h-6" />,
    metrics: {
      tasksCompleted: 247,
      responseRate: "98%",
      avgProcessingTime: "1.2s"
    }
  },
  {
    id: "email-manager",
    name: "Email Management Assistant",
    description: "Organizing inbox and prioritizing messages",
    status: "processing",
    icon: <Mail className="w-6 h-6" />,
    metrics: {
      tasksCompleted: 189,
      responseRate: "94%",
      avgProcessingTime: "2.8s"
    }
  },
  {
    id: "data-analyst",
    name: "Data Analysis Agent",
    description: "Processing quarterly reports and analytics",
    status: "active",
    icon: <BarChart3 className="w-6 h-6" />,
    metrics: {
      tasksCompleted: 56,
      responseRate: "100%",
      avgProcessingTime: "4.5s"
    }
  },
  {
    id: "social-media",
    name: "Social Media Manager",
    description: "Monitoring engagement across platforms",
    status: "idle",
    icon: <Share2 className="w-6 h-6" />,
    metrics: {
      tasksCompleted: 312,
      responseRate: "92%",
      avgProcessingTime: "1.8s"
    }
  },
  {
    id: "appointment-scheduler",
    name: "Appointment Scheduler",
    description: "Managing calendar and booking meetings",
    status: "active",
    icon: <Calendar className="w-6 h-6" />,
    metrics: {
      tasksCompleted: 128,
      responseRate: "96%",
      avgProcessingTime: "0.9s"
    }
  }
];

const statusConfig = {
  active: {
    label: "Active",
    color: "text-green-600",
    bgColor: "bg-green-100",
    indicator: "🟢"
  },
  processing: {
    label: "Processing",
    color: "text-orange-600",
    bgColor: "bg-orange-100",
    indicator: "🟠"
  },
  idle: {
    label: "Idle",
    color: "text-gray-400",
    bgColor: "bg-gray-100",
    indicator: "⚪"
  }
};

export function AgentActivityDashboard({ onAddNewAgent }: AgentActivityDashboardProps) {
  const [isPaused, setIsPaused] = useState(false);

  const handlePauseAll = () => {
    setIsPaused(!isPaused);
  };

  return (
    <div className="flex-1 overflow-y-auto bg-gradient-to-br from-[#F8F9FA] to-[#E8F4F8] backdrop-blur-sm">
      <div className="max-w-7xl mx-auto px-8 py-10">
        {/* Header */}
        <div className="flex items-start justify-between mb-8">
          <div>
            <h2 className="text-4xl mb-3">Your AI Agents in Action</h2>
            <p className="text-lg text-muted-foreground font-inter">
              Monitor and manage how your agents are performing — in real time.
            </p>
          </div>
          <Button
            variant="outline"
            className="rounded-full border-2 gap-2"
            onClick={handlePauseAll}
          >
            <Pause className="w-4 h-4" />
            {isPaused ? "Resume All" : "Pause All"}
          </Button>
        </div>

        {/* Agent Cards Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {activeAgents.map((agent, index) => (
            <motion.div
              key={agent.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              className="bg-white/80 backdrop-blur-sm border border-[#E5E7EB] rounded-2xl p-6 hover:shadow-xl hover:shadow-black/5 transition-all"
            >
              {/* Agent Header */}
              <div className="flex items-start gap-4 mb-4">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#8CE0D6] to-[#B3E9FF] flex items-center justify-center text-white flex-shrink-0">
                  {agent.icon}
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="text-lg mb-1 truncate">{agent.name}</h3>
                  <p className="text-xs text-muted-foreground font-inter leading-relaxed">
                    {agent.description}
                  </p>
                </div>
              </div>

              {/* Status */}
              <div className="mb-4">
                <Badge
                  variant="secondary"
                  className={`${statusConfig[agent.status].bgColor} ${statusConfig[agent.status].color} font-inter`}
                >
                  <span className="mr-1">{statusConfig[agent.status].indicator}</span>
                  {statusConfig[agent.status].label}
                </Badge>
              </div>

              {/* Metrics Preview */}
              <div className="space-y-3 mb-6">
                <div className="flex items-center justify-between text-xs">
                  <div className="flex items-center gap-2 text-muted-foreground font-inter">
                    <CheckCircle className="w-3.5 h-3.5" />
                    Tasks completed
                  </div>
                  <span className="font-medium">{agent.metrics.tasksCompleted}</span>
                </div>
                <div className="flex items-center justify-between text-xs">
                  <div className="flex items-center gap-2 text-muted-foreground font-inter">
                    <TrendingUp className="w-3.5 h-3.5" />
                    Response rate
                  </div>
                  <span className="font-medium">{agent.metrics.responseRate}</span>
                </div>
                <div className="flex items-center justify-between text-xs">
                  <div className="flex items-center gap-2 text-muted-foreground font-inter">
                    <Clock className="w-3.5 h-3.5" />
                    Avg. processing time
                  </div>
                  <span className="font-medium">{agent.metrics.avgProcessingTime}</span>
                </div>

                {/* Progress Bar */}
                <div className="pt-2">
                  <div className="h-1.5 bg-gray-200 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-[#8CE0D6] to-[#B3E9FF] rounded-full transition-all"
                      style={{ width: agent.metrics.responseRate }}
                    />
                  </div>
                </div>
              </div>

              {/* View Details Button */}
              <Button
                variant="outline"
                className="w-full rounded-full border-2"
              >
                View Details
              </Button>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Floating Add New Agent Button */}
      <button
        onClick={onAddNewAgent}
        className="fixed bottom-8 right-8 w-14 h-14 rounded-full bg-gradient-to-r from-[#8CE0D6] to-[#B3E9FF] hover:from-[#9FE8DF] hover:to-[#C5EFFF] text-white shadow-2xl shadow-[#8CE0D6]/40 flex items-center justify-center transition-all hover:scale-110"
      >
        <Plus className="w-6 h-6" />
      </button>
    </div>
  );
}
