'use client';

import { useAuthStore } from '@/lib/store/authStore';
import { loginUser } from '@/lib/api/clientApi';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import css from './SignIn.module.css';

export default function SignInPage() {
  const setUser = useAuthStore((state) => state.setUser);
  const [error, setError] = useState('');
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError('');
    
    const form = e.currentTarget;
    const email = (form.elements.namedItem('email') as HTMLInputElement).value;
    const password = (form.elements.namedItem('password') as HTMLInputElement).value;
    
    console.log('Submitting form with:', { email, password });

    try {
      console.log('Making login request...');
      const user = await loginUser({ email, password });
      console.log('Logged in user:', user); 
      
      setUser(user);
      console.log('User set in store, redirecting...');
      
      router.push('/profile');
      console.log('Redirect called');
    } catch (err: unknown) {
      console.error('Login error caught:', err); 
      if (err instanceof Error) setError(err.message);
      else setError('Login failed');
    }
  };

  return (
    <main className={css.mainContent}>
      <form className={css.form} onSubmit={handleSubmit}>
        <h1 className={css.formTitle}>Sign in</h1>
        <div className={css.formGroup}>
          <label htmlFor="email">Email</label>
          <input id="email" type="email" name="email" className={css.input} required autoComplete="username"/>
        </div>
        <div className={css.formGroup}>
          <label htmlFor="password">Password</label>
          <input id="password" type="password" name="password" className={css.input} required autoComplete="current-password"/>
        </div>
        <div className={css.actions}>
          <button type="submit" className={css.submitButton}>Log in</button>
        </div>
        <p className={css.error}>{error}</p>
      </form>
    </main>
  );
}