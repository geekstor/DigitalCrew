import { Button } from "./ui/button";
import { Play } from "lucide-react";

interface HeroSectionProps {
  onGenerateClick: () => void;
}

export function HeroSection({ onGenerateClick }: HeroSectionProps) {
  return (
    <section className="py-20 px-6 md:px-12 lg:px-24">
      <div className="max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="space-y-6">
            <h1 className="text-4xl md:text-5xl lg:text-6xl tracking-tight">
              Describe your business.<br />Get an AI Agent that runs it for you.
            </h1>
            <p className="text-xl text-muted-foreground max-w-xl">
              Transform your business operations with intelligent AI agents that understand your needs and automate complex workflows.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <Button 
                size="lg" 
                className="bg-[#6ADBCD] hover:bg-[#4FD6C9] text-white rounded-full px-8 shadow-lg shadow-[#6ADBCD]/20"
                onClick={onGenerateClick}
              >
                Generate my Agent
              </Button>
              <Button 
                size="lg" 
                variant="outline" 
                className="rounded-full px-8 border-2"
              >
                <Play className="mr-2 h-4 w-4" />
                Watch Demo
              </Button>
            </div>
          </div>

          {/* Right Illustration */}
          <div className="relative">
            <div className="rounded-2xl overflow-hidden shadow-2xl shadow-black/10">
              <img 
                src="https://images.unsplash.com/photo-1750365919971-7dd273e7b317?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxBSSUyMHRlY2hub2xvZ3klMjBuZXR3b3JrfGVufDF8fHx8MTc2MjkyMzc0NXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral" 
                alt="AI Agent Network" 
                className="w-full h-auto"
              />
            </div>
            {/* Accent decoration */}
            <div className="absolute -bottom-4 -right-4 w-32 h-32 bg-gradient-to-br from-[#6ADBCD] to-[#B8A2F7] opacity-10 rounded-full blur-3xl" />
            <div className="absolute -top-4 -left-4 w-24 h-24 bg-[#6ADBCD] opacity-10 rounded-full blur-3xl" />
          </div>
        </div>
      </div>
    </section>
  );
}
