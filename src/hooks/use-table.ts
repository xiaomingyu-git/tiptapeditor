import { useCallback } from "react"
import type { Editor } from "@tiptap/react"

// --- Hooks ---
import { useTiptapEditor } from "@/hooks/use-tiptap-editor"

export interface UseTableConfig {
  /**
   * The Tiptap editor instance.
   */
  editor?: Editor | null
  /**
   * Callback function called when a table is inserted.
   */
  onInsertTable?: () => void
}

/**
 * Checks if a table can be inserted in the current editor state
 */
export function canInsertTable(editor: Editor | null): boolean {
  if (!editor || !editor.isEditable) return false
  return editor.can().insertTable()
}

/**
 * Checks if a table is currently active in the editor
 */
export function isTableActive(editor: Editor | null): boolean {
  if (!editor || !editor.isEditable) return false
  return editor.isActive('table')
}

/**
 * Custom hook for handling table operations in a Tiptap editor
 */
export function useTable(config?: UseTableConfig) {
  const { editor: providedEditor, onInsertTable } = config || {}
  const { editor } = useTiptapEditor(providedEditor)

  const canInsert = canInsertTable(editor)
  const isActive = isTableActive(editor)

  const insertTable = useCallback(() => {
    if (!editor || !canInsert) return

    editor
      .chain()
      .focus()
      .insertTable({ rows: 3, cols: 3, withHeaderRow: true })
      .run()

    onInsertTable?.()
  }, [editor, canInsert, onInsertTable])

  const addColumnBefore = useCallback(() => {
    if (!editor) return
    editor.chain().focus().addColumnBefore().run()
  }, [editor])

  const addColumnAfter = useCallback(() => {
    if (!editor) return
    editor.chain().focus().addColumnAfter().run()
  }, [editor])

  const deleteColumn = useCallback(() => {
    if (!editor) return
    editor.chain().focus().deleteColumn().run()
  }, [editor])

  const addRowBefore = useCallback(() => {
    if (!editor) return
    editor.chain().focus().addRowBefore().run()
  }, [editor])

  const addRowAfter = useCallback(() => {
    if (!editor) return
    editor.chain().focus().addRowAfter().run()
  }, [editor])

  const deleteRow = useCallback(() => {
    if (!editor) return
    editor.chain().focus().deleteRow().run()
  }, [editor])

  const deleteTable = useCallback(() => {
    if (!editor) return
    editor.chain().focus().deleteTable().run()
  }, [editor])

  const toggleHeaderRow = useCallback(() => {
    if (!editor) return
    editor.chain().focus().toggleHeaderRow().run()
  }, [editor])

  const toggleHeaderColumn = useCallback(() => {
    if (!editor) return
    editor.chain().focus().toggleHeaderColumn().run()
  }, [editor])

  const toggleHeaderCell = useCallback(() => {
    if (!editor) return
    editor.chain().focus().toggleHeaderCell().run()
  }, [editor])

  return {
    canInsert,
    isActive,
    insertTable,
    addColumnBefore,
    addColumnAfter,
    deleteColumn,
    addRowBefore,
    addRowAfter,
    deleteRow,
    deleteTable,
    toggleHeaderRow,
    toggleHeaderColumn,
    toggleHeaderCell,
  }
}
