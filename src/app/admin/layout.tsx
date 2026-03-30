import { createClient } from "@/lib/supabase-server";

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  return (
    <div className="min-h-screen bg-background font-tajawal" dir="rtl">
      {user && (
        <nav className="bg-surface border-b border-border px-4 py-3">
          <div className="max-w-5xl mx-auto flex justify-between items-center">
            <span className="font-bold text-text-primary">لوحة التحكم</span>
            <div className="flex gap-4 items-center">
              <a href="/" className="text-sm text-text-secondary hover:text-accent">
                عرض المدونة
              </a>
              <a href="/admin/new" className="text-sm bg-accent text-white px-4 py-1.5 rounded-lg hover:bg-accent/90">
                + تدوينة جديدة
              </a>
              <form action="/api/auth/signout" method="POST">
                <button className="text-sm text-text-muted hover:text-red-500">
                  خروج
                </button>
              </form>
            </div>
          </div>
        </nav>
      )}
      {children}
    </div>
  );
}
