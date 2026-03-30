"use client";

import { createClient } from "@/lib/supabase";
import { useState } from "react";
import Image from "next/image";

interface ImageUploadProps {
  value: string;
  onChange: (url: string) => void;
}

export default function ImageUpload({ value, onChange }: ImageUploadProps) {
  const [uploading, setUploading] = useState(false);
  const supabase = createClient();

  async function handleUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    const fileName = `${Date.now()}-${file.name}`;

    const { data, error } = await supabase.storage
      .from("post-images")
      .upload(fileName, file);

    if (error) {
      alert("حدث خطأ أثناء رفع الصورة");
      setUploading(false);
      return;
    }

    const { data: urlData } = supabase.storage
      .from("post-images")
      .getPublicUrl(data.path);

    onChange(urlData.publicUrl);
    setUploading(false);
  }

  function handleRemove() {
    onChange("");
  }

  return (
    <div>
      {value ? (
        <div className="relative">
          <div className="relative w-full h-48 rounded-xl overflow-hidden border border-border">
            <Image src={value} alt="Cover" fill className="object-cover" />
          </div>
          <button
            type="button"
            onClick={handleRemove}
            className="mt-2 text-sm text-red-500 hover:text-red-600"
          >
            إزالة الصورة
          </button>
        </div>
      ) : (
        <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-border rounded-xl cursor-pointer hover:border-accent-light transition-colors bg-background">
          <div className="text-center">
            <p className="text-text-muted text-sm">
              {uploading ? "جارٍ الرفع..." : "اضغط لرفع صورة الغلاف"}
            </p>
            <p className="text-text-muted text-xs mt-1">PNG, JPG, WebP</p>
          </div>
          <input
            type="file"
            accept="image/*"
            onChange={handleUpload}
            disabled={uploading}
            className="hidden"
          />
        </label>
      )}
    </div>
  );
}
