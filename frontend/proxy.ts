import { NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";
import type { NextRequest } from "next/server";

export async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const token = await getToken({ req: request });

  const publicPaths = ["/sign-in", "/sign-up", "/api"];
  const isPublicPath = publicPaths.some((p) => pathname.startsWith(p));

  if (token && (pathname === "/sign-in" || pathname === "/sign-up")) {
    const dashboard =
      token.role === "employer"
        ? "/employer-dashboard"
        : "/candidate-dashboard";
    return NextResponse.redirect(new URL(dashboard, request.url));
  }

  if (isPublicPath) {
    return NextResponse.next();
  }

  if (!token) {
    const signInUrl = new URL("/sign-in", request.url);
    signInUrl.searchParams.set("callbackUrl", pathname);
    return NextResponse.redirect(signInUrl);
  }

  if (token.role === "employer" && pathname.startsWith("/candidate-")) {
    return NextResponse.redirect(new URL("/employer-dashboard", request.url));
  }

  if (token.role === "candidate" && pathname.startsWith("/employer-")) {
    return NextResponse.redirect(new URL("/candidate-dashboard", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico|assets/).*)"],
};
