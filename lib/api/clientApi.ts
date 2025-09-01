import { api } from './api';
import type { User } from '@/types/user';
import type { Note } from '@/types/note';

export async function loginUser(data: { email: string; password: string }): Promise<User> {
  const { data: user } = await api.post<User>('/auth/login', data);
  return user;
}

export async function registerUser(data: { email: string; password: string }): Promise<User> {
  const { data: user } = await api.post<User>('/auth/register', data);
  return user;
}

export async function logoutUser(): Promise<void> {
  await api.post('/auth/logout');
}

export async function getSession(): Promise<User | null> {
  const { data } = await api.get<User | null>('/auth/session');
  return data || null;
}

export async function getMe(): Promise<User> {
  const { data } = await api.get<User>('/users/me');
  return data;
}

export async function updateMe(payload: Partial<Pick<User, 'username'>>): Promise<User> {
  const { data } = await api.patch<User>('/users/me', payload);
  return data;
}


export async function fetchNotes(): Promise<Note[]> {
  const { data } = await api.get<Note[]>('/notes');
  return data;
}

export async function fetchNotesByTag(tag: string): Promise<Note[]> {
  const { data } = await api.get<Note[]>('/notes', {
    params: { tag },
  });
  return data;
}

export async function fetchNoteById(id: string): Promise<Note> {
  const { data } = await api.get<Note>(`/notes/${id}`);
  return data;
}


