'use client';

import React, { useState, useCallback, useRef, useEffect } from 'react';
import { Block, BlockType } from '@/types/block';

const initialBlocks: Block[] = [
  {
    id: '1',
    type: 'heading-1',
    content: 'Welcome to Notion-like Editor',
    children: [],
  },
  {
    id: '2',
    type: 'paragraph',
    content: 'Start typing here, or type "/" to see available block types.',
    children: [],
  },
];

export function NotionEditor() {
  const [blocks, setBlocks] = useState<Block[]>(initialBlocks);
  const [selectedBlockId, setSelectedBlockId] = useState<string | null>(null);
  const [showSlashMenu, setShowSlashMenu] = useState(false);
  const [slashMenuPosition, setSlashMenuPosition] = useState({ top: 0, left: 0 });
  const [currentBlockId, setCurrentBlockId] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');

  const editorRef = useRef<HTMLDivElement>(null);

  const blockTypes: { type: BlockType; title: string; description: string; icon: string }[] = [
    { type: 'paragraph', title: 'Text', description: 'Just start writing with plain text.', icon: '📝' },
    { type: 'heading-1', title: 'Heading 1', description: 'Large section heading.', icon: 'H1' },
    { type: 'heading-2', title: 'Heading 2', description: 'Medium section heading.', icon: 'H2' },
    { type: 'heading-3', title: 'Heading 3', description: 'Small section heading.', icon: 'H3' },
    { type: 'bullet-list-item', title: 'Bulleted list', description: 'Create a simple bulleted list.', icon: '•' },
    { type: 'numbered-list-item', title: 'Numbered list', description: 'Create a list with numbering.', icon: '1.' },
    { type: 'to-do-item', title: 'To-do list', description: 'Track tasks with a to-do list.', icon: '☐' },
  ];

  const filteredBlockTypes = blockTypes.filter(({ title }) =>
    title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent, blockId: string) => {
      if (e.key === 'Enter' && !e.shiftKey) {
        e.preventDefault();
        const blockIndex = blocks.findIndex((b) => b.id === blockId);
        const newBlock: Block = {
          id: Date.now().toString(),
          type: 'paragraph',
          content: '',
          children: [],
        };

        const newBlocks = [...blocks];
        newBlocks.splice(blockIndex + 1, 0, newBlock);
        setBlocks(newBlocks);

        // Focus the new block
        setTimeout(() => {
          const element = document.getElementById(`block-${newBlock.id}`);
          if (element) {
            element.focus();
          }
        }, 0);
      } else if (e.key === 'Backspace' && !e.shiftKey) {
        const blockIndex = blocks.findIndex((b) => b.id === blockId);
        const block = blocks[blockIndex];

        if (block.content === '' && blockIndex > 0) {
          e.preventDefault();
          const newBlocks = [...blocks];
          newBlocks.splice(blockIndex, 1);
          setBlocks(newBlocks);

          // Focus the previous block
          setTimeout(() => {
            const element = document.getElementById(`block-${blocks[blockIndex - 1].id}`);
            if (element) {
              element.focus();
            }
          }, 0);
        }
      } else if (e.key === '/') {
        const block = blocks.find((b) => b.id === blockId);
        if (block && block.content === '') {
          e.preventDefault();
          setCurrentBlockId(blockId);
          setShowSlashMenu(true);
          setSearchQuery('');

          // Calculate position for slash menu
          const element = document.getElementById(`block-${blockId}`);
          if (element) {
            const rect = element.getBoundingClientRect();
            setSlashMenuPosition({
              top: rect.bottom,
              left: rect.left,
            });
          }
        }
      } else if (e.key === 'ArrowUp' && !e.shiftKey) {
        e.preventDefault();
        const blockIndex = blocks.findIndex((b) => b.id === blockId);
        if (blockIndex > 0) {
          const element = document.getElementById(`block-${blocks[blockIndex - 1].id}`);
          if (element) {
            element.focus();
          }
        }
      } else if (e.key === 'ArrowDown' && !e.shiftKey) {
        e.preventDefault();
        const blockIndex = blocks.findIndex((b) => b.id === blockId);
        if (blockIndex < blocks.length - 1) {
          const element = document.getElementById(`block-${blocks[blockIndex + 1].id}`);
          if (element) {
            element.focus();
          }
        }
      } else if (e.key === 'Escape') {
        setShowSlashMenu(false);
        setSearchQuery('');
      }
    },
    [blocks]
  );

  const handleContentChange = (blockId: string, newContent: string) => {
    if (showSlashMenu && currentBlockId === blockId) {
      setSearchQuery(newContent.startsWith('/') ? newContent.substring(1) : newContent);
    } else {
      setBlocks((prevBlocks) =>
        prevBlocks.map((block) =>
          block.id === blockId ? { ...block, content: newContent } : block
        )
      );
    }
  };

  const selectBlockType = (type: BlockType) => {
    if (currentBlockId) {
      setBlocks((prevBlocks) =>
        prevBlocks.map((block) =>
          block.id === currentBlockId ? { ...block, type, content: '' } : block
        )
      );

      // Focus the block after type selection
      setTimeout(() => {
        const element = document.getElementById(`block-${currentBlockId}`);
        if (element) {
          element.focus();
        }
      }, 0);
    }

    setShowSlashMenu(false);
    setSearchQuery('');
  };

  const renderBlock = (block: Block) => {
    const blockClass = `block ${block.type} ${selectedBlockId === block.id ? 'focused' : ''}`;

    return (
      <div
        key={block.id}
        className={blockClass}
        onClick={() => setSelectedBlockId(block.id)}
      >
        <div className="block-menu">
          <button className="block-menu-button" aria-label="Add block">
            +
          </button>
          <button className="block-menu-button" aria-label="Drag block">
            ⋮⋮
          </button>
        </div>

        <div
          className="block-content"
          contentEditable
          suppressContentEditableWarning
          id={`block-${block.id}`}
          onInput={(e) => handleContentChange(block.id, e.currentTarget.textContent || '')}
          onKeyDown={(e) => handleKeyDown(e, block.id)}
          onFocus={() => setSelectedBlockId(block.id)}
          onBlur={() => setSelectedBlockId(null)}
        >
          {block.content}
        </div>
      </div>
    );
  };

  const handleClickOutside = useCallback((e: MouseEvent) => {
    if (showSlashMenu) {
      const target = e.target as Element;
      if (!target.closest('.slash-menu') && !target.closest('.block-content')) {
        setShowSlashMenu(false);
        setSearchQuery('');
      }
    }
  }, [showSlashMenu]);

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [handleClickOutside]);

  return (
    <div className="editor" ref={editorRef}>
      {blocks.map(renderBlock)}

      {showSlashMenu && (
        <div
          className="slash-menu"
          style={{
            top: `${slashMenuPosition.top}px`,
            left: `${slashMenuPosition.left}px`,
          }}
        >
          {filteredBlockTypes.length > 0 ? (
            filteredBlockTypes.map(({ type, title, description, icon }) => (
              <div
                key={type}
                className="slash-menu-item"
                onClick={() => selectBlockType(type)}
              >
                <div className="slash-menu-icon">{icon}</div>
                <div>
                  <div className="slash-menu-title">{title}</div>
                  <div className="slash-menu-description">{description}</div>
                </div>
              </div>
            ))
          ) : (
            <div className="slash-menu-item">
              <div className="slash-menu-description">No matching block types</div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
