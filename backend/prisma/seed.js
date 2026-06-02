require("dotenv/config");
const { Pool } = require("pg");
const { PrismaPg } = require("@prisma/adapter-pg");
const { PrismaClient } = require("@prisma/client");
const bcrypt = require("bcryptjs");

const connectionString = process.env.DATABASE_URL || "";

let resolvedDbUrl = connectionString;
if (connectionString.startsWith("prisma+postgres://")) {
  try {
    const urlObj = new URL(connectionString);
    const apiKey = urlObj.searchParams.get("api_key");
    if (apiKey) {
      const decoded = Buffer.from(apiKey, "base64").toString("utf-8");
      const json = JSON.parse(decoded);
      if (json.databaseUrl) {
        resolvedDbUrl = json.databaseUrl;
      }
    }
  } catch (e) {
    console.error("Failed to parse proxy URL:", e);
  }
}

const pool = new Pool({ connectionString: resolvedDbUrl });
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

async function main() {
  console.log("Seeding started...");

  // 1. Seed Admin
  const adminEmail = "admin@nestarrival.ca";
  const existingAdmin = await prisma.user.findUnique({
    where: { email: adminEmail }
  });

  if (!existingAdmin) {
    const salt = await bcrypt.genSalt(10);
    const passwordHash = await bcrypt.hash("NestArrivalAdmin2026!", salt);
    
    await prisma.user.create({
      data: {
        email: adminEmail,
        passwordHash,
        role: "ADMIN",
        fullName: "NestArrival Administrator",
        isVerified: true,
        verificationStatus: "VERIFIED"
      }
    });
    console.log("Default Admin Account created successfully.");
  } else {
    console.log("Admin Account already exists.");
  }

  // 2. Seed CMS Pages
  const cmsPages = [
    {
      id: "terms",
      title: "Terms & Conditions",
      content: `# Terms & Conditions
Last updated: June 1, 2026

Welcome to NestArrival. By accessing our platform, you agree to comply with and be bound by these Terms & Conditions. NestArrival acts strictly as a connection layer and does not guarantee tenancy, property condition, or renter actions.`
    },
    {
      id: "privacy",
      title: "Privacy Policy",
      content: `# Privacy Policy
Last updated: June 1, 2026

Your privacy is important to us. We collect and encrypt government IDs, residency proof, and lease records strictly for verification. Data is never shared with third parties without your explicit permission.`
    },
    {
      id: "refund",
      title: "Refund Policy",
      content: `# Refund Policy
Last updated: June 1, 2026

If a tenant purchases a subscription and receives zero (0) owner replies during their active billing cycle, they are eligible for a full refund of that billing period. All refund claims are moderated and processed within 5-7 business days.`
    },
    {
      id: "verification",
      title: "Verification Policy",
      content: `# Verification Policy
Last updated: June 1, 2026

NestArrival enforces a verification-first policy. Owners must submit valid residency proof and land titles or property tax records. Tenants must submit proof of identity, visa status, or school/employment admission letters to unlock interactions.`
    },
    {
      id: "cookie",
      title: "Cookie Policy",
      content: `# Cookie Policy
Last updated: June 1, 2026

We use basic and essential session cookies to manage user logins and preserve safety status. No marketing or tracking cookies are enabled for third-party platforms.`
    },
    {
      id: "community",
      title: "Community Guidelines",
      content: `# Community Guidelines
Last updated: June 1, 2026

We promote safety and respect. Discrimination, fraudulent documentation uploads, and misleading rental fees are strictly prohibited and will result in immediate bans without eligibility for refunds.`
    },
    {
      id: "tenant-declaration",
      title: "Tenant Declaration",
      content: `I hereby declare that all information, relocation details, visa documents, and letters of admission/employment provided are true and accurate. I understand that submitting fake documents will lead to legal action and a permanent platform ban.`
    },
    {
      id: "owner-declaration",
      title: "Owner Declaration",
      content: `I declare that I am the legal owner or authorized property manager of the listing, and that all descriptions, pricing, and pictures match the actual state of the property. I agree to keep pricing fair and transparent.`
    },
    {
      id: "cancellation",
      title: "Cancellation Policy",
      content: `# Cancellation Policy
Last updated: June 1, 2026

Tenants can cancel their active subscriptions at any time directly through their billing dashboard. Upon cancellation, your access remains active until the end of the current billing cycle. No further auto-renewals will be processed.`
    }
  ];

  for (const page of cmsPages) {
    await prisma.cmsPage.upsert({
      where: { id: page.id },
      update: { title: page.title, content: page.content },
      create: page
    });
  }

  console.log("CMS legal documents seeded successfully.");
  console.log("Seeding completed.");
}

main()
  .catch((e) => {
    console.error("Error seeding:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
