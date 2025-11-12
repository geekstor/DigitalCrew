import { Zap, Target, TrendingUp } from "lucide-react";

const features = [
  {
    icon: Zap,
    title: "No-Code Setup",
    description: "Build and deploy AI agents without writing a single line of code. Our intuitive interface makes automation accessible to everyone."
  },
  {
    icon: Target,
    title: "Smart Task Analysis",
    description: "Advanced AI understands your workflows and automatically identifies the best automation opportunities for maximum impact."
  },
  {
    icon: TrendingUp,
    title: "Continuous Optimization",
    description: "Your agents learn and improve over time, adapting to changes in your business for sustained performance gains."
  }
];

export function FeatureHighlights() {
  return (
    <section className="py-20 px-6 md:px-12 lg:px-24">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <div 
                key={index}
                className="bg-white rounded-2xl p-8 shadow-sm border border-[#E5E7EB] hover:border-[#6ADBCD]/30 transition-colors"
              >
                <div className="w-14 h-14 rounded-2xl bg-[#6ADBCD]/10 flex items-center justify-center mb-6">
                  <Icon className="w-7 h-7 text-[#6ADBCD]" />
                </div>
                <h3 className="mb-3">{feature.title}</h3>
                <p className="text-muted-foreground">{feature.description}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
