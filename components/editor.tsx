'use client';

import { useTheme } from 'next-themes';
import { BlockNoteEditor, PartialBlock } from '@blocknote/core';
import { useCreateBlockNote } from '@blocknote/react';
import { BlockNoteView } from '@blocknote/mantine';

import { useEdgeStore } from '@/lib/edgestore';
import '@blocknote/mantine/style.css';

interface EditorProps {
  initialContent?: string;
  editable?: boolean;
  onChange: (editor: any) => void;
}

const Editor = ({ onChange, editable, initialContent }: EditorProps) => {
  const { resolvedTheme } = useTheme();
  const { edgestore } = useEdgeStore();

  const handleUpload = async (file: File) => {
    const response = await edgestore.publicFiles.upload({
      file,
    });

    return response.url;
  }

  const editor: BlockNoteEditor = useCreateBlockNote({
    initialContent: initialContent ? (JSON.parse(initialContent) as PartialBlock[]) : undefined,
    uploadFile: handleUpload,
  });

  return (
    <div>
      <BlockNoteView
        onChange={() => onChange(JSON.stringify(editor.topLevelBlocks, null, 2))}
        editor={editor}
        theme={resolvedTheme === 'dark' ? 'dark' : 'light'}
        editable={editable}
      />
    </div>
  );
};

export default Editor;
