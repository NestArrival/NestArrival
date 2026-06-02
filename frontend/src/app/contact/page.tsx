"use client";

import { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Mail, HelpCircle, CheckCircle, Loader2, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";

export default function ContactPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !subject || !message) return;

    setStatus("submitting");

    setTimeout(() => {
      console.log(`\n==================================================`);
      console.log(`[NestArrival Support Ticket]`);
      console.log(`From: ${name} (${email})`);
      console.log(`Subject: ${subject}`);
      console.log(`Message: ${message}`);
      console.log(`==================================================\n`);
      
      setStatus("success");
      setName("");
      setEmail("");
      setSubject("");
      setMessage("");
    }, 1000);
  };

  return (
    <div className="flex flex-col min-h-screen bg-[#fdfbf7] text-[#5c544d]">
      <Navbar />
      
      {/* Decorative radial background */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(207,160,82,0.03)_0%,transparent_50%)] pointer-events-none z-0 h-[500px]" />

      <main className="flex-grow mx-auto max-w-4xl px-4 py-20 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-16 space-y-4">
          <motion.span 
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-[10px] text-[#cfa052] font-extrabold uppercase tracking-widest bg-[#eae1d3] px-3 py-1.5 rounded-full border border-[#eae1d3]/50 inline-block shadow-sm"
          >
            Support Portal
          </motion.span>
          <motion.h1 
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-3xl font-extrabold tracking-tight text-[#2c2724] sm:text-5xl font-serif italic"
          >
            Help Center & Support
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mt-4 text-xs sm:text-sm text-[#8a7d6a] max-w-xl mx-auto leading-relaxed"
          >
            Have questions regarding document uploads, residency verification, or refund eligibility? Send a support ticket and our team will follow up within 24 hours.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Support Info Side Card */}
          <div className="md:col-span-1 space-y-4 text-xs">
            <motion.div 
              initial={{ opacity: 0, x: -15 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="bg-white p-6 rounded-2xl border border-[#eae1d3] shadow-md space-y-3"
            >
              <div className="flex items-center space-x-2 text-[#cfa052] font-bold">
                <HelpCircle className="h-4.5 w-4.5" />
                <span>Verification Support</span>
              </div>
              <p className="text-[11px] text-[#8a7d6a] leading-relaxed">
                Check our official Verification Policy in the footer to review the exact documents accepted for Citizens, PR holders, Workers, and Students.
              </p>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, x: -15 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="bg-white p-6 rounded-2xl border border-[#eae1d3] shadow-md space-y-3"
            >
              <div className="flex items-center space-x-2 text-[#cfa052] font-bold">
                <Mail className="h-4.5 w-4.5" />
                <span>Vetting Help Desk</span>
              </div>
              <p className="text-[#2c2724] font-semibold font-mono text-[11px] hover:text-[#cfa052] transition-colors">
                support@nestarrival.ca
              </p>
              <p className="text-[10px] text-[#aba296]">
                Response within 1 business day.
              </p>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, x: -15 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="bg-white p-6 rounded-2xl border border-[#eae1d3] shadow-md flex items-center justify-center bg-gradient-to-br from-white to-slate-50/50 h-28"
            >
              <img 
                src="/images/trust_shield_3d.png" 
                alt="NestArrival 3D Shield Indicator" 
                className="h-16 w-16 object-contain animate-pulse"
                style={{ animationDuration: '3s' }}
              />
            </motion.div>
          </div>

          {/* Ticket Form */}
          <motion.div 
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="md:col-span-2"
          >
            <div className="bg-white p-8 rounded-2xl border border-[#eae1d3] shadow-xl">
              <h2 className="text-sm font-bold text-[#2c2724] mb-6">File a Support Ticket</h2>

              {status === "success" && (
                <div className="mb-6 rounded-lg bg-emerald-50 border border-emerald-250 p-4 text-emerald-600 text-xs flex items-center space-x-2">
                  <CheckCircle className="h-5 w-5 text-emerald-600 flex-shrink-0" />
                  <span>Your ticket has been logged successfully. We will follow up soon!</span>
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-5 text-xs">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block font-bold text-[#8a7d6a] mb-1.5">Your Full Name</label>
                    <input
                      type="text"
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="e.g. John Doe"
                      className="w-full rounded-lg px-3 py-2.5 glass-input text-slate-950 text-xs"
                    />
                  </div>
                  <div>
                    <label className="block font-bold text-[#8a7d6a] mb-1.5">Email Address</label>
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="e.g. john@example.com"
                      className="w-full rounded-lg px-3 py-2.5 glass-input text-slate-950 text-xs"
                    />
                  </div>
                </div>

                <div>
                  <label className="block font-bold text-[#8a7d6a] mb-1.5">Subject</label>
                  <input
                    type="text"
                    required
                    value={subject}
                    onChange={(e) => setSubject(e.target.value)}
                    placeholder="e.g. Documentation question regarding study permits"
                    className="w-full rounded-lg px-3 py-2.5 glass-input text-slate-950 text-xs"
                  />
                </div>

                <div>
                  <label className="block font-bold text-[#8a7d6a] mb-1.5">Message Detail</label>
                  <textarea
                    rows={4}
                    required
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Describe your question here..."
                    className="w-full rounded-lg px-3 py-2.5 glass-input text-slate-950 text-xs resize-none"
                  ></textarea>
                </div>

                <button
                  type="submit"
                  disabled={status === "submitting"}
                  className="w-full rounded-lg bg-[#cfa052] text-white hover:bg-[#2c2724] py-3 text-center text-xs font-bold transition-all shadow-[0_4px_12px_rgba(207,160,82,0.15)] hover:shadow-[0_4px_20px_rgba(207,160,82,0.25)] cursor-pointer"
                >
                  {status === "submitting" ? (
                    <span className="flex items-center justify-center gap-1.5">
                      <Loader2 className="h-4.5 w-4.5 animate-spin" />
                      <span>Filing Ticket...</span>
                    </span>
                  ) : (
                    <span className="flex items-center justify-center gap-1.5">
                      <span>Submit Support Ticket</span>
                      <ArrowRight className="h-3.5 w-3.5" />
                    </span>
                  )}
                </button>
              </form>
            </div>
          </motion.div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
