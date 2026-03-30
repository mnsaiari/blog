import { createClient } from "@/lib/supabase-server";
import { redirect } from "next/navigation";
import { formatArabicDate } from "@/utils/helpers";
import Link from "next/link";
import DeletePostButton from "./DeletePostButton";

export default async function AdminDashboard() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/admin/login");
  }

  const { data: posts } = await supabase
    .from("posts")
    .select("*")
    .order("created_at", { ascending: false });

  return (
    <main className="max-w-5xl mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-bold text-text-primary">تدويناتي</h1>
        <Link
          href="/admin/new"
          className="bg-accent text-white px-5 py-2.5 rounded-lg font-medium hover:bg-accent/90 transition-colors"
        >
          + تدوينة جديدة
        </Link>
      </div>

      {!posts || posts.length === 0 ? (
        <div className="text-center py-20">
          <p className="text-text-muted text-xl mb-4">لا توجد تدوينات بعد</p>
          <Link
            href="/admin/new"
            className="bg-accent text-white px-6 py-3 rounded-lg font-medium hover:bg-accent/90 transition-colors"
          >
            اكتب تدوينتك الأولى
          </Link>
        </div>
      ) : (
        <div className="space-y-3">
          {posts.map((post) => (
            <div
              key={post.id}
              className="bg-surface border border-border rounded-xl p-5 flex items-center justify-between gap-4"
            >
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <h2 className="font-semibold text-text-primary truncate">
                    {post.title}
                  </h2>
                  <span
                    className={`text-xs px-2 py-0.5 rounded-full font-medium shrink-0 ${
                      post.published
                        ? "bg-green-100 text-green-700"
                        : "bg-yellow-100 text-yellow-700"
                    }`}
                  >
                    {post.published ? "منشور" : "مسودة"}
                  </span>
                </div>
                {post.subtitle && (
                  <p className="text-text-muted text-sm truncate">{post.subtitle}</p>
                )}
                <time className="text-text-muted text-xs">
                  {formatArabicDate(post.created_at)}
                </time>
              </div>

              <div className="flex items-center gap-2 shrink-0">
                <Link
                  href={`/post/${post.slug}`}
                  target="_blank"
                  className="text-text-muted hover:text-accent text-sm transition-colors"
                >
                  عرض
                </Link>
                <Link
                  href={`/admin/edit/${post.id}`}
                  className="text-text-muted hover:text-accent text-sm transition-colors"
                >
                  تعديل
                </Link>
                <DeletePostButton postId={post.id} />
              </div>
            </div>
          ))}
        </div>
      )}
    </main>
  );
}
