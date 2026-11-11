import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { z } from "zod";
import { Prisma } from "@prisma/client";
import { prisma } from "@/lib/db";

const schema = z.object({
  name: z.string().trim().min(1, "Indiquez votre nom.").max(60),
  email: z.string().trim().toLowerCase().email("Adresse e-mail invalide.").max(254),
  password: z.string().min(8, "Le mot de passe doit contenir au moins 8 caractères.").max(200),
});

export async function POST(req: Request) {
  const body = await req.json().catch(() => null);
  const parsed = schema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: parsed.error.issues[0]?.message ?? "Données invalides." }, { status: 400 });
  }
  const { name, email, password } = parsed.data;
  try {
    await prisma.user.create({ data: { name, email, passwordHash: await bcrypt.hash(password, 12) } });
  } catch (err) {
    if (err instanceof Prisma.PrismaClientKnownRequestError && err.code === "P2002") {
      return NextResponse.json({ error: "Un compte existe déjà avec cet e-mail." }, { status: 409 });
    }
    throw err;
  }
  return NextResponse.json({ ok: true }, { status: 201 });
}
