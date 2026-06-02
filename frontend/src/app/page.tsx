"use client";

import { useEffect, useState, useRef } from "react";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import TiltCard from "@/components/TiltCard";
import CustomDropdown from "@/components/CustomDropdown";
import CustomDatePicker from "@/components/CustomDatePicker";
import {
  ShieldCheck, ArrowRight, CheckCircle2,
  ShieldAlert, Sparkles, Compass,
  Building, Users, Mail, Phone, MapPin, ChevronDown, Check,
  GraduationCap, Briefcase, Heart, Globe, DollarSign, Search, Calendar
} from "lucide-react";
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion";
import gsap from "gsap";

/* ── Animated Counter ────────────────────────────────────────────── */
function AnimatedCounter({ target, suffix = "", prefix = "" }: { target: number; suffix?: string; prefix?: string }) {
  const [count, setCount] = useState(0);
  const [inView, setInView] = useState(false);
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    if (!ref.current) return;
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setInView(true); },
      { threshold: 0.5 }
    );
    observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!inView) return;
    let start = 0;
    const duration = 1500;
    const startTime = Date.now();
    const tick = () => {
      const elapsed = Date.now() - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      start = Math.round(eased * target);
      setCount(start);
      if (progress < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  }, [inView, target]);

  return <span ref={ref}>{prefix}{count}{suffix}</span>;
}

/* ── Stagger Variants ────────────────────────────────────────────── */
const staggerContainer = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12 } },
};
const fadeUpItem = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" as const } },
};

