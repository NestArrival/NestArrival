"use client";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { ShieldCheck, Users, Compass, ShieldAlert, BadgeCheck, Lock } from "lucide-react";
import { motion } from "framer-motion";

export default function AboutPage() {
  return (
    <div className="flex flex-col min-h-screen bg-[#fdfbf7] text-[#5c544d]">
      <Navbar />
      
      {/* Decorative radial background */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(207,160,82,0.03)_0%,transparent_50%)] pointer-events-none z-0 h-[500px]" />

      <main className="flex-grow mx-auto max-w-5xl px-4 py-20 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <div className="text-center mb-20 space-y-4">
          <motion.span 
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-[10px] text-[#cfa052] font-extrabold uppercase tracking-widest bg-[#eae1d3] px-3 py-1.5 rounded-full border border-[#eae1d3]/50 inline-block shadow-sm"
          >
            Our Mission
          </motion.span>
          <motion.h1 
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-4xl font-extrabold tracking-tight text-[#2c2724] sm:text-6xl font-serif italic leading-[1.15]"
          >
            Bridging Safety and Trust
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mt-4 text-xs sm:text-sm text-[#8a7d6a] max-w-2xl mx-auto leading-relaxed"
          >
            NestArrival was built to solve a critical issue: newcomer rental fraud in Canada. We operate a manual verification layer to protect immigrants, students, and workers from deposit scams.
          </motion.p>
        </div>

        {/* Narrative columns */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center mb-24">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="lg:col-span-6 space-y-6 text-xs sm:text-sm text-[#5c544d] leading-relaxed"
          >
            <h2 className="text-xl font-bold text-[#2c2724] flex items-center gap-2">
              <ShieldAlert className="h-5 w-5 text-[#cfa052]" />
              <span>Scam Protection Framework</span>
            </h2>
            <p>
              Traditional housing marketplaces permit anonymous listings. This lack of auditing enables overseas scammers to post fake listings and collect advance rental deposits.
            </p>
            <p>
              NestArrival resolves this. We are **not a property broker, lease payment platform, or booking agent**. We act as an identity safety check. Both property owners and tenants must pass document verification before any contact channels can be established.
            </p>
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="lg:col-span-6 bg-white p-6 sm:p-8 rounded-2xl border border-[#eae1d3] shadow-xl flex flex-col md:flex-row items-center gap-6 relative overflow-hidden"
          >
            <div className="flex-1 space-y-4 text-xs text-[#5c544d]">
              <h3 className="font-bold text-[#2c2724] text-sm mb-2 flex items-center gap-2">
                <Lock className="h-4 w-4 text-[#cfa052]" />
                <span>Vetting Procedures</span>
              </h3>
              <div className="space-y-3.5 leading-relaxed">
                <div className="flex flex-col gap-0.5">
                  <span className="text-[#cfa052] font-bold text-[11px] uppercase tracking-wide">🇨🇦 Landlords</span>
                  <span className="text-[#8a7d6a]">Must upload municipal property tax bills or land registry titles matching government photo IDs.</span>
                </div>
                <div className="flex flex-col gap-0.5">
                  <span className="text-[#cfa052] font-bold text-[11px] uppercase tracking-wide">🛂 Tenants</span>
                  <span className="text-[#8a7d6a]">Must upload visa permits, passports, and Canadian study/work offers to confirm intentions.</span>
                </div>
                <div className="flex flex-col gap-0.5">
                  <span className="text-[#cfa052] font-bold text-[11px] uppercase tracking-wide">🔐 Encryption</span>
                  <span className="text-[#8a7d6a]">All identity documents are encrypted and audited manually by verification managers.</span>
                </div>
              </div>
            </div>
            
            <div className="w-32 h-32 flex items-center justify-center shrink-0 bg-[#fdfbf7] rounded-xl border border-[#f4efe6] p-2 shadow-inner">
              <img 
                src="/images/trust_shield_3d.png" 
                alt="3D Trust Verification Shield" 
                className="h-full w-full object-contain animate-pulse"
                style={{ animationDuration: '3s' }}
              />
            </div>
          </motion.div>
        </div>

        {/* Core Pillars grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="bg-white p-8 rounded-2xl border border-[#eae1d3]/80 text-xs space-y-4 shadow-md hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
          >
            <div className="rounded-lg bg-[#eae1d3] border border-[#f4efe6] p-2.5 text-[#cfa052] inline-flex shadow-sm">
              <BadgeCheck className="h-5 w-5" />
            </div>
            <h3 className="text-sm font-bold text-[#2c2724]">Vetting First</h3>
            <p className="text-[#8a7d6a] leading-relaxed">
              We verify documents manually before listings appear. We choose absolute tenant safety over transaction volumes.
            </p>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="bg-white p-8 rounded-2xl border border-[#eae1d3]/80 text-xs space-y-4 shadow-md hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
          >
            <div className="rounded-lg bg-[#eae1d3] border border-[#f4efe6] p-2.5 text-[#cfa052] inline-flex shadow-sm">
              <Users className="h-5 w-5" />
            </div>
            <h3 className="text-sm font-bold text-[#2c2724]">Newcomer Support</h3>
            <p className="text-[#8a7d6a] leading-relaxed">
              Newcomers lack local references or credit records. We showcase their international credentials to build trust with landlords.
            </p>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="bg-white p-8 rounded-2xl border border-[#eae1d3]/80 text-xs space-y-4 shadow-md hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
          >
            <div className="rounded-lg bg-[#eae1d3] border border-[#f4efe6] p-2.5 text-[#cfa052] inline-flex shadow-sm">
              <Compass className="h-5 w-5" />
            </div>
            <h3 className="text-sm font-bold text-white text-[#2c2724]">Zero Spam Guarantee</h3>
            <p className="text-[#8a7d6a] leading-relaxed">
              We ban deceptive accounts permanently. If listings do not map to verified titles, they are rejected during moderation.
            </p>
          </motion.div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
