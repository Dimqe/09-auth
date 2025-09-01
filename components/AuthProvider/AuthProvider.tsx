'use client';

import { useEffect, useState } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { getSession } from '@/lib/api/clientApi';
import { useAuthStore } from '@/lib/store/authStore';
import css from './AuthProvider.module.css';

const PRIVATE_PREFIXES = ['/profile', '/notes'];

interface AuthProviderProps {
  children: React.ReactNode;
}

export default function AuthProvider({ children }: AuthProviderProps) {
  const [checking, setChecking] = useState(true);
  const router = useRouter();
  const pathname = usePathname();
 
  const { setUser, clearAuth, isAuthenticated } = useAuthStore();

  useEffect(() => {
    let ignore = false;

   
    if (isAuthenticated) {
      setChecking(false);
      return; 
    }


    (async () => {
      try {
        const user = await getSession();
        if (!ignore) {
          setUser(user);

          const isPrivate = PRIVATE_PREFIXES.some((p) => pathname.startsWith(p));
          if (isPrivate && !user) {
            clearAuth();
            router.replace('/sign-in');
            return;
          }
        }
      } finally {
        if (!ignore) setChecking(false);
      }
    })();

    return () => { ignore = true; };
    
  }, [pathname, router, setUser, clearAuth, isAuthenticated]);

  if (checking) return <div className={css.loader} aria-busy="true" />;

  return <>{children}</>;
}
