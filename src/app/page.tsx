import { createClient } from "@/lib/supabase-server";
import PostCard from "@/components/PostCard";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Post } from "@/lib/types";

export const dynamic = 'force-dynamic';

export default async function HomePage() {
  let publishedPosts: Post[] = [];

  try {
    const supabase = await createClient();
    const { data: posts, error } = await supabase
      .from("posts")
      .select("*")
      .eq("published", true)
      .order("created_at", { ascending: false });

    if (error) {
      console.error("Error fetching posts:", error);
    } else {
      publishedPosts = posts || [];
    }
  } catch (err) {
    console.error("Supabase connection error:", err);
  }

  return (
    <>
      <Navbar />
      <main className="max-w-3xl mx-auto px-4 py-12">
        {/* Header */}
        <header className="mb-12 text-center">
          <h1 className="text-4xl font-bold text-text-primary mb-3">مدونتي</h1>
          <p className="text-text-secondary text-lg">
            كتاباتي الشخصية، تجاربي وآرائي
          </p>
        </header>

        {/* Posts Grid */}
        {publishedPosts.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-text-muted text-xl">لا توجد تدوينات بعد</p>
            <p className="text-text-muted text-sm mt-2">ترقّب قادم الكتابات</p>
          </div>
        ) : (
          <div className="space-y-12">
            {publishedPosts.map((post, index) => (
              <div key={post.id}>
                <PostCard post={post} />
                {index < publishedPosts.length - 1 && (
                  <hr className="border-border mt-12" />
                )}
              </div>
            ))}
          </div>
        )}
      </main>
      <Footer />
    </>
  );
}
