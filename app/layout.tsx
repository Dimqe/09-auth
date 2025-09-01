
import type { Metadata } from 'next';
import ReactQueryProvider from '@/components/ReactQueryProvider/ReactQueryProvider';
import './globals.css'; 
import Header from '@/components/Header/Header'; 

export const metadata: Metadata = {
  title: 'NoteHub',
  description: 'Auth homework',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="uk">
      <body>
        <ReactQueryProvider>
          <Header />
          {children}
        </ReactQueryProvider>
      </body>
    </html>
  );
}
