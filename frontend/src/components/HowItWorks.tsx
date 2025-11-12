import { FileText, Brain, Sparkles, Rocket, BarChart3 } from "lucide-react";

const steps = [
  {
    icon: FileText,
    title: "Company Description",
    description: "Tell us about your business, goals, and current processes."
  },
  {
    icon: Brain,
    title: "Analysis Engine",
    description: "AI analyzes your operations and identifies automation opportunities."
  },
  {
    icon: Sparkles,
    title: "Agent Discovery",
    description: "Get matched with specialized AI agents for your specific needs."
  },
  {
    icon: Rocket,
    title: "Deployment",
    description: "Launch your agents with one click—no coding required."
  },
  {
    icon: BarChart3,
    title: "Performance Monitoring",
    description: "Track efficiency gains and optimize agent performance over time."
  }
];

export function HowItWorks() {
  return (
    <section className="py-20 px-6 md:px-12 lg:px-24 bg-[#F5F5F5]">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl mb-4">How It Works</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Five simple steps from description to deployment
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
          {steps.map((step, index) => {
            const Icon = step.icon;
            return (
              <div 
                key={index}
                className="bg-white rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="w-12 h-12 rounded-xl bg-[#00C68E]/10 flex items-center justify-center mb-4">
                  <Icon className="w-6 h-6 text-[#00C68E]" />
                </div>
                <h3 className="mb-2">{step.title}</h3>
                <p className="text-sm text-muted-foreground">{step.description}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
