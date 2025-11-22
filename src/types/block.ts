export type BlockType =
  | 'paragraph'
  | 'heading-1'
  | 'heading-2'
  | 'heading-3'
  | 'bullet-list-item'
  | 'numbered-list-item'
  | 'to-do-item'
  | 'quote'
  | 'divider'
  | 'image'
  | 'code';

export interface Block {
  id: string;
  type: BlockType;
  content: string;
  children: Block[];
}
