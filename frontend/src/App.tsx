import { useState } from "react";
import { HeroSection } from "./components/HeroSection";
import { HowItWorks } from "./components/HowItWorks";
import { FeatureHighlights } from "./components/FeatureHighlights";
import { Footer } from "./components/Footer";
import { AgentBuilderModal } from "./components/AgentBuilderModal";
import { LanguageSwitcher } from "./components/LanguageSwitcher";

export default function App() {
  const [showAgentBuilder, setShowAgentBuilder] = useState(false);

  return (
    <div className="min-h-screen bg-white">
      {/* Navigation */}
      <nav className="sticky top-0 z-30 bg-white/80 backdrop-blur-md border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-24 py-4">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 rounded-xl bg-[#00C68E] flex items-center justify-center">
                <span className="text-white">AI</span>
              </div>
              <span className="text-xl">Agent Builder</span>
            </div>

            {/* Nav Links */}
            <div className="hidden md:flex items-center gap-4">
              <LanguageSwitcher />
              <button
                onClick={() => setShowAgentBuilder(true)}
                className="px-6 py-2 bg-[#00C68E] hover:bg-[#00B380] text-white rounded-full transition-colors"
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
