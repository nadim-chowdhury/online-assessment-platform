import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

export default withAuth(
  function proxy(req) {
    const token = req.nextauth.token;

    // RBAC: Check roles and redirect if unauthorized
    if (
      req.nextUrl.pathname.startsWith("/employer") &&
      token?.role !== "employer"
    ) {
      return NextResponse.redirect(new URL("/candidate-dashboard", req.url));
    }

    if (
      req.nextUrl.pathname.startsWith("/candidate") &&
      token?.role !== "candidate"
    ) {
      return NextResponse.redirect(new URL("/employer-dashboard", req.url));
    }

    // Allow the request to continue
    return NextResponse.next();
  },
  {
    callbacks: {
      // The proxy function above will only run if this authorized callback returns true.
      // If it returns false, NextAuth automatically redirects to the sign in page.
      authorized: ({ token }) => !!token,
    },
  },
);

export const config = {
  // Define which paths require authentication
  matcher: [
    "/employer-dashboard/:path*",
    "/employer-tests/:path*",
    "/candidate-dashboard/:path*",
    "/candidate-tests/:path*",
  ],
};
