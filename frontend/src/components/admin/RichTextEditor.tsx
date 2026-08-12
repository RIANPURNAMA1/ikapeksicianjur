"use client";

import { useRef } from "react";
import { useEditor, EditorContent, type Editor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Placeholder from "@tiptap/extension-placeholder";
import ImageExtension from "@tiptap/extension-image";
import { apiUpload, resolveAssetUrl } from "@/lib/api";
import { cn } from "@/lib/utils";

interface RichTextEditorProps {
  value: string;
  onChange: (html: string) => void;
  placeholder?: string;
}

interface ToolButtonProps {
  active?: boolean;
  disabled?: boolean;
  label: string;
  onClick: () => void;
  children: React.ReactNode;
}

function ToolButton({ active, disabled, label, onClick, children }: ToolButtonProps) {
  return (
    <button
      type="button"
      onMouseDown={(e) => e.preventDefault()}
      onClick={onClick}
      disabled={disabled}
      title={label}
      aria-label={label}
      className={cn(
        "btn-focus flex h-8 w-8 items-center justify-center rounded-md transition-colors",
        active ? "bg-primary-tint text-primary" : "text-ink-soft hover:bg-paper-warm hover:text-ink",
        disabled && "cursor-not-allowed opacity-40"
      )}
    >
      {children}
    </button>
  );
}

const iconProps = {
  className: "h-4 w-4",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.8,
  viewBox: "0 0 24 24",
} as const;

export default function RichTextEditor({
  value,
  onChange,
  placeholder = "Tulis isi berita di sini...",
}: RichTextEditorProps) {
  const fileRef = useRef<HTMLInputElement>(null);

  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        link: { openOnClick: false },
      }),
      ImageExtension,
      Placeholder.configure({ placeholder }),
    ],
    content: value,
    immediatelyRender: false,
    editorProps: {
      attributes: {
        class: "px-4 py-3 text-sm leading-relaxed text-ink",
      },
    },
    onUpdate: ({ editor }) => onChange(editor.getHTML()),
  });

  async function handleEditorImage(file: File | undefined) {
    if (!file || !editor) return;
    const data = await apiUpload<{ url: string }>("/api/upload", file);
    editor.chain().focus().setImage({ src: resolveAssetUrl(data.url) }).run();
    if (fileRef.current) fileRef.current.value = "";
  }

  function toggleLink() {
    if (!editor) return;
    const previous = editor.getAttributes("link").href as string | undefined;
    const url = window.prompt("Alamat tautan (biarkan kosong untuk menghapus)", previous ?? "https://");
    if (url === null) return;
    if (url === "") {
      editor.chain().focus().extendMarkRange("link").unsetLink().run();
      return;
    }
    editor.chain().focus().extendMarkRange("link").setLink({ href: url }).run();
  }

  return (
    <div className="rich-editor overflow-hidden rounded-lg border border-paper-line bg-white transition-colors focus-within:border-primary">
      <div className="flex flex-wrap items-center gap-1 border-b border-paper-line bg-paper-warm/50 px-2 py-1.5">
        <ToolButton
          label="Batalkan"
          onClick={() => editor?.chain().focus().undo().run()}
          disabled={!editor?.can().undo()}
        >
          <svg {...iconProps}>
            <polyline points="1 4 1 10 7 10" />
            <path d="M3.51 15a9 9 0 1 0 2.13-9.36L1 10" />
          </svg>
        </ToolButton>
        <ToolButton
          label="Ulangi"
          onClick={() => editor?.chain().focus().redo().run()}
          disabled={!editor?.can().redo()}
        >
          <svg {...iconProps}>
            <polyline points="23 4 23 10 17 10" />
            <path d="M20.49 15a9 9 0 1 1-2.12-9.36L23 10" />
          </svg>
        </ToolButton>
        <span className="mx-1 h-5 w-px bg-paper-line" />
        <ToolButton label="Tebal" active={editor?.isActive("bold")} onClick={() => editor?.chain().focus().toggleBold().run()}>
          <svg {...iconProps}>
            <path d="M6 4h8a4 4 0 0 1 0 8H6V4zm0 8h9a4 4 0 0 1 0 8H6v-8z" />
          </svg>
        </ToolButton>
        <ToolButton label="Miring" active={editor?.isActive("italic")} onClick={() => editor?.chain().focus().toggleItalic().run()}>
          <svg {...iconProps}>
            <line x1="19" y1="4" x2="10" y2="4" />
            <line x1="14" y1="20" x2="5" y2="20" />
            <line x1="15" y1="4" x2="9" y2="20" />
          </svg>
        </ToolButton>
        <ToolButton label="Coret" active={editor?.isActive("strike")} onClick={() => editor?.chain().focus().toggleStrike().run()}>
          <svg {...iconProps}>
            <path d="M16 4H9a3 3 0 0 0-2.83 4" />
            <path d="M14 12a4 4 0 0 1 0 8H6" />
            <line x1="4" y1="12" x2="20" y2="12" />
          </svg>
        </ToolButton>
        <span className="mx-1 h-5 w-px bg-paper-line" />
        <ToolButton label="Subjudul" active={editor?.isActive("heading", { level: 2 })} onClick={() => editor?.chain().focus().toggleHeading({ level: 2 }).run()}>
          <span className="text-[13px] font-extrabold">H2</span>
        </ToolButton>
        <ToolButton label="Subsubjudul" active={editor?.isActive("heading", { level: 3 })} onClick={() => editor?.chain().focus().toggleHeading({ level: 3 }).run()}>
          <span className="text-[13px] font-extrabold">H3</span>
        </ToolButton>
        <span className="mx-1 h-5 w-px bg-paper-line" />
        <ToolButton label="Daftar poin" active={editor?.isActive("bulletList")} onClick={() => editor?.chain().focus().toggleBulletList().run()}>
          <svg {...iconProps}>
            <path d="M8 6h13M8 12h13M8 18h13M3 6h.01M3 12h.01M3 18h.01" />
          </svg>
        </ToolButton>
        <ToolButton label="Daftar angka" active={editor?.isActive("orderedList")} onClick={() => editor?.chain().focus().toggleOrderedList().run()}>
          <svg {...iconProps}>
            <path d="M10 6h11M10 12h11M10 18h11" />
            <path d="M4 6h1v4M4 10h2M6 18H4c0-1 2-2 2-3s-1-1.5-2-1" />
          </svg>
        </ToolButton>
        <ToolButton label="Kutipan" active={editor?.isActive("blockquote")} onClick={() => editor?.chain().focus().toggleBlockquote().run()}>
          <svg {...iconProps}>
            <path d="M3 21c3 0 7-1 7-8V5c0-1.25-.756-2.017-2-2H4c-1.25 0-2 .75-2 1.972V11c0 1.25.75 2 2 2 1 0 1 0 1 1v1c0 1-1 2-2 2s-1 .008-1 1.031V20c0 1 0 1 1 1z" />
            <path d="M15 21c3 0 7-1 7-8V5c0-1.25-.757-2.017-2-2h-4c-1.25 0-2 .75-2 1.972V11c0 1.25.75 2 2 2h.75c0 2.25.25 4-2.75 4v3c0 1 0 1 1 1z" />
          </svg>
        </ToolButton>
        <ToolButton label="Kode" active={editor?.isActive("code")} onClick={() => editor?.chain().focus().toggleCode().run()}>
          <svg {...iconProps}>
            <polyline points="16 18 22 12 16 6" />
            <polyline points="8 6 2 12 8 18" />
          </svg>
        </ToolButton>
        <span className="mx-1 h-5 w-px bg-paper-line" />
        <ToolButton label="Tautan" active={editor?.isActive("link")} onClick={toggleLink}>
          <svg {...iconProps}>
            <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" />
            <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" />
          </svg>
        </ToolButton>
        <ToolButton label="Sisipkan gambar" onClick={() => fileRef.current?.click()}>
          <svg {...iconProps}>
            <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
            <circle cx="8.5" cy="8.5" r="1.5" />
            <polyline points="21 15 16 10 5 21" />
          </svg>
        </ToolButton>
        <input
          ref={fileRef}
          type="file"
          accept="image/png,image/jpeg,image/jpg,image/gif,image/webp"
          className="hidden"
          onChange={(e) => handleEditorImage(e.target.files?.[0])}
        />
      </div>
      <EditorContent editor={editor} />
    </div>
  );
}
