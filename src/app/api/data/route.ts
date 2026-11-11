import { NextResponse } from "next/server";
import { currentUser } from "@/lib/session";
import { loadData, saveData } from "@/lib/data";
import { normalize } from "@/lib/cadence/model";

export const dynamic = "force-dynamic";

export async function GET() {
  const user = await currentUser();
  if (!user) return NextResponse.json({ error: "Non authentifié." }, { status: 401 });
  return NextResponse.json(await loadData(user.id), { headers: { "Cache-Control": "no-store" } });
}

export async function PUT(req: Request) {
  const user = await currentUser();
  if (!user) return NextResponse.json({ error: "Non authentifié." }, { status: 401 });
  const raw = await req.text();
  if (raw.length > 15 * 1024 * 1024) return NextResponse.json({ error: "Données trop volumineuses." }, { status: 413 });
  let data;
  try {
    data = normalize(JSON.parse(raw));
  } catch (err) {
    return NextResponse.json({ error: err instanceof Error ? err.message : "Données invalides." }, { status: 400 });
  }
  await saveData(user.id, data);
  return NextResponse.json({ ok: true });
}
