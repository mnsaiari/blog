import { createClient } from "@/lib/supabase-server";
import PostContent from "@/components/PostContent";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { formatArabicDate } from "@/utils/helpers";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

export const dynamic = 'force-dynamic';

interface PageProps {
  params: Promise<{ slug: string }>;
}

export default async function PostPage({ params }: PageProps) {
  const { slug } = await params;
  const supabase = await createClient();

  const { data: post, error } = await supabase
    .from("posts")
    .select("*")
    .eq("slug", slug)
    .eq("published", true)
    .single();

  if (error || !post) {
    notFound();
  }

  return (
    <>
      <Navbar />
      <main className="max-w-2xl mx-auto px-4 py-12">
        {/* Back link */}
        <Link
          href="/"
          className="inline-flex items-center text-text-muted hover:text-accent text-sm mb-8 transition-colors"
        >
          ← العودة للمدونة
        </Link>

        {/* Post Header */}
        <header className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-text-primary leading-tight mb-4">
            {post.title}
          </h1>
          {post.subtitle && (
            <p className="text-xl text-text-secondary font-medium mb-4">
              {post.subtitle}
            </p>
          )}
          <time className="text-text-muted text-sm">
            {formatArabicDate(post.created_at)}
          </time>
        </header>

        {/* Cover Image */}
        {post.cover_image_url && (
          <div className="relative w-full h-72 md:h-96 rounded-2xl overflow-hidden mb-10">
            <Image
              src={post.cover_image_url}
              alt={post.title}
              fill
              className="object-cover"
              priority
            />
          </div>
        )}

        {/* Separator */}
        <hr className="border-border mb-10" />

        {/* Post Content */}
        <PostContent content={post.content} />
      </main>
      <Footer />
    </>
  );
}
