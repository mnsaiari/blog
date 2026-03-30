"use client";

import { createClient } from "@/lib/supabase";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function DeletePostButton({ postId }: { postId: string }) {
  const [confirming, setConfirming] = useState(false);
  const router = useRouter();
  const supabase = createClient();

  async function handleDelete() {
    if (!confirming) {
      setConfirming(true);
      setTimeout(() => setConfirming(false), 3000);
      return;
    }

    await supabase.from("posts").delete().eq("id", postId);
    router.refresh();
  }

  return (
    <button
      onClick={handleDelete}
      className={`text-sm transition-colors ${
        confirming
          ? "text-red-500 font-medium"
          : "text-text-muted hover:text-red-400"
      }`}
    >
      {confirming ? "تأكيد الحذف؟" : "حذف"}
    </button>
  );
}
