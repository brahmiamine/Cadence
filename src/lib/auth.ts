import type { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import { z } from "zod";
import { prisma } from "@/lib/db";
import { allowAttempt, clientIp } from "@/lib/rate-limit";

const credentialsSchema = z.object({
  email: z.string().trim().toLowerCase().email().max(254),
  password: z.string().min(1).max(200),
});

// Hash factice : évite de révéler par le temps de réponse si un e-mail existe.
const DUMMY_HASH = "$2a$12$WsyW9DOCujg/GMOqTKKAtu8Dq08qCjZF2kM/0OUlRWukL3T5omW9O";

export const authOptions: NextAuthOptions = {
  session: { strategy: "jwt", maxAge: 60 * 60 * 24 * 30 },
  pages: { signIn: "/login" },
  providers: [
    CredentialsProvider({
      name: "E-mail et mot de passe",
      credentials: {
        email: { label: "E-mail", type: "email" },
        password: { label: "Mot de passe", type: "password" },
      },
      async authorize(raw, req) {
        const parsed = credentialsSchema.safeParse(raw);
        if (!parsed.success) return null;
        // 10 tentatives / 15 min par IP + e-mail, 50 par IP.
        const ip = clientIp(req?.headers);
        if (!allowAttempt(`login:${ip}:${parsed.data.email}`, 10, 15 * 60_000) || !allowAttempt(`login-ip:${ip}`, 50, 15 * 60_000)) return null;
        const user = await prisma.user.findUnique({ where: { email: parsed.data.email } });
        const ok = await bcrypt.compare(parsed.data.password, user?.passwordHash ?? DUMMY_HASH);
        if (!user || !ok) return null;
        return { id: user.id, email: user.email, name: user.name ?? null };
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) token.uid = user.id;
      return token;
    },
    async session({ session, token }) {
      if (session.user && token.uid) session.user.id = token.uid as string;
      return session;
    },
  },
};
