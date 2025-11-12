import { Button } from "./ui/button";
import { Activity, CheckCircle2, Clock, TrendingUp } from "lucide-react";

const metrics = [
  { label: "Active Agents", value: "12", icon: Activity, change: "+3 this week" },
  { label: "Tasks Completed", value: "1,247", icon: CheckCircle2, change: "+18% vs last week" },
  { label: "Time Saved", value: "143h", icon: Clock, change: "This month" },
  { label: "Efficiency Gain", value: "92%", icon: TrendingUp, change: "+5% improvement" }
];

const activeAgents = [
  { name: "Customer Support Bot", status: "Active", tasks: 234 },
  { name: "Data Entry Automator", status: "Active", tasks: 421 },
  { name: "Email Classifier", status: "Active", tasks: 189 },
  { name: "Invoice Processor", status: "Training", tasks: 12 }
];

export function DashboardPreview() {
  return (
    <section className="py-20 px-6 md:px-12 lg:px-24 bg-[#F5F5F5]">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl mb-4">Your AI Agent Dashboard</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Monitor, manage, and optimize all your AI agents from one central hub
          </p>
        </div>

        {/* Dashboard Mockup */}
        <div className="bg-white rounded-3xl p-8 shadow-xl shadow-black/5">
          {/* Metrics Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {metrics.map((metric, index) => {
              const Icon = metric.icon;
              return (
                <div key={index} className="bg-[#F5F5F5] rounded-xl p-5">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm text-muted-foreground font-inter">{metric.label}</span>
                    <Icon className="w-4 h-4 text-[#00C68E]" />
                  </div>
                  <div className="text-3xl mb-1">{metric.value}</div>
                  <div className="text-xs text-muted-foreground font-inter">{metric.change}</div>
                </div>
              );
            })}
          </div>

          {/* Active Agents Table */}
          <div>
            <div className="flex items-center justify-between mb-4">
              <h3>Active Agents</h3>
              <Button className="bg-[#00C68E] hover:bg-[#00B380] text-white rounded-full">
                Create New Agent
              </Button>
            </div>
            <div className="space-y-3">
              {activeAgents.map((agent, index) => (
                <div 
                  key={index}
                  className="flex items-center justify-between p-4 bg-[#F5F5F5] rounded-xl hover:bg-gray-100 transition-colors"
                >
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-full bg-[#00C68E]/10 flex items-center justify-center">
                      <Activity className="w-5 h-5 text-[#00C68E]" />
                    </div>
                    <div>
                      <div>{agent.name}</div>
                      <div className="text-sm text-muted-foreground font-inter">{agent.tasks} tasks completed</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className={`text-sm px-3 py-1 rounded-full font-inter ${
                      agent.status === "Active" 
                        ? "bg-[#00C68E]/10 text-[#00C68E]" 
                        : "bg-orange-50 text-orange-600"
                    }`}>
                      {agent.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
