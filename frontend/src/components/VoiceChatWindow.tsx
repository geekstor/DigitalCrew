import { useState, useEffect } from "react";
import { X, Mic, MicOff } from "lucide-react";
import { Button } from "./ui/button";

interface VoiceChatWindowProps {
  onClose: () => void;
}

export function VoiceChatWindow({ onClose }: VoiceChatWindowProps) {
  const [isListening, setIsListening] = useState(true);
  const [transcript, setTranscript] = useState("");
  const [aiResponse, setAiResponse] = useState("");
  
  useEffect(() => {
    // Simulate live transcription
    if (isListening) {
      const texts = [
        "I need an AI agent for customer support...",
        "I need an AI agent for customer support that can handle...",
        "I need an AI agent for customer support that can handle common inquiries and route complex issues to my team."
      ];
      
      let index = 0;
      const interval = setInterval(() => {
        if (index < texts.length) {
          setTranscript(texts[index]);
          index++;
        } else {
          setIsListening(false);
          clearInterval(interval);
          // Simulate AI response
          setTimeout(() => {
            setAiResponse("Great! I'll help you create a customer support agent. Based on your needs, I recommend configuring it with natural language understanding, ticket routing, and knowledge base integration. Would you like to proceed with these features?");
          }, 500);
        }
      }, 1000);
      
      return () => clearInterval(interval);
    }
  }, [isListening]);

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-3xl w-full max-w-md shadow-2xl overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-[#00C68E] to-[#00A877] p-6 text-white">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-white">Voice Chat</h3>
            <button 
              onClick={onClose}
              className="text-white/80 hover:text-white transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
          
          {/* Microphone Animation */}
          <div className="flex justify-center">
            <div className={`relative w-24 h-24 rounded-full bg-white/20 flex items-center justify-center ${isListening ? 'animate-pulse' : ''}`}>
              <div className={`w-20 h-20 rounded-full bg-white/30 flex items-center justify-center ${isListening ? 'animate-pulse' : ''}`}>
                <div className="w-16 h-16 rounded-full bg-white flex items-center justify-center">
                  <Mic className="w-8 h-8 text-[#00C68E]" />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="p-6 space-y-4 max-h-96 overflow-y-auto">
          {/* User Transcript */}
          {transcript && (
            <div className="bg-[#F5F5F5] rounded-2xl p-4">
              <div className="text-xs text-muted-foreground mb-2 font-inter">You said:</div>
              <div className="text-sm">{transcript}</div>
            </div>
          )}

          {/* AI Response */}
          {aiResponse && (
            <div className="bg-[#00C68E]/5 rounded-2xl p-4 border border-[#00C68E]/20">
              <div className="text-xs text-[#00C68E] mb-2 font-inter">AI Agent:</div>
              <div className="text-sm">{aiResponse}</div>
            </div>
          )}

          {/* Listening Indicator */}
          {isListening && (
            <div className="text-center">
              <div className="inline-flex items-center gap-2 text-sm text-muted-foreground font-inter">
                <div className="w-2 h-2 bg-[#00C68E] rounded-full animate-pulse" />
                Listening...
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-6 border-t border-gray-100">
          <Button
            onClick={() => setIsListening(!isListening)}
            variant={isListening ? "default" : "outline"}
            className={`w-full rounded-full ${isListening ? 'bg-[#00C68E] hover:bg-[#00B380]' : ''}`}
          >
            {isListening ? (
              <>
                <MicOff className="mr-2 h-4 w-4" />
                Stop Listening
              </>
            ) : (
              <>
                <Mic className="mr-2 h-4 w-4" />
                Start Listening
              </>
            )}
          </Button>
        </div>
      </div>
    </div>
  );
}
