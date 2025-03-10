import { useRef } from 'react';
import { DragItem } from '../types';

export const useDragDrop = <T>(
  items: T[],
  onReorder: (fromIndex: number, toIndex: number) => void
) => {
  const dragItem = useRef<DragItem | null>(null);
  const dragOverItem = useRef<DragItem | null>(null);

  const handleDragStart = (e: React.DragEvent, type: string, id: string, index: number) => {
    dragItem.current = { type, id, index };
    e.dataTransfer.effectAllowed = 'move';
  };

  const handleDragEnter = (e: React.DragEvent, type: string, id: string, index: number) => {
    dragOverItem.current = { type, id, index };
  };

  const handleDragEnd = (e: React.DragEvent) => {
    if (dragItem.current && dragOverItem.current) {
      const fromIndex = dragItem.current.index;
      const toIndex = dragOverItem.current.index;

      if (fromIndex !== toIndex) {
        onReorder(fromIndex, toIndex);
      }
    }

    dragItem.current = null;
    dragOverItem.current = null;
  };

  return {
    handleDragStart,
    handleDragEnter,
    handleDragEnd,
  };
}; 