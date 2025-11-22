"use client";

import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { initialContent } from "./initialContent";
import {
  Bold,
  Italic,
  Code,
  ListOrdered,
  List,
  Heading1,
  Heading2,
  Heading3,
  Quote,
  Minus,
  Redo,
  Undo,
  Pilcrow,
  Code2,
  Strikethrough,
  Eraser,
  ListChecks,
  Image as ImageIcon,
  Table as TableIcon,
  GripVertical,
  Underline,
  Highlighter,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import TaskList from "@tiptap/extension-task-list";
import TaskItem from "@tiptap/extension-task-item";
import { BubbleMenu } from "@tiptap/extension-bubble-menu";
import { FloatingMenu } from "@tiptap/extension-floating-menu";
import { DragHandle } from "@tiptap/extension-drag-handle";
import { Table } from "@tiptap/extension-table";
import { TableRow } from "@tiptap/extension-table-row";
import { TableCell } from "@tiptap/extension-table-cell";
import { TableHeader } from "@tiptap/extension-table-header";
import { Image } from "@tiptap/extension-image";
import Link from "@tiptap/extension-link";
import TextAlign from "@tiptap/extension-text-align";
import UnderlineExtension from "@tiptap/extension-underline";
import HighlightExtension from "@tiptap/extension-highlight";
import React, { useRef, useEffect, useCallback } from "react";

const TiptapEditor = () => {
  const bubbleMenuRef = useRef<HTMLDivElement>(null);
  const floatingMenuRef = useRef<HTMLDivElement>(null);

  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        bulletList: {
          keepMarks: true,
          keepAttributes: false,
        },
        orderedList: {
          keepMarks: true,
          keepAttributes: false,
        },
        heading: {
          levels: [1, 2, 3],
        },
      }),
      TaskList,
      TaskItem.configure({
        nested: true,
      }),
      Table.configure({
        resizable: true,
      }),
      TableRow.configure({
        HTMLAttributes: {
          class: 'tiptap-table-row',
        },
      }),
      TableHeader.configure({
        HTMLAttributes: {
          class: 'tiptap-table-header',
        },
      }),
      TableCell.configure({
        HTMLAttributes: {
          class: 'tiptap-table-cell',
        },
      }),
      Image.configure({
        HTMLAttributes: {
          class: "max-w-full h-auto",
        },
      }),
      Link.configure({
        openOnClick: false,
        autolink: true,
        linkOnPaste: true,
      }),
      TextAlign.configure({
        types: ['heading', 'paragraph'],
      }),
      UnderlineExtension,
      HighlightExtension.configure({
        multicolor: true,
      }),
      BubbleMenu.configure({
        element: bubbleMenuRef.current as HTMLElement,
        shouldShow: ({ editor, view, state, oldState, from, to }) => {
          // Only show when there's a text selection
          return from !== to;
        },
      }),
      FloatingMenu.configure({
        element: floatingMenuRef.current as HTMLElement,
      }),
      DragHandle.configure({
        // Simple drag handle configuration
      }),
    ],
    content: initialContent,
    editorProps: {
      attributes: {
        class: "prose dark:prose-invert",
      },
    },
    immediatelyRender: false, // Fix for SSR hydration mismatches
  });

  // This useEffect ensures that BubbleMenu and FloatingMenu elements are passed to Tiptap only after they are mounted.
  useEffect(() => {
    if (editor && bubbleMenuRef.current) {
      const bubbleMenuExtension = editor.extensionManager.extensions.find(e => e.name === 'bubbleMenu');
      if (bubbleMenuExtension) {
        bubbleMenuExtension.options.element = bubbleMenuRef.current;
      }
    }
    if (editor && floatingMenuRef.current) {
      const floatingMenuExtension = editor.extensionManager.extensions.find(e => e.name === 'floatingMenu');
      if (floatingMenuExtension) {
        floatingMenuExtension.options.element = floatingMenuRef.current;
      }
    }
  }, [editor]); // Depend on editor only, refs are stable

  // Configure DragHandle after editor is initialized
  useEffect(() => {
    if (editor) {
      const dragHandleExtension = editor.extensionManager.extensions.find(e => e.name === 'dragHandle');
      if (dragHandleExtension) {
        dragHandleExtension.options.editor = editor;
      }
    }
  }, [editor]); // Depend on editor only


  const addImage = useCallback(() => {
    if (!editor) return;
    const url = window.prompt('Image URL');
    if (url) {
      editor.chain().focus().setImage({ src: url }).run();
    }
  }, [editor]);

  const addTable = useCallback(() => {
    if (!editor) return;
    if (editor.can().insertTable({ rows: 3, cols: 3, withHeaderRow: true })) {
      editor.chain().focus().insertTable({ rows: 3, cols: 3, withHeaderRow: true }).run();
    }
  }, [editor]);

  const deleteTable = useCallback(() => {
    if (!editor) return;
    editor.chain().focus().deleteTable().run();
  }, [editor]);

  const addColumnBefore = useCallback(() => {
    if (!editor) return;
    editor.chain().focus().addColumnBefore().run();
  }, [editor]);

  const addColumnAfter = useCallback(() => {
    if (!editor) return;
    editor.chain().focus().addColumnAfter().run();
  }, [editor]);

  const deleteColumn = useCallback(() => {
    if (!editor) return;
    editor.chain().focus().deleteColumn().run();
  }, [editor]);

  const addRowBefore = useCallback(() => {
    if (!editor) return;
    editor.chain().focus().addRowBefore().run();
  }, [editor]);

  const addRowAfter = useCallback(() => {
    if (!editor) return;
    editor.chain().focus().addRowAfter().run();
  }, [editor]);

  const deleteRow = useCallback(() => {
    if (!editor) return;
    editor.chain().focus().deleteRow().run();
  }, [editor]);

  const toggleHeaderColumn = useCallback(() => {
    if (!editor) return;
    editor.chain().focus().toggleHeaderColumn().run();
  }, [editor]);

  const toggleHeaderCell = useCallback(() => {
    if (!editor) return;
    editor.chain().focus().toggleHeaderCell().run();
  }, [editor]);

  const toggleHeaderRow = useCallback(() => {
    if (!editor) return;
    editor.chain().focus().toggleHeaderRow().run();
  }, [editor]);

  const mergeCells = useCallback(() => {
    if (!editor) return;
    editor.chain().focus().mergeCells().run();
  }, [editor]);

  const splitCell = useCallback(() => {
    if (!editor) return;
    editor.chain().focus().splitCell().run();
  }, [editor]);

  if (!editor) {
    return null;
  }

  return (
    <div>
      {/* Bubble Menu Content */}
      <div
        ref={bubbleMenuRef}
        className="hidden"
      >
        <div>
          <div>
            <Button
              onClick={() => editor.chain().focus().toggleBold().run()}
              disabled={!editor.can().chain().focus().toggleBold().run()}
              variant="ghost"
              size="sm"
            >
              <Bold />
            </Button>
            <Button
              onClick={() => editor.chain().focus().toggleItalic().run()}
              disabled={!editor.can().chain().focus().toggleItalic().run()}
              variant="ghost"
              size="sm"
            >
              <Italic />
            </Button>
            <Button
              onClick={() => editor.chain().focus().toggleStrike().run()}
              disabled={!editor.can().chain().focus().toggleStrike().run()}
              variant="ghost"
              size="sm"
            >
              <Strikethrough />
            </Button>
            <Button
              onClick={() => editor.chain().focus().toggleCode().run()}
              disabled={!editor.can().chain().focus().toggleCode().run()}
              variant="ghost"
              size="sm"
            >
              <Code />
            </Button>
          </div>

          <Separator orientation="vertical" />

          <div>
            <Button
              onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
              variant="ghost"
              size="sm"
            >
              <Heading1 />
            </Button>
            <Button
              onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
              variant="ghost"
              size="sm"
            >
              <Heading2 />
            </Button>
            <Button
              onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
              variant="ghost"
              size="sm"
            >
              <Heading3 />
            </Button>
          </div>

          <Separator orientation="vertical" />

          <div>
            <Button
              onClick={() => editor.chain().focus().toggleBulletList().run()}
              variant="ghost"
              size="sm"
            >
              <List />
            </Button>
            <Button
              onClick={() => editor.chain().focus().toggleOrderedList().run()}
              variant="ghost"
              size="sm"
            >
              <ListOrdered />
            </Button>
            <Button
              onClick={() => editor.chain().focus().toggleCodeBlock().run()}
              variant="ghost"
              size="sm"
            >
              <Code2 />
            </Button>
            <Button
              onClick={() => editor.chain().focus().toggleBlockquote().run()}
              variant="ghost"
              size="sm"
            >
              <Quote />
            </Button>
          </div>
        </div>
      </div>

      {/* Floating Menu Content */}
      <div
        ref={floatingMenuRef}
        className="hidden"
      >
        <div>
          <Button
            onClick={() => editor.chain().focus().setParagraph().run()}
            variant="ghost"
            size="sm"
          >
            <Pilcrow />
          </Button>
          <Button
            onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
            variant="ghost"
            size="sm"
          >
            <Heading1 />
          </Button>
          <Button
            onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
            variant="ghost"
            size="sm"
          >
            <Heading2 />
          </Button>
          <Button
            onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
            variant="ghost"
            size="sm"
          >
            <Heading3 />
          </Button>
          <Button
            onClick={() => editor.chain().focus().toggleBulletList().run()}
            variant="ghost"
            size="sm"
          >
            <List />
          </Button>
          <Button
            onClick={() => editor.chain().focus().toggleOrderedList().run()}
            variant="ghost"
            size="sm"
          >
            <ListOrdered />
          </Button>
          <Button
            onClick={() => editor.chain().focus().toggleTaskList().run()}
            variant="ghost"
            size="sm"
          >
            <ListChecks />
          </Button>
        </div>
      </div>

      {/* Toolbar */}
      <div>
        <div>
          <div>
            <Button
              onClick={() => editor.chain().focus().toggleBold().run()}
              disabled={!editor.can().chain().focus().toggleBold().run()}
              variant="ghost"
              size="sm"
            >
              <Bold />
            </Button>
            <Button
              onClick={() => editor.chain().focus().toggleItalic().run()}
              disabled={!editor.can().chain().focus().toggleItalic().run()}
              variant="ghost"
              size="sm"
            >
              <Italic />
            </Button>
            <Button
              onClick={() => editor.chain().focus().toggleUnderline().run()}
              disabled={!editor.can().chain().focus().toggleUnderline().run()}
              variant="ghost"
              size="sm"
            >
              <Underline />
            </Button>
            <Button
              onClick={() => editor.chain().focus().toggleStrike().run()}
              disabled={!editor.can().chain().focus().toggleStrike().run()}
              variant="ghost"
              size="sm"
            >
              <Strikethrough />
            </Button>
            <Button
              onClick={() => editor.chain().focus().toggleCode().run()}
              disabled={!editor.can().chain().focus().toggleCode().run()}
              variant="ghost"
              size="sm"
            >
              <Code />
            </Button>
          </div>

          <Separator orientation="vertical" />

          <div>
            <Button
              onClick={() => editor.chain().focus().setHeading({ level: 1 }).run()}
              variant="ghost"
              size="sm"
            >
              <Heading1 />
            </Button>
            <Button
              onClick={() => editor.chain().focus().setHeading({ level: 2 }).run()}
              variant="ghost"
              size="sm"
            >
              <Heading2 />
            </Button>
            <Button
              onClick={() => editor.chain().focus().setHeading({ level: 3 }).run()}
              variant="ghost"
              size="sm"
            >
              <Heading3 />
            </Button>
          </div>

          <Separator orientation="vertical" />

          <div>
            <Button
              onClick={() => editor.chain().focus().toggleBulletList().run()}
              variant="ghost"
              size="sm"
            >
              <List />
            </Button>
            <Button
              onClick={() => editor.chain().focus().toggleOrderedList().run()}
              variant="ghost"
              size="sm"
            >
              <ListOrdered />
            </Button>
            <Button
              onClick={() => editor.chain().focus().toggleTaskList().run()}
              variant="ghost"
              size="sm"
            >
              <ListChecks />
            </Button>
          </div>

          <Separator orientation="vertical" />

          <div>
            <Button
              onClick={() => editor.chain().focus().toggleBlockquote().run()}
              variant="ghost"
              size="sm"
            >
              <Quote />
            </Button>
            <Button
              onClick={() => editor.chain().focus().toggleCodeBlock().run()}
              variant="ghost"
              size="sm"
            >
              <Code2 />
            </Button>
            <Button
              onClick={addTable}
              variant="ghost"
              size="sm"
            >
              <TableIcon />
            </Button>
            <Button
              onClick={addImage}
              variant="ghost"
              size="sm"
            >
              <ImageIcon />
            </Button>
          </div>

          <Separator orientation="vertical" />

          <div>
            <Button
              onClick={() => editor.chain().focus().undo().run()}
              disabled={!editor.can().undo()}
              variant="ghost"
              size="sm"
            >
              <Undo />
            </Button>
            <Button
              onClick={() => editor.chain().focus().redo().run()}
              disabled={!editor.can().redo()}
              variant="ghost"
              size="sm"
            >
              <Redo />
            </Button>
          </div>
        </div>

        {/* Table controls - only show when cursor is in a table */}
        {editor.isActive("table") && (
          <div>
            <div>
              <Button onClick={addColumnBefore} variant="outline" size="sm">
                Add column before
              </Button>
              <Button onClick={addColumnAfter} variant="outline" size="sm">
                Add column after
              </Button>
              <Button onClick={deleteColumn} variant="outline" size="sm">
                Delete column
              </Button>
            </div>

            <Separator orientation="vertical" />

            <div>
              <Button onClick={addRowBefore} variant="outline" size="sm">
                Add row before
              </Button>
              <Button onClick={addRowAfter} variant="outline" size="sm">
                Add row after
              </Button>
              <Button onClick={deleteRow} variant="outline" size="sm">
                Delete row
              </Button>
            </div>

            <Separator orientation="vertical" />

            <div>
              <Button onClick={toggleHeaderColumn} variant="outline" size="sm">
                Toggle header column
              </Button>
              <Button onClick={toggleHeaderRow} variant="outline" size="sm">
                Toggle header row
              </Button>
              <Button onClick={toggleHeaderCell} variant="outline" size="sm">
                Toggle header cell
              </Button>
              <Button onClick={mergeCells} variant="outline" size="sm">
                Merge cells
              </Button>
              <Button onClick={splitCell} variant="outline" size="sm">
                Split cell
              </Button>
            </div>

            <Separator orientation="vertical" />

            <div>
              <Button onClick={deleteTable} variant="outline" size="sm">
                Delete table
              </Button>
            </div>
          </div>
        )}
      </div>

      <EditorContent editor={editor} />
    </div>
  );
};

export { TiptapEditor };
