import { FileText, Brain, Sparkles, Rocket, BarChart3 } from "lucide-react";
import { useTranslation } from "react-i18next";

export function HowItWorks() {
  const { t } = useTranslation();
  
  const steps = [
    {
      icon: FileText,
      title: t('howItWorks.steps.companyDescription.title'),
      description: t('howItWorks.steps.companyDescription.description')
    },
    {
      icon: Brain,
      title: t('howItWorks.steps.analysisEngine.title'),
      description: t('howItWorks.steps.analysisEngine.description')
    },
    {
      icon: Sparkles,
      title: t('howItWorks.steps.agentDiscovery.title'),
      description: t('howItWorks.steps.agentDiscovery.description')
    },
    {
      icon: Rocket,
      title: t('howItWorks.steps.deployment.title'),
      description: t('howItWorks.steps.deployment.description')
    },
    {
      icon: BarChart3,
      title: t('howItWorks.steps.performanceMonitoring.title'),
      description: t('howItWorks.steps.performanceMonitoring.description')
    }
  ];

  return (
    <section className="py-20 px-6 md:px-12 lg:px-24 bg-[#F5F5F5]">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl mb-4">{t('howItWorks.title')}</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            {t('howItWorks.subtitle')}
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
