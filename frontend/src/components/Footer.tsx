import { useTranslation } from "react-i18next";

export function Footer() {
  const { t } = useTranslation();
  
  return (
    <footer className="bg-[#0B0D12] text-white py-12 px-6 md:px-12 lg:px-24">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          {/* Logo/Brand */}
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-[#00C68E] flex items-center justify-center">
              <span className="text-white">AI</span>
            </div>
            <span className="text-xl">Agent Builder</span>
          </div>

          {/* Copyright */}
          <div className="text-gray-400 text-sm font-inter">
            {t('footer.copyright')}
          </div>
        </div>
      </div>
    </footer>
  );
}
