"use client";

import Link from "next/link";
import Image from "next/image";
import { motion, Variants } from "framer-motion";
import { ArrowRight, CheckCircle2, ShieldCheck, Sparkles } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const steps = [
  {
    number: "01",
    title: "Create Your Profile",
    description:
      "Tell us where you're moving, your budget, move-in timeline, and accommodation preferences. We learn your needs from day one.",
    image: "/images/authimg.png",
  },
  {
    number: "02",
    title: "Get Verified",
    description:
      "We verify tenants and property owners to create a safer rental ecosystem and reduce scams, fake listings, and unsafe interactions.",
    image: "/images/trust_shield_3d.png",
  },
  {
    number: "03",
    title: "Explore Verified Listings",
    description:
      "Browse verified accommodations for free with smart filters for city, budget, housing type, move-in date, and lifestyle needs.",
    image: "/images/vancouver_townhouse.png",
  },
  {
    number: "04",
    title: "Receive Personalized Matches",
    description:
      "Our platform highlights homes and owners that fit your relocation profile, so you spend less time searching and more time planning.",
    image: "/images/montreal_studio.png",
  },
  {
    number: "05",
    title: "Connect Securely",
    description:
      "Chat with verified property owners through a trusted platform built to keep conversations clear, accountable, and secure.",
    image: "/images/canada-vancouver-seawall.png",
  },
  {
    number: "06",
    title: "Move With Confidence",
    description:
      "Enjoy a guided relocation experience with support throughout your journey, from shortlist to move-in day.",
    image: "/images/canada_relocation_3d.png",
  },
  {
    number: "07",
    title: "Refund-Backed Trust",
    description:
      "If meaningful connections aren't made, refund options may apply, giving you an extra layer of peace of mind.",
    image: "/images/toronto_loft.png",
  },
];

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.12 },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" },
  },
};

