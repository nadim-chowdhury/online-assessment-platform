import NextAuth, { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: {
          label: "Email",
          type: "email",
          placeholder: "employer@example.com",
        },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials, req) {
        // TEMPORARY BYPASS: Auth + RBAC commented out locally.
        
        /*
        if (!credentials?.email || !credentials.password) {
          return null;
        }

        const email = credentials.email.toLowerCase();

        // Assign 'employer' role if email contains 'employer', else 'candidate'
        if (email.includes("employer")) {
          return {
            id: "1",
            name: "Mock Employer",
            email: email,
            role: "employer",
          };
        } else if (email.includes("candidate")) {
          return {
            id: "2",
            name: "Mock Candidate",
            email: email,
            role: "candidate",
          };
        }

        // Return null if user data could not be retrieved
        return null;
        */

        // Unrestricted fallback returning employer directly:
        return {
          id: "1",
          name: "Dev Mode User",
          email: credentials?.email || "dev@mock.local",
          role: "employer"
        };
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.role = user.role;
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.id as string;
        session.user.role = token.role as string;
      }
      return session;
    },
  },
  session: {
    strategy: "jwt",
  },
  pages: {
    signIn: "/sign-in",
  },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
