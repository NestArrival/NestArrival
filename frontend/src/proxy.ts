import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { APP_CONFIG } from "@/lib/constants";

// Helper to decode JWT payload in Edge runtime
function decodeJWTPayload(token: string) {
  try {
    const parts = token.split(".");
    if (parts.length !== 3) return null;
    const base64Url = parts[1];
    const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
    const jsonPayload = decodeURIComponent(
      atob(base64)
        .split("")
        .map((c) => "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2))
        .join("")
    );
    return JSON.parse(jsonPayload);
  } catch (e) {
    return null;
  }
}

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const token = request.cookies.get(APP_CONFIG.jwtCookieName)?.value;

  // Let public pages, API auth routes, uploads pass
  if (
    pathname.startsWith("/_next") ||
    pathname.startsWith("/api/auth") ||
    pathname.startsWith("/public") ||
    pathname === "/" ||
    pathname === "/about" ||
    pathname === "/pricing" ||
    pathname === "/contact" ||
    pathname === "/login" ||
    pathname === "/signup" ||
    pathname === "/favicon.ico"
  ) {
    return NextResponse.next();
  }

  // If trying to access protected paths and no token exists
  if (!token) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  const payload = decodeJWTPayload(token);
  if (!payload) {
    // Corrupt or expired token, clear cookie and redirect
    const response = NextResponse.redirect(new URL("/login", request.url));
    response.cookies.delete(APP_CONFIG.jwtCookieName);
    return response;
  }

  const userRole = payload.role;

  // Enforce Admin boundary
  if (pathname.startsWith("/admin") && userRole !== "ADMIN") {
    return NextResponse.redirect(new URL("/", request.url));
  }

  // Enforce Tenant boundary
  if (pathname.startsWith("/tenant") && userRole !== "TENANT") {
    return NextResponse.redirect(new URL("/", request.url));
  }

  // Enforce Owner boundary
  if (pathname.startsWith("/owner") && userRole !== "OWNER") {
    return NextResponse.redirect(new URL("/", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/admin/:path*",
    "/tenant/:path*",
    "/owner/:path*",
    "/login",
    "/signup",
  ],
};