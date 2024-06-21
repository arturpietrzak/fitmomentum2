import { useEditor } from "@tiptap/react";
import Underline from "@tiptap/extension-underline";
import TextAlign from "@tiptap/extension-text-align";
import Image from "@tiptap/extension-image";
import { RichTextEditor } from "@mantine/tiptap";
import StarterKit from "@tiptap/starter-kit";
import { useEffect } from "react";

export default function PlanForDay({ content }: { content: string }) {
  const editor = useEditor({
    editable: false,
    content: content,
    extensions: [
      StarterKit,
      Underline,
      TextAlign.configure({
        types: ["heading", "paragraph"],
      }),
      Image.configure({
        HTMLAttributes: {
          class: "embed-image",
        },
      }),
    ],
  });

  useEffect(() => {
    editor?.commands.setContent(content);
  }, [content]);

  return (
    <RichTextEditor
      editor={editor}
      style={{
        border: "0",
        ".ProseMirror": {
          padding: "0 !important",
          backgroundColor: "transparent !important",
        },
        ".mantine-RichTextEditor-content": {
          backgroundColor: "transparent ",
          maxHeight: "unset !important",
        },
      }}
      withCodeHighlightStyles
    >
      <RichTextEditor.Content />
    </RichTextEditor>
  );
}