/* ══════════════════════════════════════════════════════════════════ */
export default function HomePage() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  // Floating Search Bar State
  const [searchRole, setSearchRole] = useState("Tenant");
  const [searchLocation, setSearchLocation] = useState("");
  const [searchDate, setSearchDate] = useState("");
  const [searchType, setSearchType] = useState("");

  // Enquiry Form State
  const [formStep, setFormStep] = useState(0);
  const [formData, setFormData] = useState({
    fullName: "", email: "", originCountry: "India", destinationCity: "Toronto",
    visaStatus: "Yes", visaType: "Student Visa", plannedMoveDate: "1-3 months",
    purposeOfMove: "Studies", rentalDuration: "1 Year", budget: "1500",
    accommodationType: "Shared Space",
  });
  const [formSubmitted, setFormSubmitted] = useState(false);

  // GSAP refs
  const heroRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const subheadingRef = useRef<HTMLParagraphElement>(null);
  const heroImageRef = useRef<HTMLDivElement>(null);
  const searchBarRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [0, 150]);
  const rotateX = useTransform(scrollYProgress, [0, 1], [0, 15]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: "power3.out", duration: 1 } });
      if (headingRef.current) tl.fromTo(headingRef.current, { opacity: 0, y: 40 }, { opacity: 1, y: 0, delay: 0.1 });
      if (subheadingRef.current) tl.fromTo(subheadingRef.current, { opacity: 0, y: 25 }, { opacity: 1, y: 0 }, "-=0.7");
      if (heroImageRef.current) tl.fromTo(heroImageRef.current, { opacity: 0, x: 40, scale: 0.95 }, { opacity: 1, x: 0, scale: 1, duration: 1.2 }, "-=0.7");
      if (searchBarRef.current) tl.fromTo(searchBarRef.current, { opacity: 0, y: 50 }, { opacity: 1, y: 0, duration: 0.8 }, "-=0.5");
    }, heroRef);
    return () => ctx.revert();
  }, []);

  /* ── Data ──────────────────────────────────────────────────────── */
  const floorPlanPreviews = [
    { type: "Student Housing", title: "Cozy Shared Student Unit", rent: "850", city: "Toronto", specs: "Private Bedroom, Shared Lounge", dim: "12' x 14'", tag: "Close to Subway & UofT", image: "/images/toronto_loft.png" },
    { type: "Professional Apartments", title: "Modern Downtown Suite", rent: "1,950", city: "Vancouver", specs: "1 Bedroom Studio, Full Kitchen", dim: "24' x 20'", tag: "Tech District Connected", image: "/images/vancouver_townhouse.png" },
    { type: "Shared Space", title: "Newcomer Co-Living Condo", rent: "750", city: "Montreal", specs: "Private Room, Fully Furnished", dim: "11' x 12'", tag: "Affordable Launch Pad", image: "/images/montreal_studio.png" },
    { type: "Family Homes", title: "Spacious Suburban Townhouse", rent: "2,800", city: "Mississauga", specs: "3 Bedrooms, 2.5 Bathrooms", dim: "1500 sq ft", tag: "Safe Schools & Parks" },
  ];

  const faqs = [
    { q: "What is NestArrival?", a: "NestArrival is a trust-first global relocation and accommodation platform. We help verified international tenants, immigrants, workers, and students safely connect with vetted property owners abroad before boarding their flight to their destination country." },
    { q: "Who can use NestArrival?", a: "Our platform is custom-built for international students, foreign workers, relocating families, permanent residents, and temporary newcomers moving across borders—starting with incoming relocators from third-world countries to Canada." },
    { q: "Is browsing and searching properties free?", a: "Yes! Searching and exploring rental opportunities is 100% free of charge. NestArrival only charges a platform connection fee when verified tenants connect directly with verified property owners to secure their accommodation." },
    { q: "How does the refund-backed connection model work?", a: "We believe in absolute accountability. If NestArrival is unable to help you receive proper, meaningful replies from verified landlords within your matching parameters, your connection fee is automatically refunded in full." },
    { q: "Why is NestArrival different from other rental search platforms?", a: "Traditional platforms ignore international tenants, require local credit scores, or contain scams. NestArrival manual-vets landlord land titles and tenant visa details to guarantee zero overseas scams and responsive cross-border matches." },
    { q: "What documents do property owners need to verify?", a: "Property owners must upload passport or driver's license identification alongside verified local land title deeds or municipal property tax records to prove they legitimately own the property listed." },
  ];

  const handleFormChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const handleFormSubmit = (e: React.FormEvent) => { e.preventDefault(); setFormSubmitted(true); };

  const partnerTypes = [
    { icon: GraduationCap, label: "Colleges & Universities" },
    { icon: ShieldCheck, label: "Immigration Consultants" },
    { icon: Building, label: "Property Landlords & Realtors" },
    { icon: Users, label: "Settlement Networks" },
    { icon: Globe, label: "Immigration Platforms" },
  ];

  /* ══════════════════════════════════════════════════════════════ */
  return (
    <div className="flex flex-col min-h-screen bg-[#fdfbf7] text-[#2c2724] overflow-x-hidden font-sans">
      <Navbar />

      {/* ═══ 1. HERO (REDESIGNED) ══════════════════════════════════ */}
      <section ref={heroRef} className="relative pt-12 pb-32 px-4 sm:px-6 lg:px-8 z-10" style={{ perspective: "1000px" }}>
        
        {/* Background Video Wrapper */}
        <div className="absolute inset-0 overflow-hidden z-0 bg-[#fdfbf7]">
          <video 
            autoPlay 
            loop 
            muted 
            playsInline 
            className="absolute inset-0 w-full h-full object-cover opacity-50 pointer-events-none"
          >
            <source src="https://videos.pexels.com/video-files/3121459/3121459-uhd_2560_1440_24fps.mp4" type="video/mp4" />
          </video>
          {/* Strong gradient on the left side for text legibility */}
          <div className="absolute inset-0 bg-gradient-to-r from-[#fdfbf7] via-[#fdfbf7]/80 to-transparent pointer-events-none w-full lg:w-2/3" />
          {/* Vertical fading to blend with page */}
          <div className="absolute inset-0 bg-gradient-to-b from-[#fdfbf7]/95 via-transparent to-[#fdfbf7]/95 pointer-events-none" />
        </div>

        <div className="absolute top-0 right-0 w-2/3 h-full bg-gradient-to-l from-[#eae1d3]/20 to-transparent pointer-events-none rounded-bl-full opacity-50 z-0" />

        <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center justify-between relative z-10 gap-12">
          
          {/* Left: Typography */}
          <div className="lg:w-1/2 space-y-6 relative z-20 text-center lg:text-left mt-2">
            <h1 ref={headingRef} className="font-serif text-5xl sm:text-6xl lg:text-7xl font-bold text-[#2c2724] tracking-tight leading-[1.1] opacity-0">
              Find Your <br className="hidden lg:block"/>
              Dream Home <br className="hidden lg:block"/>
              <span className="text-[#cfa052] italic font-serif">Before You Arrive.</span>
            </h1>
            
            <p ref={subheadingRef} className="text-base text-[#5c544d] max-w-xl mx-auto lg:mx-0 leading-relaxed opacity-0">
              Explore a curated, scam-free selection of verified properties. Filter by location, budget, and permit status — all with absolute confidence and refund-backed trust.
            </p>

            {/* Main CTA */}
            <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6 }} className="flex justify-center lg:justify-start pt-4">
              <button className="bg-[#cfa052] hover:bg-[#b58942] text-white px-8 py-4 rounded-full font-bold shadow-[0_8px_20px_rgba(207,160,82,0.3)] hover:shadow-[0_15px_30px_rgba(207,160,82,0.5)] hover:-translate-y-1 transition-all duration-300 flex items-center gap-2 group text-sm uppercase tracking-wide">
                Start Your Journey
                <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </button>
            </motion.div>
          </div>

          {/* Right: Aspirational Image */}
          <div ref={heroImageRef} className="lg:w-1/2 relative opacity-0 w-full max-w-2xl mx-auto">
            <motion.div style={{ y, rotateX }} className="relative z-10">
              <div className="absolute inset-0 bg-[#cfa052]/10 rounded-[3rem] transform translate-x-4 translate-y-4" />
            <img 
              src="/images/vancouver_townhouse.png" 
              alt="Beautiful Canadian Home" 
              className="relative w-full h-[450px] lg:h-[550px] object-cover rounded-[3rem] shadow-[0_30px_60px_rgba(44,39,36,0.12)] border-[8px] border-white"
            />
            {/* Floating badge */}
            <div className="absolute -bottom-6 -left-6 bg-white p-4 rounded-2xl shadow-xl border border-[#eae1d3] flex items-center gap-3 animate-float-delayed">
              <div className="h-10 w-10 bg-emerald-50 rounded-full flex items-center justify-center text-emerald-600">
                <ShieldCheck className="h-5 w-5" />
              </div>
              <div>
                <p className="text-[10px] text-[#5c544d] font-bold uppercase tracking-wider">100% Verified</p>
                <p className="text-sm font-black text-[#2c2724]">Scam-Free Homes</p>
              </div>
            </div>
            </motion.div>
          </div>
        </div>

        {/* Floating Relocation Matchmaker Bar */}
        <div ref={searchBarRef} className="absolute left-1/2 -translate-x-1/2 -bottom-40 md:-bottom-12 w-[90%] max-w-5xl z-30 opacity-0">
          <motion.div style={{ y, rotateX }} className="bg-white rounded-3xl shadow-[0_20px_50px_rgba(44,39,36,0.08)] border border-[#eae1d3] p-3">
            {/* Tabs */}
            <div className="flex border-b border-[#eae1d3] px-4 pb-2 gap-6">
              <button onClick={() => setSearchRole("Tenant")} className={`text-xs font-bold pb-2 border-b-2 transition-colors ${searchRole === "Tenant" ? "border-[#cfa052] text-[#cfa052]" : "border-transparent text-[#8a7d6a] hover:text-[#2c2724]"}`}>Find a Home</button>
              <button onClick={() => setSearchRole("Owner")} className={`text-xs font-bold pb-2 border-b-2 transition-colors ${searchRole === "Owner" ? "border-[#cfa052] text-[#cfa052]" : "border-transparent text-[#8a7d6a] hover:text-[#2c2724]"}`}>List a Property</button>
            </div>
            
            {/* Fields */}
            <div className="flex flex-col md:flex-row items-center justify-between p-4 gap-4">
              <div className="flex-1 w-full md:border-r border-[#eae1d3] px-2 flex items-center gap-3">
                <MapPin className="text-[#cfa052] h-5 w-5 opacity-70" />
                <div className="w-full">
                  <p className="text-[10px] uppercase font-bold text-[#8a7d6a]">Location</p>
                  <input type="text" placeholder="Toronto, Vancouver..." value={searchLocation} onChange={(e) => setSearchLocation(e.target.value)} className="w-full text-sm font-bold text-[#2c2724] outline-none placeholder:text-[#a89e8d]" />
                </div>
              </div>
              
              <div className="flex-1 w-full md:border-r border-[#eae1d3] px-2 flex items-center gap-3 relative z-40">
                <Building className="text-[#cfa052] h-5 w-5 opacity-70" />
                <div className="w-full">
                  <p className="text-[10px] uppercase font-bold text-[#8a7d6a] mb-0.5">Property Type</p>
                  <CustomDropdown
                    options={["Any Type", "Apartment", "Shared Room", "House"]}
                    value={searchType}
                    onChange={setSearchType}
                    placeholder="Any Type"
                  />
                </div>
              </div>

              <div className="flex-1 w-full px-2 flex items-center gap-3 relative z-40">
                <Calendar className="text-[#cfa052] h-5 w-5 opacity-70" />
                <div className="w-full">
                  <p className="text-[10px] uppercase font-bold text-[#8a7d6a] mb-0.5">Move Date</p>
                  <CustomDatePicker
                    value={searchDate}
                    onChange={setSearchDate}
                    placeholder="dd-mm-yyyy"
                  />
                </div>
              </div>
              
              <button className="relative overflow-hidden w-full md:w-auto bg-gradient-to-r from-[#cfa052] to-[#b58942] hover:to-[#a37937] text-white px-8 py-3.5 rounded-2xl flex items-center justify-center gap-2 font-bold transition-all duration-300 shadow-[0_10px_25px_rgba(207,160,82,0.4)] hover:shadow-[0_15px_35px_rgba(207,160,82,0.6)] hover:-translate-y-1 group">
                <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out" />
                <Search className="h-4 w-4 relative z-10" /> 
                <span className="relative z-10">Search</span>
              </button>
            </div>
          </motion.div>
        </div>
      </section>

      <div className="h-56 md:h-24 bg-[#f4efe6]"></div> {/* Spacer for the floating bar */}

      {/* ═══ 2. VISION ═════════════════════════════════════════════ */}
      <section className="relative py-32 px-4 sm:px-6 lg:px-8 bg-[#f4efe6] wavy-divider-top">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-14 items-center">
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}
              className="lg:col-span-5 space-y-6">
              <div className="inline-flex items-center space-x-1.5 text-[10px] text-[#cfa052] font-extrabold uppercase tracking-widest">
                <Compass className="h-3.5 w-3.5" /><span>The Story Behind Us</span>
              </div>
              <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#2c2724] tracking-tight leading-[1.1]">
                To Make Moving In Globally Hassle-Free.
              </h2>
              <p className="text-sm text-[#5c544d] leading-relaxed">
                NestArrival is pioneering a trust-driven accommodation ecosystem where landlords securely verify their titles, and incoming tenants confirm their legal permits. We bridge the distance with digital vetting, removing communication friction, unanswered inquiries, and listing stress before departure.
              </p>
              <div className="grid grid-cols-2 gap-4 text-xs font-black pt-2">
                {["Fraud Prevention Vetting", "Smart Location Discovery", "Verified User Registry", "Refund-Backed Connection"].map((item) => (
                  <div key={item} className="flex items-center gap-2 text-[#2c2724]">
                    <CheckCircle2 className="h-4 w-4 text-[#cfa052] flex-shrink-0" /><span>{item}</span>
                  </div>
                ))}
              </div>
            </motion.div>

            <motion.div initial={{ opacity: 0, scale: 0.95 }} whileInView={{ opacity: 1, scale: 1 }} transition={{ duration: 0.7 }}
              className="lg:col-span-7">
              <div className="p-8 bg-white border border-[#eae1d3] rounded-3xl space-y-6 relative shadow-[0_20px_60px_rgba(44,39,36,0.06)]">
                <div className="bg-[#fdfbf7] rounded-2xl border border-[#eae1d3] p-4 shadow-sm flex items-center justify-between animate-float-delayed">
                  <div className="flex items-center space-x-3">
                    <div className="h-10 w-10 bg-[#eae1d3] border border-[#cfa052]/20 rounded-full flex items-center justify-center text-[#2c2724] font-bold text-sm">IN</div>
                    <div>
                      <p className="font-extrabold text-xs text-[#2c2724]">Arjun Sharma (Student Vetted)</p>
                      <p className="text-[10px] text-[#8a7d6a]">Delhi, India → Brampton, Canada</p>
                    </div>
                  </div>
                  <span className="text-[9px] bg-[#cfa052]/10 text-[#cfa052] font-extrabold border border-[#cfa052]/20 rounded-full px-2 py-0.5 uppercase">Verified</span>
                </div>

                <div className="flex justify-center py-2">
                  <div className="w-0.5 h-8 border-r-2 border-dashed border-[#cfa052]/40" />
                </div>

                <div className="bg-[#fdfbf7] rounded-2xl border border-[#eae1d3] p-4 shadow-sm flex items-center justify-between animate-float">
                  <div className="flex items-center space-x-3">
                    <div className="h-10 w-10 bg-[#eae1d3] border border-[#cfa052]/20 rounded-full flex items-center justify-center text-[#2c2724]">
                      <Building className="h-5 w-5" />
                    </div>
                    <div>
                      <p className="font-extrabold text-xs text-[#2c2724]">Ontario Vetted Duplex Complex</p>
                      <p className="text-[10px] text-[#8a7d6a]">Owner Title Vetted & Local Land Checked</p>
                    </div>
                  </div>
                  <span className="text-[9px] bg-emerald-50 text-emerald-600 font-extrabold border border-emerald-100 rounded-full px-2 py-0.5 uppercase">Verified Owner</span>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ═══ 3. ABOUT ══════════════════════════════════════════════ */}
      <section className="py-28 px-4 sm:px-6 lg:px-8 bg-[#fdfbf7]">
        <div className="max-w-6xl mx-auto space-y-14">
          <div className="text-center max-w-3xl mx-auto space-y-4">
            <span className="text-[10px] text-[#cfa052] font-extrabold uppercase tracking-widest">About Us</span>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#2c2724] tracking-tight">Redefining Global Accommodation for Modern Relocation</h2>
          </div>

          <motion.div variants={staggerContainer} initial="hidden" whileInView="visible"
            className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { icon: ShieldCheck, title: "Vetting-First Ecosystem", desc: "Both tenants and property owners submit legally verified documentations, eradicating fake listings, scams, and fraudulent accounts.", label: "01 / Safety First" },
              { icon: Users, title: "Personalized Matching", desc: "Matches are facilitated based on move-in date alignment, student/worker preferences, budget constraints, and locations.", label: "02 / Smart Match" },
              { icon: DollarSign, title: "Refund Guarantee Assurance", desc: "If NestArrival is unable to secure responses or active connections with vetted owners, we refund your platform fee in full.", label: "03 / Guaranteed Risk-Free" },
            ].map((card) => (
              <motion.div key={card.title} variants={fadeUpItem}
                className="bg-white p-7 rounded-3xl border border-[#eae1d3] shadow-[0_8px_30px_rgba(44,39,36,0.04)] space-y-4 flex flex-col justify-between h-72 hover-lift group">
                <div className="space-y-3">
                  <div className="inline-flex p-3 rounded-2xl bg-[#f4efe6] text-[#cfa052] transition-colors group-hover:bg-[#cfa052] group-hover:text-white">
                    <card.icon className="h-5 w-5" />
                  </div>
                  <h3 className="text-sm font-black text-[#2c2724]">{card.title}</h3>
                  <p className="text-[11px] text-[#5c544d] leading-relaxed">{card.desc}</p>
                </div>
                <span className="text-[9px] text-[#a89e8d] font-extrabold tracking-wider uppercase">{card.label}</span>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ═══ 4. PROBLEM WE SOLVE ═══════════════════════════════════ */}
      <section className="py-28 px-4 sm:px-6 lg:px-8 bg-[#f4efe6]">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-14 items-center">
            <motion.div initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} transition={{ duration: 0.6 }}
              className="lg:col-span-6 space-y-6">
              <div className="inline-flex items-center space-x-1.5 text-[10px] text-[#cfa052] font-extrabold uppercase tracking-widest">
                <ShieldAlert className="h-3.5 w-3.5" /><span>The Global Housing Problem</span>
              </div>
              <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#2c2724] tracking-tight leading-[1.1]">
                Moving Abroad Shouldn&apos;t Start With Housing Stress.
              </h2>
              <p className="text-sm text-[#5c544d] leading-relaxed">
                Relocating is emotionally overwhelming. Traditional rental portals ignore international applicants because they lack local references or credit scores, resulting in:
              </p>
              <ul className="space-y-3 text-xs text-[#2c2724] font-medium">
                {["Fake listings and online rental scams demanding deposits.", "Ignored messages and unanswered landlord inquiries.", "Expensive and unstable temporary hotel stays on arrival.", "No ability to vet property owners from across borders."].map((item) => (
                  <li key={item} className="flex items-start gap-2.5">
                    <span className="text-red-500/80 font-bold flex-shrink-0 mt-0.5">✕</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </motion.div>

            <motion.div initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }} transition={{ duration: 0.6 }}
              className="lg:col-span-6 bg-white border border-[#eae1d3] rounded-3xl p-8 space-y-6 shadow-[0_15px_50px_rgba(44,39,36,0.05)]">
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-full bg-[#f4efe6] flex items-center justify-center text-[#cfa052]">
                  <ShieldAlert className="h-5 w-5" />
                </div>
                <h3 className="font-extrabold text-sm text-[#2c2724]">Why Traditional Sites Ignore You</h3>
              </div>
              <p className="text-[11px] text-[#5c544d] leading-relaxed">
                Most platforms mandate Canadian credit checks or tax documentation that international students and foreign workers don&apos;t possess yet. NestArrival solves this by replacing local references with secure identity & visa vetting.
              </p>
              <div className="border-t border-[#eae1d3] pt-5 flex gap-8 text-xs font-black">
                <div className="text-[#5c544d]">
                  <span className="text-[#cfa052] block text-3xl font-black font-serif">
                    <AnimatedCounter target={90} suffix="%+" />
                  </span>
                  <span className="uppercase text-[9px] tracking-widest mt-1 block">scam reduction</span>
                </div>
                <div className="border-l border-[#eae1d3] pl-8 text-[#5c544d]">
                  <span className="text-[#cfa052] block text-3xl font-black font-serif">
                    <AnimatedCounter target={100} suffix="%" />
                  </span>
                  <span className="uppercase text-[9px] tracking-widest mt-1 block">refund backed</span>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ═══ 5. HOW IT WORKS ═══════════════════════════════════════ */}
      <section className="py-28 px-4 sm:px-6 lg:px-8 bg-[#fdfbf7]">
        <div className="max-w-6xl mx-auto space-y-14">
          <div className="text-center max-w-3xl mx-auto space-y-4">
            <span className="text-[10px] text-[#cfa052] font-extrabold uppercase tracking-widest">How The Platform Works</span>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#2c2724] tracking-tight">A Simpler Way to Find Trusted Housing</h2>
          </div>
          <motion.div variants={staggerContainer} initial="hidden" whileInView="visible"
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              { n: "01", title: "Create Relocation Profile", desc: "Define destination city, budget expectations, move-in timelines, and shared or private living preferences." },
              { n: "02", title: "Legally Verify Credentials", desc: "Submit Passport scans and visa study/work permit documents for secure manual administrative checks." },
              { n: "03", title: "Browse Vetted Listings", desc: "Explore Approved listings from landlords whose property land registry titles are verified to match local records." },
              { n: "04", title: "Personalized Matching", desc: "Our system matches compatible tenants with suitable landlords to prevent endless unanswered messaging." },
              { n: "05", title: "Connect With Vetted Owners", desc: "Unlock secure, real-time messaging chatrooms to discuss tenancy terms, relocation dates, and rules directly." },
              { n: "06", title: "Refund-Backed Confidence", desc: "If landlords fail to reply to your matched inquiries, your platform connection fee is returned immediately." },
            ].map((step) => (
              <motion.div key={step.n} variants={fadeUpItem}
                className="bg-white p-7 rounded-3xl border border-[#eae1d3] space-y-3 shadow-[0_8px_30px_rgba(44,39,36,0.03)] hover-lift">
                <span className="font-serif text-3xl font-black text-[#cfa052]">{step.n}</span>
                <h3 className="font-extrabold text-sm text-[#2c2724] pt-2 border-t border-[#eae1d3]">{step.title}</h3>
                <p className="text-[11px] text-[#5c544d] leading-relaxed">{step.desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ═══ 9. PROPERTY PREVIEW — BENTO GRID ═════════════════════ */}
      <section className="py-32 px-4 sm:px-6 lg:px-8 bg-[#f4efe6]">
        <div className="max-w-6xl mx-auto space-y-14">
          <div className="text-center max-w-3xl mx-auto space-y-4">
            <span className="text-[10px] text-[#cfa052] font-extrabold uppercase tracking-widest">Trending Homes You'll Love</span>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#2c2724] tracking-tight">Explore Spaces Designed for Your Next Chapter</h2>
          </div>

          <motion.div variants={staggerContainer} initial="hidden" whileInView="visible" className="grid grid-cols-1 md:grid-cols-3 md:grid-rows-2 gap-6 auto-rows-[300px]">
            {/* Toronto Loft — Hero card, 2 cols */}
            <motion.div variants={fadeUpItem} className="md:col-span-2 md:row-span-1 h-full">
              <TiltCard tiltMax={4} className="h-full w-full rounded-[2rem] overflow-hidden border-2 border-white bg-white shadow-[0_20px_40px_rgba(44,39,36,0.06)] relative group">
                <div className="absolute inset-0 img-zoom-container">
                  <img src="/images/toronto_loft.png" alt="Toronto Loft" className="w-full h-full object-cover" />
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-[#2c2724]/90 via-[#2c2724]/30 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-8 text-white z-10">
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-[10px] font-extrabold uppercase tracking-wider text-[#cfa052]">{floorPlanPreviews[0].type}</span>
                    <span className="text-[9px] font-extrabold bg-white text-[#2c2724] px-3 py-1 rounded-full uppercase shadow-lg">
                      Title Vetted
                    </span>
                  </div>
                  <h3 className="font-serif font-black text-2xl">{floorPlanPreviews[0].title}</h3>
                  <p className="text-xs opacity-90 mt-1">{floorPlanPreviews[0].city}, Canada · {floorPlanPreviews[0].specs}</p>
                  <div className="flex items-center justify-between mt-4 pt-4 border-t border-white/20">
                    <div>
                      <span className="text-[10px] opacity-70 uppercase tracking-widest block mb-0.5">Monthly Rent</span>
                      <span className="font-black text-xl">CAD ${floorPlanPreviews[0].rent}</span>
                    </div>
                    <Link href="/signup" className="text-xs font-bold bg-[#cfa052] text-white px-5 py-2.5 rounded-xl hover:bg-[#b58942] transition-colors flex items-center gap-2">
                      Make an Inquiry <ArrowRight className="h-4 w-4" />
                    </Link>
                  </div>
                </div>
              </TiltCard>
            </motion.div>

            {/* Vancouver Townhouse — tall, 2 rows */}
            <motion.div variants={fadeUpItem} className="md:row-span-2 h-full">
              <TiltCard tiltMax={4} className="h-full w-full rounded-[2rem] overflow-hidden border-2 border-white bg-white shadow-[0_20px_40px_rgba(44,39,36,0.06)] relative group">
                <div className="absolute inset-0 img-zoom-container">
                  <img src="/images/vancouver_townhouse.png" alt="Vancouver Townhouse" className="w-full h-full object-cover" />
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-[#2c2724]/90 via-[#2c2724]/10 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-6 text-white z-10">
                  <span className="text-[10px] font-extrabold uppercase tracking-wider text-[#cfa052]">{floorPlanPreviews[1].type}</span>
                  <h3 className="font-serif font-black text-xl mt-2">{floorPlanPreviews[1].title}</h3>
                  <p className="text-[10px] opacity-90 mt-1 mb-4">{floorPlanPreviews[1].city}, Canada</p>
                  <div className="pt-4 border-t border-white/20 flex justify-between items-end">
                    <div>
                      <span className="text-[9px] opacity-70 uppercase block tracking-widest">Monthly</span>
                      <span className="font-black text-lg">CAD ${floorPlanPreviews[1].rent}</span>
                    </div>
                    <button className="bg-white/20 hover:bg-white/30 backdrop-blur-md p-2 rounded-xl transition-colors">
                      <ArrowRight className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              </TiltCard>
            </motion.div>

            {/* Montreal Studio */}
            <motion.div variants={fadeUpItem} className="h-full">
              <TiltCard tiltMax={4} className="h-full w-full rounded-[2rem] overflow-hidden border-2 border-white bg-white shadow-[0_20px_40px_rgba(44,39,36,0.06)] relative group">
                <div className="absolute inset-0 img-zoom-container">
                  <img src="/images/montreal_studio.png" alt="Montreal Studio" className="w-full h-full object-cover" />
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-[#2c2724]/80 via-transparent to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-5 text-white z-10">
                  <span className="text-[9px] font-extrabold uppercase tracking-wider text-[#cfa052]">{floorPlanPreviews[2].type}</span>
                  <h3 className="font-serif font-black text-lg mt-1">{floorPlanPreviews[2].title}</h3>
                  <div className="flex justify-between items-end mt-3 pt-3 border-t border-white/20">
                    <span className="font-black text-base">CAD ${floorPlanPreviews[2].rent}</span>
                    <span className="text-[10px] opacity-80">{floorPlanPreviews[2].city}</span>
                  </div>
                </div>
              </TiltCard>
            </motion.div>

            {/* Info Card */}
            <motion.div variants={fadeUpItem} className="h-full">
              <TiltCard tiltMax={4} className="h-full w-full rounded-[2rem] border border-[#eae1d3] bg-[#fdfbf7] shadow-[0_15px_40px_rgba(44,39,36,0.03)] p-8 flex flex-col justify-center items-center text-center">
                <div className="h-14 w-14 bg-[#eae1d3] rounded-full flex items-center justify-center text-[#cfa052] mb-4 border border-[#cfa052]/20">
                  <Search className="h-6 w-6" />
                </div>
                <h3 className="font-serif text-xl font-black text-[#2c2724] mb-2">Looking for more?</h3>
                <p className="text-[11px] text-[#5c544d] max-w-xs mb-6">Create a verified profile to unlock hundreds of exclusive, title-vetted properties across Canada.</p>
                <Link href="/signup" className="text-xs font-bold text-[#cfa052] border-b border-[#cfa052] pb-0.5 hover:text-[#b58942] hover:border-[#b58942] transition-colors">
                  View All Properties
                </Link>
              </TiltCard>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ═══ 11. FOUNDER'S MESSAGE ═════════════════════════════════ */}
      <section className="py-32 px-4 sm:px-6 lg:px-8 bg-white relative overflow-hidden">
        <div className="max-w-4xl mx-auto text-center space-y-8 relative z-10">
          <motion.div initial={{ opacity: 0, y: 15 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}>
            <div className="inline-flex items-center justify-center space-x-2 text-[10px] text-[#cfa052] font-extrabold uppercase tracking-widest mb-8">
              <Heart className="h-3.5 w-3.5" /><span>Founder&apos;s Story</span>
            </div>
            <blockquote className="font-serif text-2xl sm:text-3xl text-[#2c2724] italic leading-relaxed max-w-3xl mx-auto">
              &ldquo;When I first moved abroad, I experienced the housing struggle that many immigrants silently go through. I faced ignored inquiries, fake landlords, and massive stress trying to secure a safe roof over my head. NestArrival is built from these struggles to guarantee that finding a home in a new country never feels impossible.&rdquo;
            </blockquote>
            <div className="mt-10">
              <div className="w-12 h-1 bg-[#cfa052] mx-auto mb-6 rounded-full opacity-50" />
              <p className="font-extrabold text-sm text-[#2c2724]">Royal Singh</p>
              <p className="text-[10px] text-[#8a7d6a] font-bold uppercase tracking-wider mt-1">Founder & CEO, NestArrival</p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ═══ 15. CTA ═══════════════════════════════════════════════ */}
      <section className="relative py-32 px-4 bg-[#cfa052] text-white text-center overflow-hidden">
        <div className="absolute inset-0 opacity-10 bg-[url('/images/toronto_loft.png')] bg-cover bg-center mix-blend-overlay" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#2c2724]/90 to-transparent" />
        
        <div className="max-w-4xl mx-auto space-y-8 relative z-10">
          <h2 className="font-serif text-4xl sm:text-5xl font-bold text-white tracking-tight leading-tight">Schedule Your Relocation Today.</h2>
          <p className="text-sm text-white/80 max-w-xl mx-auto leading-relaxed">
            Register and complete your identity and visa vetting checks. Settle accommodation details with verified property owners before boarding.
          </p>
          <div className="flex flex-col sm:flex-row items-center gap-4 justify-center text-xs font-bold pt-4">
            <Link href="/signup" className="w-full sm:w-auto rounded-2xl bg-white text-[#2c2724] px-10 py-4 hover:bg-[#fdfbf7] transition-colors shadow-xl font-extrabold">
              Sign Up as Relocator
            </Link>
            <Link href="/signup?role=owner" className="w-full sm:w-auto rounded-2xl bg-transparent text-white border border-white/30 px-10 py-4 hover:bg-white/10 transition-colors">
              Register Property
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
