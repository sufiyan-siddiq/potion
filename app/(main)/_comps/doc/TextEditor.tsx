"use client";
import { BlockNoteEditor, uploadToTmpFilesDotOrg_DEV_ONLY, PartialBlock } from "@blocknote/core";
import {
  BlockNoteView,
  darkDefaultTheme,
  Theme,
  useBlockNote,
} from "@blocknote/react";
import "@blocknote/core/style.css";
import { updateDoc } from '@/app/_comps/actions'
import debounce from 'lodash.debounce'

interface EditorProps {
  id: number;
  userId: number;
  initialContent?: string;
  editable?: boolean;
  setLoading: any;
};

export default function Editor({ id, userId, initialContent, editable, setLoading }: EditorProps) {

  const handleChange = debounce(async (content: string) => {
    setLoading(true)
    let res = await updateDoc(id, userId, undefined, undefined, content);
    if (res)
      setLoading(false)
  }, 700);

  const customDark = {
    ...darkDefaultTheme,
    colors: {
      ...darkDefaultTheme.colors,
      editor: {
        text: "#ffffff",
        background: "#000000",
      },
      hovered: {
        text: "#171717",
        background: "#C55DF6",
      },
      sideMenu: "#ffffff",
      highlightColors: darkDefaultTheme.colors.highlightColors,
    },
  } satisfies Theme;
  const editor: BlockNoteEditor | null = useBlockNote({
    editable,
    initialContent:
      initialContent
        ? JSON.parse(initialContent) as PartialBlock[]
        : undefined,
    onEditorContentChange: (editor) => {
      handleChange(JSON.stringify(editor.topLevelBlocks, null, 2));
    },
    uploadFile: uploadToTmpFilesDotOrg_DEV_ONLY
  });

  return <BlockNoteView editor={editor} theme={customDark} />
}