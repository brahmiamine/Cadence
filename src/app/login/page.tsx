import { redirect } from "next/navigation";
import { currentUser } from "@/lib/session";
import AuthForm from "@/components/AuthForm";

export const dynamic = "force-dynamic";

export default async function Page() {
  if (await currentUser()) redirect("/");
  return <AuthForm mode="login" />;
}
