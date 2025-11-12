import { ArrowLeft } from "lucide-react";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";

interface AgentSuggestionsProps {
  onBack: () => void;
  onAddAgent: (agentId: string) => void;
  onPreviewAgent: (agentId: string) => void;
  onAddAllAgents: () => void;
}

interface AgentCard {
  id: string;
  name: string;
  description: string;
  tags: string[];
}

const suggestedAgents: AgentCard[] = [
  {
    id: "customer-support",
    name: "Customer Support Bot",
    description: "Automatically handle customer inquiries, provide instant responses, and escalate complex issues to human agents.",
    tags: ["Automation", "Chat", "CRM"]
  },
  {
    id: "email-manager",
    name: "Email Management Assistant",
    description: "Organize incoming emails, draft responses, and prioritize important messages based on your preferences.",
    tags: ["Email", "Productivity", "Automation"]
  },
  {
    id: "data-analyst",
    name: "Data Analysis Agent",
    description: "Process and analyze business data, generate insights, and create automated reports for decision-making.",
    tags: ["Analytics", "Reporting", "Business Intelligence"]
  },
  {
    id: "social-media",
    name: "Social Media Manager",
    description: "Schedule posts, respond to comments, and track engagement across multiple social platforms.",
    tags: ["Marketing", "Social Media", "Content"]
  },
  {
    id: "appointment-scheduler",
    name: "Appointment Scheduler",
    description: "Manage calendars, book meetings automatically, and send reminders to clients and team members.",
    tags: ["Scheduling", "Calendar", "Automation"]
  }
];

export function AgentSuggestions({ onBack, onAddAgent, onPreviewAgent, onAddAllAgents }: AgentSuggestionsProps) {
  return (
    <div className="flex-1 overflow-y-auto bg-white">
      <div className="max-w-6xl mx-auto px-8 py-8">
        {/* Back Link */}
        <button
          onClick={onBack}
          className="flex items-center gap-2 text-sm text-muted-foreground hover:text-[#6ADBCD] transition-colors mb-6 font-inter"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Edit Setup
        </button>

        {/* Title and Subtitle */}
        <div className="mb-10">
          <h2 className="text-3xl mb-3">Suggested AI Agents for Your Business</h2>
          <p className="text-muted-foreground font-inter">
            Based on your description, here are agents that can help automate your work.
          </p>
        </div>

        {/* Agent Cards Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {suggestedAgents.map((agent) => (
            <div
              key={agent.id}
              className="bg-white border border-[#E5E7EB] rounded-2xl p-6 hover:shadow-lg hover:shadow-black/5 transition-all"
            >
              {/* Agent Name */}
              <h3 className="text-xl mb-3">{agent.name}</h3>

              {/* Description */}
              <p className="text-sm text-muted-foreground font-inter mb-4 leading-relaxed">
                {agent.description}
              </p>

              {/* Tags */}
              <div className="flex flex-wrap gap-2 mb-6">
                {agent.tags.map((tag) => (
                  <Badge
                    key={tag}
                    variant="secondary"
                    className="bg-[#F5F5F5] text-[#6B7280] hover:bg-[#E5E7EB] font-inter"
                  >
                    {tag}
                  </Badge>
                ))}
              </div>

              {/* Action Buttons */}
              <div className="flex gap-3">
                <Button
                  variant="outline"
                  className="flex-1 rounded-full border-2"
                  onClick={() => onPreviewAgent(agent.id)}
                >
                  Preview
                </Button>
                <Button
                  className="flex-1 rounded-full bg-gradient-to-r from-[#6ADBCD] to-[#B8A2F7] hover:opacity-90 text-white shadow-lg shadow-[#6ADBCD]/20"
                  onClick={() => onAddAgent(agent.id)}
                >
                  Add Agent
                </Button>
              </div>
            </div>
          ))}
        </div>

        {/* Add All Agents Button */}
        <div className="mt-10 flex justify-center">
          <Button
            size="lg"
            className="rounded-full px-12 bg-gradient-to-r from-[#8CE0D6] to-[#B3E9FF] hover:from-[#9FE8DF] hover:to-[#C5EFFF] text-white shadow-xl shadow-[#8CE0D6]/30 transition-all hover:shadow-2xl hover:shadow-[#8CE0D6]/40"
            onClick={onAddAllAgents}
          >
            Add All Agents to Workspace
          </Button>
        </div>
      </div>
    </div>
  );
}
