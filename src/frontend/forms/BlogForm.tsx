import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { useState, useEffect } from "react";
import {
  Bold,
  Italic,
  Underline,
  Strikethrough,
  Heading1,
  Heading2,
  Heading3,
  List,
  ListOrderedIcon,
  Link2,
  Code2,
  CodeSquare,
  Quote,
  X,
} from "lucide-react";

import CustomDropdown from "../components/CustomDropdown";

const BlogForm = () => {
  useEffect(() => {
    document.title = "Create Post | Chronicle";
  }, []);
  const [, setImage] = useState<File | null>(null);
  // const [error, setError] = useState<string>("");
  const [category, setCategory] = useState<string>("");
  const [excerpt, setExcerpt] = useState<string>("");
  const [header, setHeader] = useState<string>("");
  const [preview, setPreview] = useState<string | null>(null);

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];

    if (!file) return;

    const img = new Image();

    img.onload = () => {
      const ratio = img.width / img.height;
      const targetRatio = 16 / 9;

      if (Math.abs(ratio - targetRatio) > 0.1) {
        alert("Please upload an image with a 16:9 aspect ratio.");
        return;
      }

      setImage(file);
      setPreview(URL.createObjectURL(file));
    };

    img.src = URL.createObjectURL(file);
  };
  const handleImageRemove = () => {
    setImage(null);
    setPreview(null);
  };

  const handleHeaderChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setHeader(e.target.value);
  };
  const handleBlogSubmit = (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
  };
  const editor = useEditor({
    extensions: [StarterKit],
    content: JSON.parse(
      localStorage.getItem("blog-draft") ||
        '{"type":"doc","content":[{"type":"paragraph"}]}',
    ),
    onUpdate: ({ editor }) => {
      localStorage.setItem("blog-draft", JSON.stringify(editor.getJSON()));
    },
    editorProps: {
      attributes: {
        class: "min-h-64 w-full p-4 focus:outline-none",
      },
    },
  });

  const isFormValid =
    header.trim().length > 0 &&
    header.length <= 150 &&
    category.trim().length > 0 &&
    excerpt.trim().length > 0 &&
    excerpt.length <= 300 &&
    editor.getText().trim().length > 0;
  if (!editor) {
    return null;
  }

  return (
    <form
      action="/blogs"
      method="POST"
      id="blogForm"
      onSubmit={handleBlogSubmit}
      className="flex flex-col w-full max-w-7xl mx-auto p-7 rounded-2xl space-y-7 pb-32"
    >
      <h1 className="font-semibold text-2xl">Create a blog post</h1>
      <div className="flex flex-col gap-2">
        <label>Header</label>
        <input
          onChange={handleHeaderChange}
          type="text"
          className="rounded-lg border border-gray-200 bg-gray-100 p-2 focus:outline-none"
          required
        />
      </div>
      <div className="flex flex-col gap-2">
        <label>Category</label>
        <CustomDropdown value={category} onChange={setCategory} />
      </div>
      <div className="flex flex-col gap-2">
        <label htmlFor="excerpt" className="font-medium">
          Excerpt
        </label>

        <textarea
          id="excerpt"
          value={excerpt}
          onChange={(e) => setExcerpt(e.target.value)}
          placeholder="Write a short description of your blog..."
          maxLength={300}
          rows={3}
          required
          className="
      w-full resize-none
      rounded-lg border border-gray-200
      bg-gray-100 p-3
      focus:outline-none
    "
        />
      </div>
      <div className="flex flex-col gap-2">
        <label>Content</label>
        <div className="w-full overflow-hidden rounded-lg border">
          {/* Toolbar */}
          <div className="flex flex-wrap gap-1 border-b p-2">
            <button
              type="button"
              title="Bold"
              onClick={() => editor.chain().focus().toggleBold().run()}
              className="rounded px-2 py-1 font-bold hover:bg-gray-100 hover:cursor-pointer"
            >
              <Bold size={18} />
            </button>

            <button
              type="button"
              title="Italic"
              onClick={() => editor.chain().focus().toggleItalic().run()}
              className="rounded px-2 py-1 italic hover:bg-gray-100 hover:cursor-pointer"
            >
              <Italic size={18} />
            </button>

            <button
              type="button"
              title="Underline"
              onClick={() => editor.chain().focus().toggleUnderline().run()}
              className="rounded px-2 py-1 underline hover:bg-gray-100 hover:cursor-pointer"
            >
              <Underline size={18} />
            </button>

            <button
              type="button"
              title="Strikethrough"
              onClick={() => editor.chain().focus().toggleStrike().run()}
              className="rounded px-2 py-1 line-through hover:bg-gray-100 hover:cursor-pointer"
            >
              <Strikethrough size={18} />
            </button>

            <button
              type="button"
              title="Heading 1"
              onClick={() =>
                editor.chain().focus().toggleHeading({ level: 1 }).run()
              }
              className="rounded px-2 py-1 hover:bg-gray-100 hover:cursor-pointer"
            >
              <Heading1 size={18} />
            </button>

            <button
              type="button"
              title="Heading 2"
              onClick={() =>
                editor.chain().focus().toggleHeading({ level: 2 }).run()
              }
              className="rounded px-2 py-1 hover:bg-gray-100 hover:cursor-pointer"
            >
              <Heading2 size={18} />
            </button>

            <button
              type="button"
              title="Heading 3"
              onClick={() =>
                editor.chain().focus().toggleHeading({ level: 3 }).run()
              }
              className="rounded px-2 py-1 hover:bg-gray-100 hover:cursor-pointer"
            >
              <Heading3 size={18} />
            </button>

            <button
              type="button"
              title="Bullet List"
              onClick={() => editor.chain().focus().toggleBulletList().run()}
              className="rounded px-2 py-1 hover:bg-gray-100 hover:cursor-pointer"
            >
              <List size={18} />
            </button>

            <button
              type="button"
              title="Ordered List"
              onClick={() => editor.chain().focus().toggleOrderedList().run()}
              className="rounded px-2 py-1 hover:bg-gray-100 hover:cursor-pointer"
            >
              <ListOrderedIcon size={18} />
            </button>

            <button
              type="button"
              title="Link"
              onClick={() => {
                const url = window.prompt("Enter URL");

                if (url) {
                  editor.chain().focus().setLink({ href: url }).run();
                }
              }}
              className="rounded px-2 py-1 hover:bg-gray-100 hover:cursor-pointer"
            >
              <Link2 size={18} />
            </button>

            <button
              type="button"
              title="Code"
              onClick={() => editor.chain().focus().toggleCode().run()}
              className="rounded px-2 py-1 font-mono hover:bg-gray-100 hover:cursor-pointer"
            >
              <Code2 size={18} />
            </button>

            <button
              type="button"
              title="Code Block"
              onClick={() => editor.chain().focus().toggleCodeBlock().run()}
              className="rounded px-2 py-1 hover:bg-gray-100 hover:cursor-pointer"
            >
              <CodeSquare size={18} />
            </button>

            <button
              type="button"
              title="Quote"
              onClick={() => editor.chain().focus().toggleBlockquote().run()}
              className="rounded px-2 py-1 hover:bg-gray-100 hover:cursor-pointer"
            >
              <Quote size={18} />
            </button>

            <button
              type="button"
              title="Undo"
              onClick={() => editor.chain().focus().undo().run()}
              className="rounded px-2 py-1 hover:bg-gray-100 hover:cursor-pointer"
            >
              ↶
            </button>

            <button
              type="button"
              title="Redo"
              onClick={() => editor.chain().focus().redo().run()}
              className="rounded px-2 py-1 hover:bg-gray-100 hover:cursor-pointer"
            >
              ↷
            </button>
          </div>

          {/* Editor */}
          <EditorContent
            editor={editor}
            className="
              min-h-64 w-full p-4 focus:outline-none
              [&_h1]:text-4xl [&_h1]:font-bold
              [&_h2]:text-3xl [&_h2]:font-bold
              [&_h3]:text-2xl [&_h3]:font-semibold
              [&_ul]:list-disc [&_ul]:pl-6
              [&_ol]:list-decimal [&_ol]:pl-6
              [&_blockquote]:border-l-4 [&_blockquote]:pl-4 [&_blockquote]:italic
              [&_pre]:rounded-lg [&_pre]:bg-gray-100 [&_pre]:p-4
              [&_code]:font-mono
              [&_a]:text-blue-600 [&_a]:underline
            "
          />
        </div>
      </div>
      <div className="flex flex-col gap-2">
        <label className="font-medium">Upload header image</label>

        <label
          htmlFor="header-image"
          className={`
            flex w-full cursor-pointer items-center justify-center
            rounded-2xl
            border-2 border-dashed border-gray-300
            bg-gray-50
            hover:bg-gray-100
            ${preview ? "" : "h-48"}
          `}
        >
          {preview ? (
            <div className="relative">
              <img
                src={preview}
                alt="Header preview"
                className="max-h-96 w-auto max-w-full rounded-3xl p-4"
              />
              <button
                title="Remove image"
                onClick={handleImageRemove}
                className="absolute right-7 top-7 flex items-center justify-center bg-white rounded-full p-1 hover:cursor-pointer"
              >
                <X size={18} />
              </button>
            </div>
          ) : (
            <div className="flex flex-col items-center">
              <span className="text-sm font-medium text-gray-600">
                Click to upload an image
              </span>

              <span className="mt-1 text-xs text-gray-400">
                PNG, JPG, or WEBP · Max 5 MB
              </span>
            </div>
          )}

          <input
            id="header-image"
            type="file"
            accept="image/png, image/jpeg, image/webp"
            className="hidden"
            onChange={handleImageChange}
          />
        </label>
      </div>
      <div>
        <button
          type="submit"
          disabled={!isFormValid}
          className="
            w-40 rounded-2xl p-3
            bg-black text-white
            hover:bg-black/80
            disabled:cursor-not-allowed
            disabled:bg-gray-300
            disabled:text-gray-500
          "
        >
          Create Post
        </button>
      </div>
    </form>
  );
};
export default BlogForm;
