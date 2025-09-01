'use client';

import { useEffect, useState } from 'react';
import { fetchNotes } from '@/lib/api/clientApi';
import { Note } from '@/types/note';
import NoteModal from '../@modal/NoteModal';
import css from './NotesPage.module.css';

export default function NotesPage() {
  const [notes, setNotes] = useState<Note[]>([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);

  useEffect(() => {
    let ignore = false;
    (async () => {
      try {
        const data = await fetchNotes();
        if (!ignore) setNotes(data);
      } catch (err) {
        console.error(err);
      } finally {
        if (!ignore) setLoading(false);
      }
    })();
    return () => { ignore = true; };
  }, []);

  if (loading) return <p>Loading notes...</p>;

  return (
    <main className={css.mainContent}>
      <h1>My Notes</h1>
      {notes.length === 0 ? <p>No notes yet</p> : (
        <ul>
          {notes.map((note) => (
            <li key={note.id}>
              <h3>{note.title}</h3>
              <p>{note.content}</p>
            </li>
          ))}
        </ul>
      )}
      {modalOpen && (
        <NoteModal onClose={() => setModalOpen(false)}>
          <p>Modal content here</p>
        </NoteModal>
      )}
      <button onClick={() => setModalOpen(true)}>Open Modal</button>
    </main>
  );
}
