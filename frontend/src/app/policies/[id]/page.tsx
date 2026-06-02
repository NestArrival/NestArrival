import { prisma } from "@/lib/db";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { notFound } from "next/navigation";
import { FileText } from "lucide-react";

export const dynamic = "force-dynamic";

interface PolicyPageProps {
  params: Promise<{ id: string }>;
}

export default async function PolicyPage({ params }: PolicyPageProps) {
  const { id } = await params;

  let page;
  try {
    page = await prisma.cmsPage.findUnique({
      where: { id },
    });
  } catch (error) {
    console.error("Failed to load policy page:", error);
  }

  // Fallbacks in case database connection isn't initialized yet
  const fallbacks: Record<string, { title: string; content: string }> = {
    terms: {
      title: "Terms & Conditions",
      content: "Welcome to NestArrival. We act as a connection layer between tenants and owners. Full terms will be seeded in your database.",
    },
    privacy: {
      title: "Privacy Policy",
      content: "Your data security is our top priority. Document uploads are stored securely and used only for identity verification.",
    },
    refund: {
      title: "Refund Policy",
      content: "If a tenant contacts owners and receives zero responses during an active subscription, they are eligible for a full refund.",
    },
    cancellation: {
      title: "Cancellation Policy",
      content: "Active subscriptions can be canceled at any time. Your access will remain active until the end of the current billing cycle.",
    },
    verification: {
      title: "Verification Policy",
      content: "Identity verification is mandatory for both tenants and owners to participate in the platform.",
    },
  };

  const currentPage = page || fallbacks[id];

  if (!currentPage) {
    notFound();
  }

  return (
    <div className="flex flex-col min-h-screen bg-black text-white">
      <Navbar />
      <main className="flex-grow mx-auto max-w-4xl px-4 py-20 sm:px-6 lg:px-8 w-full">
        <article className="glass-panel rounded-xl border border-zinc-800 p-8 sm:p-12 shadow-sm bg-zinc-950/20 text-xs sm:text-sm">
          <div className="flex items-center space-x-3 border-b border-zinc-900 pb-6 mb-8">
            <div className="rounded-lg bg-zinc-900 p-2.5 text-cyan-400 border border-zinc-800">
              <FileText className="h-6 w-6" />
            </div>
            <div>
              <h1 className="text-2xl font-extrabold tracking-tight text-white">
                {currentPage.title}
              </h1>
              <p className="text-[10px] text-zinc-500 mt-1 uppercase tracking-wider font-semibold">
                NestArrival Official Policy Page
              </p>
            </div>
          </div>

          <div className="text-zinc-400 space-y-6 leading-relaxed whitespace-pre-wrap">
            {currentPage.content.split("\n\n").map((paragraph, index) => {
              if (paragraph.startsWith("# ")) {
                return (
                  <h2 key={index} className="text-lg font-bold text-white mt-8 mb-4">
                    {paragraph.replace("# ", "")}
                  </h2>
                );
              }
              if (paragraph.startsWith("## ")) {
                return (
                  <h3 key={index} className="text-base font-bold text-white mt-6 mb-2">
                    {paragraph.replace("## ", "")}
                  </h3>
                );
              }
              return (
                <p key={index} className="whitespace-pre-line">
                  {paragraph}
                </p>
              );
            })}
          </div>
        </article>
      </main>
      <Footer />
    </div>
  );
}
