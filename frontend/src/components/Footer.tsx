export function Footer() {
  const links = [
    { label: "Docs", href: "#" },
    { label: "Pricing", href: "#" },
    { label: "Contact", href: "#" },
    { label: "Community", href: "#" }
  ];

  return (
    <footer className="bg-[#0B0D12] text-white py-12 px-6 md:px-12 lg:px-24">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          {/* Logo/Brand */}
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#6ADBCD] to-[#B8A2F7] flex items-center justify-center">
              <span className="text-white">AI</span>
            </div>
            <span className="text-xl">Agent Builder</span>
          </div>

          {/* Links */}
          <nav className="flex items-center gap-8">
            {links.map((link, index) => (
              <a 
                key={index}
                href={link.href}
                className="text-gray-400 hover:text-white transition-colors"
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* Copyright */}
          <div className="text-gray-400 text-sm font-inter">
            © 2025 AI Agent Builder
          </div>
        </div>
      </div>
    </footer>
  );
}