export default function HowItWorksView() {
  return (
    <div className="flex min-h-[100dvh] flex-col overflow-x-hidden bg-[#fdfbf7] text-[#2c2724]">
      <Navbar />

      <main className="flex-1">
        <section className="relative overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(207,160,82,0.08)_0%,transparent_55%)]" />
          <div className="mx-auto grid max-w-7xl gap-10 px-4 py-20 sm:px-6 lg:grid-cols-[1.1fr_0.9fr] lg:px-8 lg:py-24">
            <motion.div
              initial="hidden"
              animate="visible"
              variants={containerVariants}
              className="relative z-10 flex flex-col justify-center"
            >
              <motion.div
                variants={itemVariants}
                className="mb-6 inline-flex w-fit items-center gap-2 rounded-full border border-[#eae1d3] bg-white px-4 py-2 text-[11px] font-bold uppercase tracking-[0.25em] text-[#a38a70] shadow-sm"
              >
                <Sparkles className="h-4 w-4 text-[#cfa052]" />
                How NestArrival Works
              </motion.div>
              <motion.h1
                variants={itemVariants}
                className="font-serif text-4xl font-black leading-tight sm:text-5xl lg:text-6xl"
              >
                A calmer way to{" "}
                <span className="text-[#cfa052] italic">relocate abroad</span>.
              </motion.h1>
              <motion.p
                variants={itemVariants}
                className="mt-5 max-w-2xl text-base leading-relaxed text-[#5c544d] sm:text-lg"
              >
                NestArrival helps international tenants and verified property
                owners meet through a trust-first process designed to reduce
                risk, speed up decisions, and make long-distance housing feel
                human again.
              </motion.p>

              <motion.div variants={itemVariants} className="mt-8 flex flex-col gap-3 sm:flex-row">
                <Link
                  href="/signup"
                  className="inline-flex items-center justify-center gap-2 rounded-full bg-[#cfa052] px-6 py-3.5 text-sm font-bold text-white shadow-[0_10px_25px_rgba(207,160,82,0.28)] transition-all hover:-translate-y-0.5 hover:bg-[#b58942]"
                >
                  Get Started
                  <ArrowRight className="h-4 w-4" />
                </Link>
                <Link
                  href="/about"
                  className="inline-flex items-center justify-center gap-2 rounded-full border border-[#eae1d3] bg-white px-6 py-3.5 text-sm font-bold text-[#5c544d] transition-all hover:border-[#cfa052] hover:text-[#cfa052]"
                >
                  Learn More
                </Link>
              </motion.div>

              <motion.div variants={itemVariants} className="mt-8 grid gap-3 sm:grid-cols-3">
                {[
                  "Verification first",
                  "Personalized matches",
                  "Refund-backed trust",
                ].map((label) => (
                  <div
                    key={label}
                    className="rounded-2xl border border-[#eae1d3] bg-white px-4 py-3 text-sm font-semibold text-[#2c2724] shadow-sm"
                  >
                    {label}
                  </div>
                ))}
              </motion.div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="relative z-10"
            >
              <div className="relative overflow-hidden rounded-[2.25rem] border border-[#eae1d3] bg-white shadow-[0_25px_60px_rgba(44,39,36,0.08)]">
                <div className="absolute inset-0 bg-gradient-to-br from-[#cfa052]/10 via-transparent to-[#2c2724]/10" />
                <div className="grid gap-3 p-4 sm:grid-cols-[1.2fr_0.8fr]">
                  <div className="relative min-h-[320px] overflow-hidden rounded-[1.75rem]">
                    <Image
                      src="/images/authimg.png"
                      alt="Verified housing interior"
                      fill
                      sizes="(max-width: 1024px) 100vw, 55vw"
                      className="object-cover"
                    />
                  </div>
                  <div className="grid gap-3">
                    <div className="relative min-h-[154px] overflow-hidden rounded-[1.5rem]">
                      <Image
                        src="/images/trust_shield_3d.png"
                        alt="Trust shield"
                        fill
                        sizes="(max-width: 1024px) 100vw, 25vw"
                        className="object-cover"
                      />
                    </div>
                    <div className="rounded-[1.5rem] border border-[#eae1d3] bg-[#fdfbf7] p-4">
                      <div className="flex items-center gap-2 text-[#cfa052]">
                        <ShieldCheck className="h-4 w-4" />
                        <span className="text-[10px] font-black uppercase tracking-[0.25em]">
                          Trusted Process
                        </span>
                      </div>
                      <p className="mt-3 text-sm leading-relaxed text-[#5c544d]">
                        Every stage is designed to make cross-border renting
                        safer, clearer, and more confident.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        <section className="px-4 py-8 sm:px-6 lg:px-8 lg:py-12">
          <div className="mx-auto max-w-7xl">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-120px" }}
              variants={containerVariants}
              className="grid gap-5 md:grid-cols-2 xl:grid-cols-3"
            >
              {steps.map((step) => (
                <motion.article
                  key={step.number}
                  variants={itemVariants}
                  className="group overflow-hidden rounded-[2rem] border border-[#eae1d3] bg-white shadow-[0_10px_30px_rgba(44,39,36,0.04)] transition-all hover:-translate-y-1 hover:shadow-[0_16px_40px_rgba(44,39,36,0.08)]"
                >
                  <div className="relative h-52 overflow-hidden bg-[#f4efe6]">
                    <Image
                      src={step.image}
                      alt={step.title}
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw"
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#2c2724]/50 via-transparent to-transparent" />
                    <span className="absolute left-4 top-4 rounded-full border border-white/30 bg-white/90 px-3 py-1 text-[10px] font-black tracking-[0.28em] text-[#cfa052]">
                      STEP {step.number}
                    </span>
                  </div>
                  <div className="space-y-4 p-6">
                    <h3 className="font-serif text-2xl font-bold text-[#2c2724]">
                      {step.title}
                    </h3>
                    <p className="text-sm leading-relaxed text-[#5c544d]">
                      {step.description}
                    </p>
                    <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-[0.22em] text-[#a38a70]">
                      <CheckCircle2 className="h-4 w-4 text-[#cfa052]" />
                      Verified step
                    </div>
                  </div>
                </motion.article>
              ))}
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.6 }}
              className="mt-8 rounded-[2rem] border border-[#eae1d3] bg-[#2c2724] px-6 py-8 text-white shadow-[0_18px_40px_rgba(44,39,36,0.18)] sm:px-8"
            >
              <div className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
                <div>
                  <p className="text-[10px] font-black uppercase tracking-[0.35em] text-[#e7c98b]">
                    What Makes It Different
                  </p>
                  <h2 className="mt-3 font-serif text-3xl font-bold sm:text-4xl">
                    Built for trust, clarity, and real support.
                  </h2>
                  <p className="mt-4 max-w-2xl text-sm leading-relaxed text-white/78 sm:text-base">
                    The experience blends verification, matching, and secure
                    communication so newcomers can focus on the move, not the
                    risks.
                  </p>
                </div>

                <div className="grid gap-3 sm:grid-cols-2">
                  {[
                    "Identity and document checks",
                    "Verified property owners",
                    "Smart relocation recommendations",
                    "Refund-backed confidence",
                  ].map((item) => (
                    <div
                      key={item}
                      className="rounded-2xl border border-white/10 bg-white/5 px-4 py-4 text-sm font-semibold text-white/90"
                    >
                      {item}
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
