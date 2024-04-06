'use client'
import React, { Dispatch, SetStateAction, useCallback, useMemo } from 'react'
import isHotkey from 'is-hotkey'
import { Editable, withReact, useSlate, Slate, useEditor } from 'slate-react'
import {
  MdFormatBold,
  MdFormatItalic,
  MdFormatUnderlined,
  MdCode,
  MdLooksOne,
  MdLooksTwo,
  MdFormatQuote,
  MdFormatListNumbered,
  MdFormatListBulleted,
  MdFormatAlignLeft,
  MdFormatAlignCenter,
  MdFormatAlignRight,
  MdFormatAlignJustify
} from 'react-icons/md'
import { createEditor, Descendant, Node } from 'slate'
import { withHistory } from 'slate-history'

import BlockButton from './block-button'
import MarkButton, { toggleMark } from './mark-button'
import Toolbar from './toolbar'
import Element, { ElementProps } from './element'
import Leaf, { LeafProps } from './leaf'
import { StoredSlateValue } from '@/app/(notes)/page-content'
import NoteShareSettings from '@/components/note-share-settings'
import { Note } from '@prisma/client'

const HOTKEYS: { [key: string]: string } = {
  'meta+b': 'bold',
  'meta+i': 'italic',
  'meta+u': 'underline',
  'meta+`': 'code'
}

// Define a serializing function that takes a value and returns a string.
export const serialize = (value: Array<Node>) => {
  return (
    value
      // Return the string content of each paragraph in the value's children.
      .map(n => Node.string(n))
      // Join them all with line breaks denoting paragraphs.
      .join('\n')
  )
}

interface RichTextEditorProps {
  initialValue: Descendant[]
  value: StoredSlateValue
  setValue: Dispatch<SetStateAction<StoredSlateValue>>
  disabled?: boolean
  currentNote?: Note
}

const RichTextEditor = ({
  initialValue,
  setValue,
  currentNote,
  disabled = false
}: RichTextEditorProps) => {
  const renderElement = useCallback(
    (props: ElementProps) => <Element {...props} />,
    []
  )
  const renderLeaf = useCallback((props: LeafProps) => <Leaf {...props} />, [])
  const editor = useMemo(() => withHistory(withReact(createEditor())), [])

  return (
    <Slate
      editor={editor}
      initialValue={initialValue}
      onChange={value => {
        const isAstChange = editor.operations.some(
          op => 'set_selection' !== op.type
        )
        if (isAstChange) {
          // Save the value to Local Storage.
          setValue({
            jsonValue: value,
            plainTextValue: serialize(value)
          })
        }
      }}
    >
      <div className="h-16 w-full flex justify-between align-center grow px-4 overflow-y-hidden overflow-x-auto border-b sticky top-0 z-10 dark:bg-zinc-950 dark:border-zinc-800">
        {!disabled ? (
          <Toolbar>
            <MarkButton format="bold" icon={<MdFormatBold />} />
            <MarkButton format="italic" icon={<MdFormatItalic />} />
            <MarkButton format="underline" icon={<MdFormatUnderlined />} />
            <MarkButton format="code" icon={<MdCode />} />
            <BlockButton format="heading-one" icon={<MdLooksOne />} />
            <BlockButton format="heading-two" icon={<MdLooksTwo />} />
            <BlockButton format="block-quote" icon={<MdFormatQuote />} />
            <BlockButton
              format="numbered-list"
              icon={<MdFormatListNumbered />}
            />
            <BlockButton
              format="bulleted-list"
              icon={<MdFormatListBulleted />}
            />
            <BlockButton format="left" icon={<MdFormatAlignLeft />} />
            <BlockButton format="center" icon={<MdFormatAlignCenter />} />
            <BlockButton format="right" icon={<MdFormatAlignRight />} />
            <BlockButton format="justify" icon={<MdFormatAlignJustify />} />
          </Toolbar>
        ) : (
          <>
            <p className="text-center py-4 dark:text-white">
              This note is read-only.
            </p>
            {/* @ts-ignore: TODO: Adjust typing when notes are no longer immutable */}
            <NoteShareSettings note={currentNote} />
          </>
        )}
      </div>
      <Editable
        readOnly={disabled}
        className="h-[calc(100%-4rem)] overflow-auto grow outline-none p-4"
        // @ts-ignore: Slate typing
        renderElement={renderElement}
        // @ts-ignore: Slate typing
        renderLeaf={renderLeaf}
        placeholder="Welcome to your journal. Write notes about yourself here, so that your avatar learns about you. Don't forget to save!"
        spellCheck
        autoFocus
        onKeyDown={event => {
          for (const hotkey in HOTKEYS) {
            if (isHotkey(hotkey, event)) {
              event.preventDefault()
              const mark = HOTKEYS[hotkey]
              toggleMark(editor, mark)
            }
          }
        }}
      />
    </Slate>
  )
}

export default RichTextEditor
