import { Zap, Target, TrendingUp } from "lucide-react";
import { useTranslation } from "react-i18next";

export function FeatureHighlights() {
  const { t } = useTranslation();
  
  const features = [
    {
      icon: Zap,
      title: t('features.noCodeSetup.title'),
      description: t('features.noCodeSetup.description')
    },
    {
      icon: Target,
      title: t('features.smartTaskAnalysis.title'),
      description: t('features.smartTaskAnalysis.description')
    },
    {
      icon: TrendingUp,
      title: t('features.continuousOptimization.title'),
      description: t('features.continuousOptimization.description')
    }
  ];

  return (
    <section className="py-20 px-6 md:px-12 lg:px-24">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <div 
                key={index}
                className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100 hover:border-[#00C68E]/20 transition-colors"
              >
                <div className="w-14 h-14 rounded-2xl bg-[#00C68E]/10 flex items-center justify-center mb-6">
                  <Icon className="w-7 h-7 text-[#00C68E]" />
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
