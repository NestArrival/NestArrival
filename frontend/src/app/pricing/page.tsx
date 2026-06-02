"use client";

import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { ShieldCheck, Check, Sparkles, AlertCircle } from "lucide-react";
import { SUBSCRIPTION_PLANS, URGENT_MATCH_ADDON } from "@/lib/constants";
import { motion } from "framer-motion";

export default function PricingPage() {
  return (
    <div className="flex flex-col min-h-screen bg-[#fdfbf7] text-[#5c544d]">
      <Navbar />
      
      {/* Decorative background */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(207,160,82,0.03)_0%,transparent_50%)] pointer-events-none z-0 h-[500px]" />

      <main className="flex-grow mx-auto max-w-6xl px-4 py-20 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <div className="text-center mb-20 space-y-4">
          <motion.span 
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-[10px] text-[#cfa052] font-extrabold uppercase tracking-widest bg-[#eae1d3] px-3 py-1.5 rounded-full border border-[#eae1d3]/50 inline-block shadow-sm"
          >
            Subscription Tiers
          </motion.span>
          <motion.h1 
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-4xl font-extrabold tracking-tight text-[#2c2724] sm:text-6xl font-serif italic leading-[1.1]"
          >
            Clear, Vetted Packages
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mt-4 text-xs sm:text-sm text-[#8a7d6a] max-w-xl mx-auto leading-relaxed"
          >
            Choose a plan to contact property owners directly. If owners fail to reply during your active period, you are fully protected by our 100% refund policy.
          </motion.p>
        </div>

        {/* Pricing Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-20 text-xs">
          {SUBSCRIPTION_PLANS.map((plan, idx) => (
            <motion.div
              key={plan.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 * idx }}
              className={`bg-white p-6 rounded-2xl flex flex-col justify-between border relative overflow-hidden transition-all duration-300 hover:shadow-2xl hover:-translate-y-1 ${
                plan.isFeatured 
                  ? "border-[#cfa052] bg-[#fdfaf2]/50 shadow-[0_10px_35px_rgba(238,185,2,0.12)]" 
                  : "border-[#eae1d3] bg-white hover:border-slate-300 shadow-md"
              }`}
            >
              {plan.isFeatured && (
                <div className="absolute top-0 right-0 bg-[#cfa052] text-slate-950 text-[9px] font-extrabold uppercase py-1 px-3.5 rounded-bl-lg flex items-center space-x-1">
                  <Sparkles className="h-3 w-3" />
                  <span>Recommended</span>
                </div>
              )}
              
              <div>
                <h3 className="text-sm font-bold text-[#2c2724]">{plan.name}</h3>
                
                {/* Subscription cost */}
                <div className="mt-5">
                  <span className="text-2xl font-extrabold text-[#2c2724] tracking-tight">CAD ${plan.priceSub}</span>
                  <span className="text-[#8a7d6a] font-semibold"> / {plan.durationDays} Days</span>
                  <p className="text-[9px] text-[#aba296] mt-1">Auto-renews, cancel anytime</p>
                </div>
                
                <div className="mt-3 border-t border-[#f4efe6] pt-3 text-[10px] text-[#8a7d6a]">
                  <span>One-Time Option: </span>
                  <span className="font-bold text-[#2c2724]">CAD ${plan.priceOneTime}</span>
                  <span className="text-[#aba296]"> (No renewal)</span>
                </div>

                <ul className="mt-6 space-y-3.5 text-[#5c544d] leading-normal">
                  <li className="flex items-center space-x-2">
                    <Check className="h-4 w-4 text-[#cfa052] flex-shrink-0" />
                    <span>
                      {plan.approachesLimit === -1 ? (
                        <strong>Unlimited Owner Contacts</strong>
                      ) : (
                        <span>Up to <strong>{plan.approachesLimit} owner approaches</strong></span>
                      )}
                    </span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <Check className="h-4 w-4 text-[#cfa052] flex-shrink-0" />
                    <span>Verified tenant badge active</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <Check className="h-4 w-4 text-[#cfa052] flex-shrink-0" />
                    <span>Scam Protection Guarantee</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <Check className="h-4 w-4 text-[#cfa052] flex-shrink-0" />
                    <span>100% Refund audit eligibility</span>
                  </li>
                </ul>
              </div>

              <div className="mt-8">
                <Link
                  href="/login"
                  className={`block w-full py-2.5 rounded-lg text-center font-bold transition-all ${
                    plan.isFeatured
                      ? "bg-[#cfa052] text-white hover:bg-[#2c2724] shadow-[0_4px_12px_rgba(207,160,82,0.18)] hover:shadow-[0_4px_18px_rgba(207,160,82,0.3)]"
                      : "bg-[#f4efe6] text-[#352f2a] hover:bg-[#eae1d3] border border-[#eae1d3]"
                  }`}
                >
                  Get Started
                </Link>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Premium Upgrade Match panel */}
        <motion.div 
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="bg-white rounded-2xl border border-[#eae1d3] p-8 flex flex-col md:flex-row items-center justify-between gap-8 mb-20 shadow-lg relative overflow-hidden"
        >
          <div className="space-y-2 md:max-w-xl text-xs">
            <div className="inline-flex items-center space-x-1.5 bg-[#eae1d3] border border-[#eae1d3]/80 text-[#cfa052] text-[9px] font-bold uppercase rounded-full px-3 py-1">
              <Sparkles className="h-3.5 w-3.5" />
              <span>Premium Profile Booster</span>
            </div>
            <h2 className="text-xl font-bold text-[#2c2724]">{URGENT_MATCH_ADDON.name}</h2>
            <p className="text-[#8a7d6a] leading-relaxed">
              {URGENT_MATCH_ADDON.description} Highlights your tenant profile card inside property landlord dashboard lists, accelerating contacts within 72 hours.
            </p>
          </div>
          
          <div className="flex items-center gap-6 text-center md:text-right shrink-0">
            <div className="w-20 h-20 flex items-center justify-center shrink-0 bg-[#fdfbf7] rounded-xl border border-[#f4efe6] p-1.5 shadow-inner">
              <img 
                src="/images/canada_relocation_3d.png" 
                alt="3D Canadian Relocation Key Booster" 
                className="h-full w-full object-contain animate-bounce"
                style={{ animationDuration: '4s' }}
              />
            </div>
            <div className="text-xs">
              <span className="text-2xl font-extrabold text-[#2c2724]">CAD ${URGENT_MATCH_ADDON.price}</span>
              <p className="text-[10px] text-[#8a7d6a] mt-1 mb-4">One-time profile booster fee</p>
              <Link
                href="/signup"
                className="inline-flex rounded-lg bg-[#cfa052] text-white font-bold px-6 py-2.5 hover:bg-[#2c2724] transition-colors shadow-md"
              >
                Add to Profile
              </Link>
            </div>
          </div>
        </motion.div>

        {/* Refund disclosure */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="text-center max-w-2xl mx-auto border-t border-[#eae1d3] pt-12 text-xs"
        >
          <div className="inline-flex items-center justify-center rounded-full bg-[#eae1d3] border border-[#f4efe6] p-2.5 text-[#cfa052] mb-4 shadow-sm">
            <ShieldCheck className="h-5 w-5" />
          </div>
          <h3 className="font-bold text-[#2c2724] text-base">Automatic Verification Audit Refund Protection</h3>
          <p className="text-[#8a7d6a] mt-2 leading-relaxed">
            NestArrival enforces an escrow-free safety model. If you purchase a subscription and receive zero (0) responses from property owners in our chat rooms, you are eligible to claim a full refund. Our administrators run automatic audits on message history logs to verify the claim.
          </p>
        </motion.div>
      </main>

      <Footer />
    </div>
  );
}
