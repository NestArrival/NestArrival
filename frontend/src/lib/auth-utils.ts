import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { APP_CONFIG } from "./constants";
import { prisma } from "./db";
import { NextRequest } from "next/server";

export async function hashPassword(password: string): Promise<string> {
  const salt = await bcrypt.genSalt(10);
  return bcrypt.hash(password, salt);
}

export async function comparePassword(password: string, hash: string): Promise<boolean> {
  return bcrypt.compare(password, hash);
}

export function signToken(payload: { userId: string; email: string; role: string }): string {
  return jwt.sign(payload, APP_CONFIG.jwtSecret, {
    expiresIn: "7d",
  });
}

export function verifyToken(token: string) {
  try {
    return jwt.verify(token, APP_CONFIG.jwtSecret) as {
      userId: string;
      email: string;
      role: string;
    };
  } catch (error) {
    return null;
  }
}

export async function getCurrentUser(request: NextRequest) {
  const token = request.cookies.get(APP_CONFIG.jwtCookieName)?.value;
  if (!token) return null;

  const payload = verifyToken(token);
  if (!payload) return null;

  try {
    const user = await prisma.user.findUnique({
      where: { id: payload.userId },
      include: {
        verificationRequest: true,
        subscriptions: {
          where: {
            isActive: true,
            endDate: { gte: new Date() },
          },
          orderBy: { createdAt: "desc" },
          take: 1,
        },
      },
    });
    return user;
  } catch (e) {
    return null;
  }
}
