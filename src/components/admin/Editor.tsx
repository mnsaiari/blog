"use client";

import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Underline from "@tiptap/extension-underline";
import Image from "@tiptap/extension-image";
import Link from "@tiptap/extension-link";

interface EditorProps {
  content: string;
  onChange: (content: string) => void;
}

const ToolbarButton = ({
  onClick,
  active,
  children,
  title,
}: {
  onClick: () => void;
  active?: boolean;
  children: React.ReactNode;
  title: string;
}) => (
  <button
    type="button"
    onClick={onClick}
    title={title}
    className={`px-2.5 py-1.5 rounded text-sm font-medium transition-colors ${
      active
        ? "bg-accent text-white"
        : "bg-background text-text-secondary hover:bg-border"
    }`}
  >
    {children}
  </button>
);

export default function Editor({ content, onChange }: EditorProps) {
  const editor = useEditor({
    extensions: [
      StarterKit,
      Underline,
      Image,
      Link.configure({ openOnClick: false }),
    ],
    content,
    immediatelyRender: false,
    editorProps: {
      attributes: {
        class: "focus:outline-none",
        dir: "rtl",
      },
    },
    onUpdate: ({ editor }) => {
      onChange(editor.getHTML());
    },
  });

  if (!editor) return null;

  function addImage() {
    const url = prompt("أدخل رابط الصورة:");
    if (url) {
      editor?.chain().focus().setImage({ src: url }).run();
    }
  }

  function addLink() {
    const url = prompt("أدخل الرابط:");
    if (url) {
      editor?.chain().focus().setLink({ href: url }).run();
    }
  }

  return (
    <div className="border border-border rounded-xl overflow-hidden tiptap-editor">
      {/* Toolbar */}
      <div className="flex flex-wrap gap-1.5 p-3 border-b border-border bg-surface">
        <ToolbarButton
          onClick={() => editor.chain().focus().toggleBold().run()}
          active={editor.isActive("bold")}
          title="عريض"
        >
          <strong>ع</strong>
        </ToolbarButton>
        <ToolbarButton
          onClick={() => editor.chain().focus().toggleItalic().run()}
          active={editor.isActive("italic")}
          title="مائل"
        >
          <em>ع</em>
        </ToolbarButton>
        <ToolbarButton
          onClick={() => editor.chain().focus().toggleUnderline().run()}
          active={editor.isActive("underline")}
          title="تسطير"
        >
          <span className="underline">ع</span>
        </ToolbarButton>

        <div className="w-px bg-border mx-1" />

        <ToolbarButton
          onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
          active={editor.isActive("heading", { level: 1 })}
          title="عنوان 1"
        >
          ع١
        </ToolbarButton>
        <ToolbarButton
          onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
          active={editor.isActive("heading", { level: 2 })}
          title="عنوان 2"
        >
          ع٢
        </ToolbarButton>
        <ToolbarButton
          onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
          active={editor.isActive("heading", { level: 3 })}
          title="عنوان 3"
        >
          ع٣
        </ToolbarButton>

        <div className="w-px bg-border mx-1" />

        <ToolbarButton
          onClick={() => editor.chain().focus().toggleBulletList().run()}
          active={editor.isActive("bulletList")}
          title="قائمة نقطية"
        >
          ≡
        </ToolbarButton>
        <ToolbarButton
          onClick={() => editor.chain().focus().toggleOrderedList().run()}
          active={editor.isActive("orderedList")}
          title="قائمة مرقمة"
        >
          ١٢
        </ToolbarButton>
        <ToolbarButton
          onClick={() => editor.chain().focus().toggleBlockquote().run()}
          active={editor.isActive("blockquote")}
          title="اقتباس"
        >
          &quot;
        </ToolbarButton>

        <div className="w-px bg-border mx-1" />

        <ToolbarButton onClick={addImage} title="إضافة صورة">
          🖼
        </ToolbarButton>
        <ToolbarButton onClick={addLink} title="إضافة رابط">
          🔗
        </ToolbarButton>

        <div className="w-px bg-border mx-1" />

        <ToolbarButton
          onClick={() => editor.chain().focus().undo().run()}
          title="تراجع"
        >
          ↩
        </ToolbarButton>
        <ToolbarButton
          onClick={() => editor.chain().focus().redo().run()}
          title="إعادة"
        >
          ↪
        </ToolbarButton>
      </div>

      {/* Editor Area */}
      <div className="min-h-[450px] bg-surface p-4">
        <EditorContent editor={editor} />
      </div>
    </div>
  );
}
