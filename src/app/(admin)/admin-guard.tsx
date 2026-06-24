import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { connection } from "next/server";

export async function AdminGuard({ children }: { children: React.ReactNode }) {
  await connection();
  const session = await auth.api.getSession({
    headers: await headers()
  });

  if (!session || session.user.role !== 'admin') {
    redirect("/login");
  }

  return <>{children}</>;
}
