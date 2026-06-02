import Link from "next/link";
import { ShieldCheck } from "lucide-react";

export default function Footer() {
  const legalLinks = [
    { name: "Terms & Conditions", href: "/policies/terms" },
    { name: "Privacy Policy", href: "/policies/privacy" },
    { name: "Refund Policy", href: "/policies/refund" },
    { name: "Cancellation Policy", href: "/policies/cancellation" },
    { name: "Verification Policy", href: "/policies/verification" },
    { name: "Cookie Policy", href: "/policies/cookie" },
    { name: "Community Guidelines", href: "/policies/community" },
  ];

  return (
    <footer className="mt-auto border-t border-[#eae1d3]/80 bg-[#fdfbf7] py-12 text-xs">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center justify-between gap-6 md:flex-row">
          {/* Logo & Slogan */}
          <div className="flex flex-col items-center gap-2 md:items-start">
            <div className="flex items-center space-x-2">
              <ShieldCheck className="h-5 w-5 text-[#2c2724]" />
              <span className="text-lg font-bold tracking-tight text-[#2c2724]">
                Nest<span className="text-[#2c2724]">Arrival</span>
              </span>
            </div>
            <p className="text-[10px] text-[#8a7d6a]">
              Connection Layer for Vetted Canadian Tenancies.
            </p>
          </div>

          {/* Links */}
          <div className="flex flex-wrap justify-center gap-x-6 gap-y-2 font-medium text-[#8a7d6a]">
            {legalLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="hover:text-[#cfa052] transition-colors"
              >
                {link.name}
              </Link>
            ))}
          </div>
        </div>

        <hr className="my-8 border-[#eae1d3]" />

        <div className="flex flex-col items-center justify-between gap-4 md:flex-row text-slate-400 text-[10px]">
          <p>© {new Date().getFullYear()} NestArrival Inc. All rights reserved.</p>
          <p className="text-center md:text-right">
            Designed to bridge safety and accessibility for immigrants, students, and workers relocating to Canada.
          </p>
        </div>
      </div>
    </footer>
  );
}
