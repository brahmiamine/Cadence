import { prisma } from "@/lib/db";
import { normalize } from "@/lib/cadence/model";

export type CadenceData = ReturnType<typeof normalize>;

/** Charge toutes les données d’un utilisateur au format de l’application. */
export async function loadData(userId: string): Promise<CadenceData> {
  const user = await prisma.user.findUniqueOrThrow({
    where: { id: userId },
    select: {
      theme: true,
      gridRange: true,
      view: true,
      habits: { orderBy: { position: "asc" }, include: { entries: true } },
    },
  });
  return normalize({
    format: "mosaique",
    version: 1,
    settings: { theme: user.theme, range: user.gridRange, view: user.view },
    habits: user.habits.map((h) => ({
      id: h.clientId,
      name: h.name,
      description: h.description,
      category: h.category,
      start: h.start,
      mode: h.mode,
      kind: h.kind,
      repeat: h.repeat,
      frequency: h.frequency,
      days: h.days,
      unit: h.unit,
      target: h.target,
      icon: h.icon,
      color: h.color,
      reminder: h.reminder,
      reminderDays: h.reminderDays,
      archived: h.archived,
      entries: Object.fromEntries(h.entries.map((e) => [e.date, { value: e.value, note: e.note }])),
    })),
  });
}

/** Remplace atomiquement les données d’un utilisateur (données déjà normalisées). */
export async function saveData(userId: string, data: CadenceData): Promise<void> {
  await prisma.$transaction(
    async (tx) => {
      await tx.user.update({
        where: { id: userId },
        data: { theme: data.settings.theme, gridRange: data.settings.range, view: data.settings.view },
      });
      await tx.habit.deleteMany({ where: { userId } });
      for (const [position, h] of data.habits.entries()) {
        await tx.habit.create({
          data: {
            userId,
            clientId: h.id,
            position,
            name: h.name,
            description: h.description,
            category: h.category,
            start: h.start,
            mode: h.mode,
            kind: h.kind,
            repeat: h.repeat,
            frequency: h.frequency,
            days: h.days,
            unit: h.unit,
            target: h.target,
            icon: h.icon,
            color: h.color,
            reminder: h.reminder,
            reminderDays: h.reminderDays,
            archived: h.archived,
            entries: {
              create: Object.entries(h.entries as Record<string, { value: number; note: string }>).map(
                ([date, e]) => ({ date, value: e.value, note: e.note }),
              ),
            },
          },
        });
      }
    },
    { timeout: 30_000 },
  );
}
