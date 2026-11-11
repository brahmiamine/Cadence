import { redirect } from "next/navigation";
import { currentUser } from "@/lib/session";
import { loadData } from "@/lib/data";
import CadenceApp from "@/components/CadenceApp";

export const dynamic = "force-dynamic";

export default async function Home() {
  const user = await currentUser();
  if (!user) redirect("/login");
  const initial = await loadData(user.id);
  return <CadenceApp initial={initial} user={{ name: user.name ?? "", email: user.email ?? "" }} />;
}
