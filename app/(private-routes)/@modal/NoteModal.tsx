'use client';

import { ReactNode } from 'react';
import css from './NoteModal.module.css';

interface NoteModalProps {
  children: ReactNode;
  onClose: () => void;
}

export default function NoteModal({ children, onClose }: NoteModalProps) {
  return (
    <div className={css.overlay} onClick={onClose}>
      <div className={css.modal} onClick={(e) => e.stopPropagation()}>
        {children}
        <button className={css.closeButton} onClick={onClose}>Close</button>
      </div>
    </div>
  );
}
