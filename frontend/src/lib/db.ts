import { Pool } from "pg";
import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "@prisma/client";

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

const connectionString = process.env.DATABASE_URL;

if (!connectionString) {
  throw new Error(
    "DATABASE_URL is not set. Add it to .env and restart the Next.js dev server."
  );
}

// Parser to resolve Prisma 7.x local proxy connection strings
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
    console.error("[Prisma URL Parser] Failed to decode local proxy URL, falling back:", e);
  }
}

let client: PrismaClient;

if (process.env.NODE_ENV === "production") {
  const pool = new Pool({ connectionString: resolvedDbUrl });
  const adapter = new PrismaPg(pool);
  client = new PrismaClient({ adapter });
} else {
  if (!globalForPrisma.prisma) {
    const pool = new Pool({ connectionString: resolvedDbUrl });
    const adapter = new PrismaPg(pool);
    globalForPrisma.prisma = new PrismaClient({ adapter });
  }
  client = globalForPrisma.prisma;
}

export const prisma = client;
