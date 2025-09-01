import css from './page.module.css';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: '404 - Page not found | NoteHub',
  description: 'The page you are looking for does not exist in NoteHub.',
  openGraph: {
    title: '404 - Page not found | NoteHub',
    description: 'The page you are looking for does not exist in NoteHub.',
    url: 'https://08-zustand-eta-one.vercel.app',
    images: [
      {
        url: 'https://ac.goit.global/fullstack/react/notehub-og-meta.jpg',
        width: 1200,
        height: 630,
        alt: 'NoteHub 404 preview',
      },
    ],
  },
};

export default function NotFound() {
  return (
    <>
      <h1 className={css.title}>404 - Page not found</h1>
      <p className={css.description}>
        Sorry, the page you are looking for does not exist.
      </p>
    </>
  );
}
