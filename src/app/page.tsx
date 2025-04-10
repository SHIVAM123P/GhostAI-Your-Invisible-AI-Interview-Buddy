'use client';

import {useState, useEffect, useRef} from 'react';
import {Modal} from '@/components/Modal';

export default function Home() {
  const [isOpen, setIsOpen] = useState(true);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.ctrlKey && event.shiftKey && event.key === 'A') {
        setIsOpen((prev) => !prev);
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-4">
      <Modal isOpen={isOpen} onClose={() => setIsOpen(false)} />
    </main>
  );
}
