import { useState } from "react";
import { HeroSection } from "./components/HeroSection";
import { HowItWorks } from "./components/HowItWorks";
import { FeatureHighlights } from "./components/FeatureHighlights";
import { DashboardPreview } from "./components/DashboardPreview";
import { Footer } from "./components/Footer";
import { AgentBuilderModal } from "./components/AgentBuilderModal";

export default function App() {
  const [showAgentBuilder, setShowAgentBuilder] = useState(false);

  return (
    <div className="min-h-screen bg-white">
      {/* Navigation */}
      <nav className="sticky top-0 z-30 bg-white/80 backdrop-blur-md border-b border-[#E5E7EB]">
        <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-24 py-4">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#6ADBCD] to-[#B8A2F7] flex items-center justify-center shadow-sm shadow-[#6ADBCD]/20">
                <span className="text-white">AI</span>
              </div>
              <span className="text-xl">Agent Builder</span>
            </div>

            {/* Nav Links */}
            <div className="hidden md:flex items-center gap-8">
              <a href="#" className="text-muted-foreground hover:text-foreground transition-colors">
                Features
              </a>
              <a href="#" className="text-muted-foreground hover:text-foreground transition-colors">
                Pricing
              </a>
              <a href="#" className="text-muted-foreground hover:text-foreground transition-colors">
                Docs
              </a>
              <button 
                onClick={() => setShowAgentBuilder(true)}
                className="px-6 py-2 bg-[#6ADBCD] hover:bg-[#4FD6C9] text-white rounded-full transition-colors shadow-sm shadow-[#6ADBCD]/20"
              >
                Get Started
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main>
        <HeroSection onGenerateClick={() => setShowAgentBuilder(true)} />
        <HowItWorks />
        <FeatureHighlights />
        <DashboardPreview />
      </main>

      {/* Footer */}
      <Footer />

      {/* Agent Builder Modal */}
      {showAgentBuilder && (
        <AgentBuilderModal onClose={() => setShowAgentBuilder(false)} />
      )}
    </div>
  );
}
