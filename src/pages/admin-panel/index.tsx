import { useEditor } from "@tiptap/react";
import Underline from "@tiptap/extension-underline";
import TextAlign from "@tiptap/extension-text-align";
import Image from "@tiptap/extension-image";
import { RichTextEditor } from "@mantine/tiptap";
import StarterKit from "@tiptap/starter-kit";
import { api } from "~/utils/api";
import styles from "./adminpanel.module.scss";
import { useEffect, useState } from "react";

export default function AdminPanel() {
  const [selectedDate, setSelectedDate] = useState<null | string>(null);
  const [selectedUser, setSelectedUser] = useState<null | string>(null);
  const { data: users } = api.example.getAllUsers.useQuery({});
  const { data: dayPlan } = api.example.getDayPlanById.useQuery({
    id: selectedDate ?? "",
  });
  const { mutateAsync } = api.example.setDayPlan.useMutation({});
  const { data: plans } = api.example.getDayPlansListByUserId.useQuery({
    id: selectedUser,
  });

  useEffect(() => {
    editor?.commands.setContent(dayPlan?.text ?? "");
  }, [selectedDate]);

  const editor = useEditor({
    editable: true,
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

  return (
    <main className={styles.main}>
      <div className={styles.users}>
        {users?.map((u) => (
          <div
            className={`${styles.userElement} ${
              u.id === selectedUser ? styles.selected : ""
            }`}
            key={u.id}
            onClick={() => {
              setSelectedUser(u.id);
            }}
          >
            {u.username};{" "}
            {u.paidUntil ? u.paidUntil.toDateString() : "Brak płatności"}; (
            {u.diet && "D"} {u.training && "T"})
          </div>
        ))}
      </div>
      <div className={styles.plans}>
        {plans?.map((p) => (
          <div
            onClick={() => {
              setSelectedDate(p.id);
            }}
            className={`${styles.planElement} ${
              selectedDate === p.id ? styles.selected : ""
            }`}
            key={p.id}
          >
            {p.date.toDateString()}
          </div>
        ))}
      </div>
      <div className={styles.editor}>
        <RichTextEditor editor={editor} withCodeHighlightStyles>
          <RichTextEditor.Toolbar sticky stickyOffset={0}>
            <RichTextEditor.ControlsGroup>
              <RichTextEditor.Bold />
              <RichTextEditor.Italic />
              <RichTextEditor.Underline />
              <RichTextEditor.Strikethrough />
              <RichTextEditor.ClearFormatting />
            </RichTextEditor.ControlsGroup>

            <RichTextEditor.ControlsGroup>
              <RichTextEditor.H1 />
              <RichTextEditor.H2 />
              <RichTextEditor.H3 />
              <RichTextEditor.H4 />
            </RichTextEditor.ControlsGroup>

            <RichTextEditor.ControlsGroup>
              <RichTextEditor.Blockquote />
              <RichTextEditor.Hr />
              <RichTextEditor.BulletList />
              <RichTextEditor.OrderedList />
            </RichTextEditor.ControlsGroup>

            <RichTextEditor.ControlsGroup>
              <RichTextEditor.Link />
              <RichTextEditor.Unlink />
            </RichTextEditor.ControlsGroup>

            <RichTextEditor.ControlsGroup>
              <RichTextEditor.AlignLeft />
              <RichTextEditor.AlignCenter />
              <RichTextEditor.AlignJustify />
              <RichTextEditor.AlignRight />
            </RichTextEditor.ControlsGroup>
          </RichTextEditor.Toolbar>

          <RichTextEditor.Content />
        </RichTextEditor>
        <button
          onClick={() => {
            void mutateAsync({
              id: selectedDate!,
              text: editor!.getHTML(),
            }).then(() => {
              console.log(":D");
            });
          }}
        >
          Zaaktualizuj plan
        </button>
      </div>
    </main>
  );
}
