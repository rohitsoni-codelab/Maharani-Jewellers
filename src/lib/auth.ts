import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Admin Login",
      credentials: {
        email: { label: "Email", type: "email", placeholder: "admin@maharanijewellers.com" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          throw new Error("Missing email or password");
        }

        const adminEmail = process.env.ADMIN_EMAIL;
        let adminHash = process.env.ADMIN_PASSWORD_HASH || "";
        
        // Clean up potential quotes or backslashes added to bypass .env parsing
        adminHash = adminHash.replace(/^['"]|['"]$/g, '').replace(/\\/g, '');

        console.log("EMAIL:", credentials.email, "ADMIN_EMAIL:", adminEmail);
        console.log("PASSWORD:", credentials.password, "HASH:", adminHash);

        if (!adminEmail || !adminHash) {
          throw new Error("Server configuration error");
        }

        if (credentials.email !== adminEmail) {
          throw new Error("Invalid credentials");
        }

        const isValid = await bcrypt.compare(credentials.password, adminHash);

        if (!isValid) {
          throw new Error("Invalid credentials");
        }

        return {
          id: "admin",
          name: "Maharani Admin",
          email: adminEmail,
        };
      }
    })
  ],
  session: {
    strategy: "jwt",
    maxAge: 6 * 60 * 60, // 6 hours
  },
  pages: {
    signIn: '/login',
  },
  secret: process.env.NEXTAUTH_SECRET,
};
