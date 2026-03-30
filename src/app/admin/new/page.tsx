import { createClient } from "@/lib/supabase-server";
import { redirect } from "next/navigation";
import PostForm from "../PostForm";

export default async function NewPostPage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/admin/login");
  }

  return (
    <main className="max-w-3xl mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold text-text-primary mb-8">
        تدوينة جديدة
      </h1>
      <PostForm mode="create" />
    </main>
  );
}
