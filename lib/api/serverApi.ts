
import 'server-only';
import axios from 'axios';
import type { User } from '@/types/user';

const baseURL = `${process.env.NEXT_PUBLIC_API_URL}/api`;

function serverClient(cookiesHeader: string) {
  return axios.create({
    baseURL,
    withCredentials: true,
    headers: { cookie: cookiesHeader },
  });
}

export async function getMeServer(cookiesHeader: string): Promise<User> {
  const client = serverClient(cookiesHeader);
  const { data } = await client.get<User>('/users/me');
  return data;
}
