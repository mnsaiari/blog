"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase";
import { Post } from "@/lib/types";
import { generateSlug } from "@/utils/helpers";
import dynamic from "next/dynamic";
import ImageUpload from "@/components/admin/ImageUpload";

const Editor = dynamic(() => import("@/components/admin/Editor"), {
  ssr: false,
  loading: () => (
    <div className="border border-border rounded-xl h-64 bg-surface animate-pulse" />
  ),
});

interface PostFormProps {
  mode: "create" | "edit";
  post?: Post;
}

export default function PostForm({ mode, post }: PostFormProps) {
  const [title, setTitle] = useState(post?.title || "");
  const [subtitle, setSubtitle] = useState(post?.subtitle || "");
  const [content, setContent] = useState(post?.content || "");
  const [coverImage, setCoverImage] = useState(post?.cover_image_url || "");
  const [published, setPublished] = useState(post?.published || false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();
  const supabase = createClient();

  async function handleSubmit(e: React.FormEvent, publish?: boolean) {
    e.preventDefault();

    if (!title.trim()) {
      setError("عنوان التدوينة مطلوب");
      return;
    }
    if (!content || content === "<p></p>") {
      setError("محتوى التدوينة مطلوب");
      return;
    }

    setSaving(true);
    setError("");

    const shouldPublish = publish !== undefined ? publish : published;

    if (mode === "create") {
      const slug = generateSlug(title);
      const { error } = await supabase.from("posts").insert({
        title: title.trim(),
        subtitle: subtitle.trim() || null,
        slug,
        content,
        cover_image_url: coverImage || null,
        published: shouldPublish,
      });

      if (error) {
        setError("حدث خطأ أثناء الحفظ، يرجى المحاولة مجدداً");
        setSaving(false);
        return;
      }
    } else if (post) {
      const { error } = await supabase
        .from("posts")
        .update({
          title: title.trim(),
          subtitle: subtitle.trim() || null,
          content,
          cover_image_url: coverImage || null,
          published: shouldPublish,
          updated_at: new Date().toISOString(),
        })
        .eq("id", post.id);

      if (error) {
        setError("حدث خطأ أثناء الحفظ، يرجى المحاولة مجدداً");
        setSaving(false);
        return;
      }
    }

    router.push("/admin");
    router.refresh();
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Title */}
      <div>
        <label className="block text-sm font-medium text-text-primary mb-1.5">
          العنوان الرئيسي *
        </label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="أدخل عنوان التدوينة"
          className="w-full border border-border rounded-xl px-4 py-3 text-lg font-semibold bg-surface focus:outline-none focus:ring-2 focus:ring-accent-light"
          required
        />
      </div>

      {/* Subtitle */}
      <div>
        <label className="block text-sm font-medium text-text-primary mb-1.5">
          العنوان الفرعي
        </label>
        <input
          type="text"
          value={subtitle}
          onChange={(e) => setSubtitle(e.target.value)}
          placeholder="جملة توضيحية مختصرة (اختياري)"
          className="w-full border border-border rounded-xl px-4 py-3 bg-surface focus:outline-none focus:ring-2 focus:ring-accent-light"
        />
      </div>

      {/* Cover Image */}
      <div>
        <label className="block text-sm font-medium text-text-primary mb-1.5">
          صورة الغلاف
        </label>
        <ImageUpload value={coverImage} onChange={setCoverImage} />
      </div>

      {/* Content */}
      <div>
        <label className="block text-sm font-medium text-text-primary mb-1.5">
          المحتوى *
        </label>
        <Editor content={content} onChange={setContent} />
      </div>

      {error && <p className="text-red-500 text-sm">{error}</p>}

      {/* Actions */}
      <div className="flex gap-3 flex-wrap pt-2">
        <button
          type="button"
          onClick={(e) => handleSubmit(e, false)}
          disabled={saving}
          className="flex-1 sm:flex-none border border-border text-text-secondary px-6 py-3 rounded-xl font-medium hover:bg-border transition-colors disabled:opacity-50"
        >
          حفظ كمسودة
        </button>
        <button
          type="button"
          onClick={(e) => handleSubmit(e, true)}
          disabled={saving}
          className="flex-1 sm:flex-none bg-accent text-white px-6 py-3 rounded-xl font-medium hover:bg-accent/90 transition-colors disabled:opacity-50"
        >
          {saving ? "جارٍ النشر..." : "نشر"}
        </button>
      </div>
    </form>
  );
}
