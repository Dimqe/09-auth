'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import { fetchNotesByTag } from '@/lib/api/clientApi';
import { Note } from '@/types/note';
import css from '../../Notes.module.css';


interface NotesResponse {
  notes: Note[];
  totalPages: number;
}

export default function FilteredNotesPage() {
  const params = useParams();
  const tag = Array.isArray(params.tag) ? params.tag[0] : params.tag;

  const [notes, setNotes] = useState<Note[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let ignore = false;
    if (!tag) {
      return;
    }

    const getNotes = async () => {
      setLoading(true);
      try {
      
        const response = (await fetchNotesByTag(tag)) as unknown as NotesResponse;
        
        if (!ignore) {
          if (response && Array.isArray(response.notes)) {
            setNotes(response.notes);
          } else {
            console.error('[DEBUG] Помилка: відповідь не містить масиву `notes`.');
            setNotes([]);
          }
        }
      } catch (error) {
        console.error('[DEBUG] Спіймано помилку під час завантаження нотаток:', error);
      } finally {
        if (!ignore) {
          setLoading(false);
        }
      }
    };

    getNotes();
    return () => { ignore = true; };
  }, [tag]);

  if (loading) {
    return <div className={css.loader}>Loading notes...</div>;
  }

  return (
    <main className={css.mainContent}>
      <h1 className={css.title}>Notes: {tag === 'All' ? 'All Notes' : tag}</h1>
      {notes.length > 0 ? (
        <ul className={css.notesGrid}>
          {notes.map((note) => (
            <li key={note.id} className={css.noteCard}>
              <h2 className={css.noteTitle}>{note.title}</h2>
              <p className={css.noteContent}>{note.content}</p>
              <span className={css.noteTag}>{note.tag}</span>
            </li>
          ))}
        </ul>
      ) : (
        <p>No notes found for this tag.</p>
      )}
    </main>
  );
}
