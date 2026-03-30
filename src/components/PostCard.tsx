import Link from "next/link";
import Image from "next/image";
import { Post } from "@/lib/types";
import { formatArabicDate, getExcerpt } from "@/utils/helpers";

interface PostCardProps {
  post: Post;
}

export default function PostCard({ post }: PostCardProps) {
  return (
    <article className="group">
      <Link href={`/post/${post.slug}`} className="block">
        {post.cover_image_url && (
          <div className="relative w-full h-56 rounded-xl overflow-hidden mb-4">
            <Image
              src={post.cover_image_url}
              alt={post.title}
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-300"
            />
          </div>
        )}
        <div className="space-y-2">
          <h2 className="text-xl font-bold text-text-primary group-hover:text-accent transition-colors leading-tight">
            {post.title}
          </h2>
          {post.subtitle && (
            <p className="text-text-secondary text-base font-medium">
              {post.subtitle}
            </p>
          )}
          <p className="text-text-secondary text-sm leading-relaxed line-clamp-3">
            {getExcerpt(post.content, 150)}
          </p>
          <div className="flex items-center gap-2 pt-1">
            <time className="text-text-muted text-xs">
              {formatArabicDate(post.created_at)}
            </time>
          </div>
        </div>
      </Link>
    </article>
  );
}
