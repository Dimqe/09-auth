import css from './page.module.css';

export default function HomePage() {
  return (
    <main className={css.mainContent}>
      <div className={css.container}>
        <h1 className={css.title}>Welcome to NoteHub!</h1>
        <p className={css.subtitle}>
          Your personal space for thoughts and ideas.
        </p>
        <p className={css.text}>
          Please log in or sign up to start creating your notes.
        </p>
      </div>
    </main>
  );
}
