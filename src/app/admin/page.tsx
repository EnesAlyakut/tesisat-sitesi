import { redirect } from "next/navigation";
import AdminDashboard from "@/components/admin/AdminDashboard";
import { isAdmin } from "@/lib/admin-auth";
import { getCmsContent } from "@/lib/cms";

export const dynamic = "force-dynamic";

export default async function AdminPage() {
  if (!(await isAdmin())) redirect("/admin/login/");
  const content = await getCmsContent();
  return <AdminDashboard initialContent={content} />;
}
